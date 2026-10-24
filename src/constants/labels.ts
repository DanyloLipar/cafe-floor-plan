import type { EquipmentKind, ItemKind } from '../types/floor'

export const EQUIPMENT_LABELS: Record<EquipmentKind, string> = {
  bar: 'Бар',
  register: 'Каса',
  fridge: 'Холодильник',
}

export const ADD_BUTTON_LABELS: Record<ItemKind, string> = {
  table: 'Додати стіл',
  bar: 'Додати бар',
  register: 'Додати касу',
  fridge: 'Додати холодильник',
}
