import type { FloorItem } from '../types/floor'
import { clampPosition } from './geometry'
import { isEquipmentKind, isFiniteNumber, isValidSeats } from './guards'
import { createInitialItems } from './initialItems'

export const STORAGE_KEY = 'cafe-floor-plan:items:v1'

// Rebuilds the item from known fields only, so stray or invalid data never reaches the UI.
function parseItem(value: unknown): FloorItem | null {
  if (typeof value !== 'object' || value === null) return null
  const record = value as Record<string, unknown>
  const { id, kind, x, y } = record

  if (typeof id !== 'string' || id === '' || !isFiniteNumber(x) || !isFiniteNumber(y)) return null
  const position = clampPosition(x, y)

  if (kind === 'table') {
    const { name, seats, occupied } = record
    if (typeof name !== 'string' || name.trim() === '') return null
    if (!isValidSeats(seats) || typeof occupied !== 'boolean') return null
    return { id, kind, name, seats, occupied, ...position }
  }

  if (isEquipmentKind(kind)) return { id, kind, ...position }

  return null
}

function readRaw(): string | null {
  try {
    return localStorage.getItem(STORAGE_KEY)
  } catch {
    return null
  }
}

// Missing or corrupted data gives the starter layout; a saved empty list stays empty.
export function loadItems(): FloorItem[] {
  const raw = readRaw()
  if (raw === null) return createInitialItems()

  let parsed: unknown
  try {
    parsed = JSON.parse(raw)
  } catch {
    return createInitialItems()
  }
  if (!Array.isArray(parsed)) return createInitialItems()

  const seenIds = new Set<string>()
  const items: FloorItem[] = []
  for (const entry of parsed) {
    const item = parseItem(entry)
    if (item === null || seenIds.has(item.id)) continue
    seenIds.add(item.id)
    items.push(item)
  }
  return items
}

export function saveItems(items: readonly FloorItem[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  } catch {
    // Storage may be full or blocked; the in-memory plan keeps working.
  }
}
