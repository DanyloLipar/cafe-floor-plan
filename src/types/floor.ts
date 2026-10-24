export type EquipmentKind = 'bar' | 'register' | 'fridge'
export type ItemKind = 'table' | EquipmentKind

interface BaseItem {
  id: string
  x: number
  y: number
}

export interface TableItem extends BaseItem {
  kind: 'table'
  name: string
  seats: number
  occupied: boolean
}

export interface EquipmentItem extends BaseItem {
  kind: EquipmentKind
}

export type FloorItem = TableItem | EquipmentItem

export interface Position {
  x: number
  y: number
}
