import { describe, expect, it } from 'vitest';
import { clampPosition, toPercent } from '../geometry';

describe('clampPosition', () => {
  it('keeps values inside 0-100', () => {
    expect(clampPosition(-5, 120)).toEqual({ x: 0, y: 100 });
  });

  it('leaves valid values unchanged', () => {
    expect(clampPosition(40, 75)).toEqual({ x: 40, y: 75 });
  });

  it('rounds to two decimals', () => {
    expect(clampPosition(12.3456, 0.004)).toEqual({ x: 12.35, y: 0 });
  });
});

describe('toPercent', () => {
  it('converts a pixel distance to a percent of the free space', () => {
    expect(toPercent(50, 200)).toBe(25);
    expect(toPercent(-50, 200)).toBe(-25);
  });

  it('returns 0 when there is no free space', () => {
    expect(toPercent(50, 0)).toBe(0);
    expect(toPercent(50, -10)).toBe(0);
  });
});
