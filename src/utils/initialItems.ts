import type { FloorItem } from '../types/floor';

export const createInitialItems = (): FloorItem[] => [
  { id: 'table-a1', kind: 'table', name: 'A1', seats: 2, occupied: false, x: 2, y: 6 },
  { id: 'table-a2', kind: 'table', name: 'A2', seats: 4, occupied: true, x: 98, y: 6 },
  { id: 'table-b1', kind: 'table', name: 'B1', seats: 4, occupied: false, x: 2, y: 41 },
  { id: 'bar-1', kind: 'bar', x: 98, y: 41 },
  { id: 'register-1', kind: 'register', x: 98, y: 76 },
];
