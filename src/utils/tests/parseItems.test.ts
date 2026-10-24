import { describe, expect, it } from 'vitest';
import { parseItems } from '../parseItems';

const table = { id: 't1', kind: 'table', name: 'A1', seats: 2, occupied: false, x: 10, y: 20 };

describe('parseItems', () => {
  it('keeps a valid table', () => {
    expect(parseItems([table])).toEqual([table]);
  });

  it('keeps valid equipment and drops table-only fields', () => {
    const bar = { id: 'b1', kind: 'bar', x: 5, y: 6, name: 'Bar', seats: 3, occupied: true };

    expect(parseItems([bar])).toEqual([{ id: 'b1', kind: 'bar', x: 5, y: 6 }]);
  });

  it('clamps coordinates into the hall', () => {
    expect(parseItems([{ ...table, x: 500, y: -3 }])).toEqual([{ ...table, x: 100, y: 0 }]);
  });

  it('drops entries that are not valid items', () => {
    const invalid = [
      null,
      'text',
      { ...table, id: '' },
      { ...table, x: '10' },
      { ...table, name: '  ' },
      { ...table, seats: 13 },
      { ...table, occupied: 'yes' },
      { id: 'x', kind: 'sofa', x: 1, y: 1 },
    ];

    expect(parseItems(invalid)).toEqual([]);
  });

  it('keeps only the first item for a repeated id', () => {
    const duplicate = { ...table, name: 'Copy' };

    expect(parseItems([table, duplicate])).toEqual([table]);
  });
});
