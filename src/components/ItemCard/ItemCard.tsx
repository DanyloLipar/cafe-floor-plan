import type { CSSProperties } from 'react'
import { EQUIPMENT_LABELS } from '../../constants/labels'
import { CARD_HEIGHT, CARD_WIDTH } from '../../constants/layout'
import { useDragItem } from '../../hooks/useDragItem'
import type { FloorItem, Position } from '../../types/floor'
import './ItemCard.css'

interface ItemCardProps {
  item: FloorItem
  onToggleOccupied: (id: string) => void
  onRemove: (id: string) => void
  onMove: (id: string, position: Position) => void
}

export const ItemCard = ({ item, onToggleOccupied, onRemove, onMove }: ItemCardProps) => {
  const { position, isDragging, handlers } = useDragItem(item, (next) => onMove(item.id, next))

  const style: CSSProperties = {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    transform: `translate(${position.x}px, ${position.y}px)`,
  }
  const draggingClass = isDragging ? ' card--dragging' : ''

  if (item.kind === 'table') {
    return (
      <article
        className={`card card--table${item.occupied ? ' card--occupied' : ''}${draggingClass}`}
        style={style}
        {...handlers}
      >
        <h2 className="card__title">{item.name}</h2>
        <p className="card__meta">Місць: {item.seats}</p>
        <p className="card__status">{item.occupied ? 'Зайнятий' : 'Вільний'}</p>
        <div className="card__actions">
          <button type="button" className="card__button" onClick={() => onToggleOccupied(item.id)}>
            {item.occupied ? 'Звільнити' : 'Зайняти'}
          </button>
          <button
            type="button"
            className="card__button"
            aria-label={`Прибрати ${item.name}`}
            onClick={() => onRemove(item.id)}
          >
            Прибрати
          </button>
        </div>
      </article>
    )
  }

  const label = EQUIPMENT_LABELS[item.kind]

  return (
    <article className={`card card--equipment${draggingClass}`} style={style} {...handlers}>
      <h2 className="card__title">{label}</h2>
      <div className="card__actions">
        <button
          type="button"
          className="card__button"
          aria-label={`Прибрати ${label}`}
          onClick={() => onRemove(item.id)}
        >
          Прибрати
        </button>
      </div>
    </article>
  )
}
