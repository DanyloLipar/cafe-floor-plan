import { SPAWN_POSITION } from '../constants/layout'
import type { EquipmentItem, EquipmentKind, TableItem } from '../types/floor'
import type { TableFormValues } from '../types/form'

const createId = (prefix: string): string =>
  `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`

export const createTable = ({ name, seats }: TableFormValues): TableItem => ({
  id: createId('table'),
  kind: 'table',
  name,
  seats,
  occupied: false,
  ...SPAWN_POSITION,
})

export const createEquipment = (kind: EquipmentKind): EquipmentItem => ({
  id: createId(kind),
  kind,
  ...SPAWN_POSITION,
})
