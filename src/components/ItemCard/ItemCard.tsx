import type { CSSProperties } from 'react'
import { EQUIPMENT_LABELS } from '../../constants/labels'
import { CARD_HEIGHT, CARD_WIDTH } from '../../constants/layout'
import type { FloorItem } from '../../types/floor'
import './ItemCard.css'

interface ItemCardProps {
  item: FloorItem
}

export const ItemCard = ({ item }: ItemCardProps) => {
  const style: CSSProperties = {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    transform: `translate(${item.x}px, ${item.y}px)`,
  }

  if (item.kind === 'table') {
    return (
      <article
        className={item.occupied ? 'card card--table card--occupied' : 'card card--table'}
        style={style}
      >
        <h2 className="card__title">{item.name}</h2>
        <p className="card__meta">Місць: {item.seats}</p>
        <p className="card__status">{item.occupied ? 'Зайнятий' : 'Вільний'}</p>
      </article>
    )
  }

  return (
    <article className="card card--equipment" style={style}>
      <h2 className="card__title">{EQUIPMENT_LABELS[item.kind]}</h2>
    </article>
  )
}
