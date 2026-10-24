import { EQUIPMENT_KINDS, MAX_SEATS, MIN_SEATS } from '../constants/items';
import type { EquipmentKind } from '../types/floor';

export const isValidSeats = (seats: number): boolean =>
  Number.isInteger(seats) && seats >= MIN_SEATS && seats <= MAX_SEATS;

export const findEquipmentKind = (value: unknown): EquipmentKind | undefined =>
  EQUIPMENT_KINDS.find((kind) => kind === value);
