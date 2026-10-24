import { useRef, useState, type MouseEvent, type PointerEvent } from 'react';
import { DRAG_THRESHOLD_PX } from '../constants/layout';
import type { Position } from '../types/floor';
import { clampPosition, toPercent } from '../utils/geometry';

interface DragSession {
  pointerId: number;
  startPointer: Position;
  startItem: Position;
  freeWidth: number;
  freeHeight: number;
  isDragging: boolean;
}

export const useDragItem = (origin: Position, onDrop: (position: Position) => void) => {
  const [dragPosition, setDragPosition] = useState<Position | null>(null);

  const sessionRef = useRef<DragSession | null>(null);
  const suppressClickRef = useRef(false);

  const positionFor = (session: DragSession, event: PointerEvent<HTMLElement>): Position =>
    clampPosition(
      session.startItem.x + toPercent(event.clientX - session.startPointer.x, session.freeWidth),
      session.startItem.y + toPercent(event.clientY - session.startPointer.y, session.freeHeight),
    );

  const handlePointerDown = (event: PointerEvent<HTMLElement>) => {
    if (!event.isPrimary || event.button !== 0) return;

    const card = event.currentTarget;
    const hall = card.offsetParent;

    if (!(hall instanceof HTMLElement)) return;

    sessionRef.current = {
      pointerId: event.pointerId,
      startPointer: { x: event.clientX, y: event.clientY },
      startItem: { x: origin.x, y: origin.y },
      freeWidth: hall.clientWidth - card.offsetWidth,
      freeHeight: hall.clientHeight - card.offsetHeight,
      isDragging: false,
    };
  };

  const handlePointerMove = (event: PointerEvent<HTMLElement>) => {
    const session = sessionRef.current;
    if (session === null || event.pointerId !== session.pointerId) return;

    if (!session.isDragging) {
      const distance = Math.hypot(
        event.clientX - session.startPointer.x,
        event.clientY - session.startPointer.y,
      );
      if (distance < DRAG_THRESHOLD_PX) return;
      session.isDragging = true;

      event.currentTarget.setPointerCapture(event.pointerId);
    }

    setDragPosition(positionFor(session, event));
  };

  const finishDrag = (event: PointerEvent<HTMLElement>, commit: boolean) => {
    const session = sessionRef.current;

    if (session === null || event.pointerId !== session.pointerId) return;
    sessionRef.current = null;

    if (!session.isDragging) return;

    suppressClickRef.current = true;
    window.setTimeout(() => {
      suppressClickRef.current = false;
    }, 0);

    setDragPosition(null);

    if (!commit) return;

    const final = positionFor(session, event);

    if (final.x !== session.startItem.x || final.y !== session.startItem.y) onDrop(final);
  };

  const handleClickCapture = (event: MouseEvent<HTMLElement>) => {
    if (!suppressClickRef.current) return;
    event.stopPropagation();
    event.preventDefault();
  };

  return {
    position: dragPosition ?? origin,
    isDragging: dragPosition !== null,
    handlers: {
      onPointerDown: handlePointerDown,
      onPointerMove: handlePointerMove,
      onPointerUp: (event: PointerEvent<HTMLElement>) => finishDrag(event, true),
      onPointerCancel: (event: PointerEvent<HTMLElement>) => finishDrag(event, false),
      onClickCapture: handleClickCapture,
    },
  };
};
