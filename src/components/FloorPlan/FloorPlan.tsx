import type { FloorItem, Position } from '../../types/floor';
import { ItemCard } from '../ItemCard/ItemCard';
import './FloorPlan.css';

interface FloorPlanProps {
  items: readonly FloorItem[];
  onToggleOccupied: (id: string) => void;
  onRemove: (id: string) => void;
  onMove: (id: string, position: Position) => void;
}

export const FloorPlan = ({ items, onToggleOccupied, onRemove, onMove }: FloorPlanProps) => {
  return (
    <div className="hall" role="region" aria-label="Hall Plan">
      {items.map((item) => (
        <ItemCard
          key={item.id}
          item={item}
          onToggleOccupied={onToggleOccupied}
          onRemove={onRemove}
          onMove={onMove}
        />
      ))}
    </div>
  );
};
