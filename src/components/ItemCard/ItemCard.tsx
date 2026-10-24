import classNames from 'classnames';
import { EQUIPMENT_LABELS } from '../../constants/labels';
import { useDragItem } from '../../hooks/useDragItem';
import type { FloorItem, Position } from '../../types/floor';
import { getPositionStyle } from '../../utils/positionStyle';
import './ItemCard.css';

interface ItemCardProps {
  item: FloorItem;
  onToggleOccupied: (id: string) => void;
  onRemove: (id: string) => void;
  onMove: (id: string, position: Position) => void;
}

export const ItemCard = ({ item, onToggleOccupied, onRemove, onMove }: ItemCardProps) => {
  const { position, isDragging, handlers } = useDragItem(item, (next) => onMove(item.id, next));

  const title = item.kind === 'table' ? item.name : EQUIPMENT_LABELS[item.kind];

  return (
    <article
      className={classNames('card', {
        'card--table': item.kind === 'table',
        'card--equipment': item.kind !== 'table',
        'card--occupied': item.kind === 'table' && item.occupied,
        'card--dragging': isDragging,
      })}
      style={getPositionStyle(position)}
      {...handlers}
    >
      <h2 className="card__title">{title}</h2>

      {item.kind === 'table' && (
        <>
          <p className="card__meta">Місць: {item.seats}</p>
          <p className="card__status">{item.occupied ? 'Зайнятий' : 'Вільний'}</p>
        </>
      )}

      <div className="card__actions">
        {item.kind === 'table' && (
          <button type="button" className="card__button" onClick={() => onToggleOccupied(item.id)}>
            {item.occupied ? 'Звільнити' : 'Зайняти'}
          </button>
        )}
        <button
          type="button"
          className="card__button"
          aria-label={`Прибрати ${title}`}
          onClick={() => onRemove(item.id)}
        >
          Прибрати
        </button>
      </div>
    </article>
  );
};
