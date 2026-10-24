import { v4 as uuidv4 } from 'uuid';
import type { FloorItem } from '../types/floor';

export const createInitialItems = (): FloorItem[] => [
    { id: uuidv4(), kind: 'table', name: 'A1', seats: 2, occupied: false, x: 2, y: 6 },
    { id: uuidv4(), kind: 'table', name: 'A2', seats: 4, occupied: true, x: 98, y: 6 },
    { id: uuidv4(), kind: 'table', name: 'B1', seats: 4, occupied: false, x: 2, y: 41 },
    { id: uuidv4(), kind: 'bar', x: 98, y: 41 },
    { id: uuidv4(), kind: 'register', x: 98, y: 76 },
];
