import { EQUIPMENT_KINDS, MAX_SEATS, MIN_SEATS } from '../constants/items'
import type { EquipmentKind } from '../types/floor'

export function isFiniteNumber(value: unknown): value is number {
  return typeof value === 'number' && Number.isFinite(value)
}

export function isEquipmentKind(value: unknown): value is EquipmentKind {
  return EQUIPMENT_KINDS.some((kind) => kind === value)
}

export function isValidSeats(value: unknown): value is number {
  return (
    typeof value === 'number' && Number.isInteger(value) && value >= MIN_SEATS && value <= MAX_SEATS
  )
}
