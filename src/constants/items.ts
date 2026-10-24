import type { EquipmentKind, ItemKind } from '../types/floor';

export const EQUIPMENT_KINDS: readonly EquipmentKind[] = ['bar', 'register', 'fridge'];

export const ADD_BUTTON_ORDER: readonly ItemKind[] = ['table', 'bar', 'register', 'fridge'];

export const MIN_SEATS = 1;
export const MAX_SEATS = 12;
