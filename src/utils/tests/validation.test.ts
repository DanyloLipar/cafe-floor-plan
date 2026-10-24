import { describe, expect, it } from 'vitest';
import { getNameError, getSeatsError, isValidSeats } from '../validation';

describe('getNameError', () => {
  it('rejects an empty or blank name', () => {
    expect(getNameError('')).toBe('Вкажи назву');
    expect(getNameError('   ')).toBe('Вкажи назву');
  });

  it('accepts a name', () => {
    expect(getNameError('A1')).toBeUndefined();
  });
});

describe('getSeatsError', () => {
  it.each(['', '0', '13', '2.5', '-1', 'abc'])('rejects "%s"', (value) => {
    expect(getSeatsError(value)).toBeDefined();
  });

  it.each(['1', '4', '12'])('accepts "%s"', (value) => {
    expect(getSeatsError(value)).toBeUndefined();
  });
});

describe('isValidSeats', () => {
  it('accepts integers from 1 to 12 only', () => {
    expect(isValidSeats(1)).toBe(true);
    expect(isValidSeats(12)).toBe(true);
    expect(isValidSeats(0)).toBe(false);
    expect(isValidSeats(13)).toBe(false);
    expect(isValidSeats(2.5)).toBe(false);
  });
});
