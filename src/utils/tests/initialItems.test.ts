import { describe, expect, it } from 'vitest';
import { createInitialItems } from '../initialItems';
import { parseItems } from '../parseItems';

describe('createInitialItems', () => {
  it('has the tables from the assignment', () => {
    const items = createInitialItems();

    expect(items).toContainEqual(
      expect.objectContaining({ name: 'A1', seats: 2, occupied: false }),
    );
    expect(items).toContainEqual(expect.objectContaining({ name: 'A2', seats: 4, occupied: true }));
    expect(items).toContainEqual(
      expect.objectContaining({ name: 'B1', seats: 4, occupied: false }),
    );
  });

  it('has a bar and a register', () => {
    const kinds = createInitialItems().map((item) => item.kind);

    expect(kinds).toContain('bar');
    expect(kinds).toContain('register');
  });

  it('uses unique ids', () => {
    const ids = createInitialItems().map((item) => item.id);

    expect(new Set(ids).size).toBe(ids.length);
  });

  it('only contains items that survive parsing unchanged', () => {
    const items = createInitialItems();

    expect(parseItems(items)).toEqual(items);
  });

  it('returns a new list on every call', () => {
    expect(createInitialItems()).not.toBe(createInitialItems());
  });
});
