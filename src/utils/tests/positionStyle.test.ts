import { describe, expect, it } from 'vitest';
import { getPositionStyle } from '../positionStyle';

describe('getPositionStyle', () => {
  it('exposes the position as --x and --y custom properties', () => {
    expect(getPositionStyle({ x: 10, y: 20 })).toEqual({ '--x': 10, '--y': 20 });
  });
});
