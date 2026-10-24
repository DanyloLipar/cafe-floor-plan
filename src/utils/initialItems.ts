import type { FloorItem } from '../types/floor'

export function createInitialItems(): FloorItem[] {
  return [
    { id: 'table-a1', kind: 'table', name: 'A1', seats: 2, occupied: false, x: 24, y: 24 },
    { id: 'table-a2', kind: 'table', name: 'A2', seats: 4, occupied: true, x: 648, y: 24 },
    { id: 'table-b1', kind: 'table', name: 'B1', seats: 4, occupied: false, x: 24, y: 140 },
    { id: 'bar-1', kind: 'bar', x: 648, y: 200 },
    { id: 'register-1', kind: 'register', x: 648, y: 300 },
  ]
}
