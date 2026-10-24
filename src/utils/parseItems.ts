import { EQUIPMENT_KINDS } from '../constants/items';
import type { EquipmentKind, FloorItem } from '../types/floor';
import { clampPosition } from './geometry';
import { isValidSeats } from './validation';

const findEquipmentKind = (value: unknown): EquipmentKind | undefined =>
  EQUIPMENT_KINDS.find((kind) => kind === value);

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

export const parseItems = (list: unknown[]): FloorItem[] => {
  const seenIds = new Set<string>();
  const items: FloorItem[] = [];

  for (const entry of list) {
    const item = parseItem(entry);
    if (item === null || seenIds.has(item.id)) continue;
    seenIds.add(item.id);
    items.push(item);
  }

  return items;
};
