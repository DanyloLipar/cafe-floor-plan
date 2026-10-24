import type { FloorItem } from '../types/floor';
import { createInitialItems } from './initialItems';
import { parseItems } from './parseItems';

export const STORAGE_KEY = 'cafe-floor-plan:items';

export const loadItems = (): FloorItem[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw === null) return createInitialItems();

    const saved: unknown = JSON.parse(raw);
    return Array.isArray(saved) ? parseItems(saved) : createInitialItems();
  } catch {
    return createInitialItems();
  }
};

export const saveItems = (items: readonly FloorItem[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    // Storage may be full or blocked; the in-memory plan keeps working.
  }
};
