import type { CSSProperties } from 'react';
import type { Position } from '../types/floor';

export const getPositionStyle = ({ x, y }: Position): CSSProperties =>
  ({ '--x': x, '--y': y }) as CSSProperties;
