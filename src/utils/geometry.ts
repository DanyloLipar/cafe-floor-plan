import { CARD_HEIGHT, CARD_WIDTH, HALL_HEIGHT, HALL_WIDTH } from '../constants/layout'
import type { Position } from '../types/floor'

export function clampPosition(x: number, y: number): Position {
  return {
    x: Math.min(Math.max(x, 0), HALL_WIDTH - CARD_WIDTH),
    y: Math.min(Math.max(y, 0), HALL_HEIGHT - CARD_HEIGHT),
  }
}
