import { MAX_COORDINATE, MIN_COORDINATE } from '../constants/layout';
import type { Position } from '../types/floor';

const clampCoordinate = (value: number): number =>
  Math.min(Math.max(value, MIN_COORDINATE), MAX_COORDINATE);

const roundCoordinate = (value: number): number => Math.round(value * 100) / 100;

export const clampPosition = (x: number, y: number): Position => ({
  x: roundCoordinate(clampCoordinate(x)),
  y: roundCoordinate(clampCoordinate(y)),
});
