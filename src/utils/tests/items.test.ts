import { describe, expect, it } from 'vitest';
import { SPAWN_POSITION } from '../../constants/layout';
import { createEquipment, createTable } from '../items';

const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;

describe('createTable', () => {
  it('creates a free table at the spawn position', () => {
    const table = createTable({ name: 'C3', seats: 6 });

    expect(table).toMatchObject({
      kind: 'table',
      name: 'C3',
      seats: 6,
      occupied: false,
      ...SPAWN_POSITION,
    });
  });

  it('gives every table its own uuid', () => {
    const first = createTable({ name: 'A', seats: 2 });
    const second = createTable({ name: 'A', seats: 2 });

    expect(first.id).toMatch(UUID_PATTERN);
    expect(first.id).not.toBe(second.id);
  });
});

describe('createEquipment', () => {
  it('creates equipment of the given kind at the spawn position', () => {
    expect(createEquipment('fridge')).toMatchObject({ kind: 'fridge', ...SPAWN_POSITION });
  });

  it('has no table-only fields', () => {
    const bar = createEquipment('bar');

    expect(bar).not.toHaveProperty('name');
    expect(bar).not.toHaveProperty('seats');
    expect(bar).not.toHaveProperty('occupied');
  });

  it('gives every item its own uuid', () => {
    const first = createEquipment('bar');
    const second = createEquipment('bar');

    expect(first.id).toMatch(UUID_PATTERN);
    expect(first.id).not.toBe(second.id);
  });
});
