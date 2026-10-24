import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import type { FloorItem } from '../../types/floor';
import { createInitialItems } from '../initialItems';
import { loadItems, saveItems, STORAGE_KEY } from '../storage';

const createFakeStorage = () => {
  const data = new Map<string, string>();

  return {
    getItem: (key: string) => data.get(key) ?? null,
    setItem: (key: string, value: string) => {
      data.set(key, value);
    },
  };
};

const items: FloorItem[] = [
  { id: 't1', kind: 'table', name: 'A1', seats: 2, occupied: true, x: 10, y: 20 },
  { id: 'b1', kind: 'bar', x: 50, y: 50 },
];

beforeEach(() => {
  vi.stubGlobal('localStorage', createFakeStorage());
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('loadItems', () => {
  it('returns the starter layout when nothing is saved', () => {
    expect(loadItems()).toEqual(createInitialItems());
  });

  it('returns the starter layout when the saved JSON is broken', () => {
    localStorage.setItem(STORAGE_KEY, '{oops');

    expect(loadItems()).toEqual(createInitialItems());
  });

  it('returns the starter layout when the saved value is not a list', () => {
    localStorage.setItem(STORAGE_KEY, '{"id":"t1"}');

    expect(loadItems()).toEqual(createInitialItems());
  });

  it('keeps a saved empty list empty', () => {
    saveItems([]);

    expect(loadItems()).toEqual([]);
  });

  it('restores saved items', () => {
    saveItems(items);

    expect(loadItems()).toEqual(items);
  });

  it('returns the starter layout when storage is unavailable', () => {
    vi.stubGlobal('localStorage', {
      getItem: () => {
        throw new Error('blocked');
      },
    });

    expect(loadItems()).toEqual(createInitialItems());
  });
});

describe('saveItems', () => {
  it('does not throw when storage is unavailable', () => {
    vi.stubGlobal('localStorage', {
      setItem: () => {
        throw new Error('full');
      },
    });

    expect(() => saveItems(items)).not.toThrow();
  });
});
