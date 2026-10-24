import type { FloorItem } from '../types/floor';
import { clampPosition } from './geometry';
import { findEquipmentKind, isValidSeats } from './guards';
import { createInitialItems } from './initialItems';

export const STORAGE_KEY = 'cafe-floor-plan:items';

const parseItem = (value: unknown): FloorItem | null => {
  if (typeof value !== 'object' || value === null) return null;
  const record = value as Record<string, unknown>;
  const { id, kind, x, y } = record;

  if (typeof id !== 'string' || id === '') return null;
  if (typeof x !== 'number' || typeof y !== 'number') return null;
  const position = clampPosition(x, y);

  if (kind === 'table') {
    const { name, seats, occupied } = record;
    if (typeof name !== 'string' || name.trim() === '') return null;
    if (typeof seats !== 'number' || !isValidSeats(seats)) return null;
    if (typeof occupied !== 'boolean') return null;
    return { id, kind, name, seats, occupied, ...position };
  }

  const equipmentKind = findEquipmentKind(kind);
  if (equipmentKind !== undefined) return { id, kind: equipmentKind, ...position };

  return null;
};

const readRaw = (): string | null => {
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
};

export const loadItems = (): FloorItem[] => {
  const raw = readRaw();
  if (raw === null) return createInitialItems();

  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return createInitialItems();
  }
  if (!Array.isArray(parsed)) return createInitialItems();

  const seenIds = new Set<string>();
  const items: FloorItem[] = [];
  for (const entry of parsed) {
    const item = parseItem(entry);
    if (item === null || seenIds.has(item.id)) continue;
    seenIds.add(item.id);
    items.push(item);
  }
  return items;
};

export const saveItems = (items: readonly FloorItem[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    // Storage may be full or blocked, the in-memory plan keeps working.
  }
};
