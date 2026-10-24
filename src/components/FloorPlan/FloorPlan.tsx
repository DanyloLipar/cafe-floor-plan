import { HALL_HEIGHT, HALL_WIDTH } from '../../constants/layout'
import type { FloorItem } from '../../types/floor'
import { ItemCard } from '../ItemCard/ItemCard'
import './FloorPlan.css'

interface FloorPlanProps {
  items: readonly FloorItem[]
  onToggleOccupied: (id: string) => void
  onRemove: (id: string) => void
}

export const FloorPlan = ({ items, onToggleOccupied, onRemove }: FloorPlanProps) => {
  return (
    <div className="hall-scroll">
      <div
        className="hall"
        role="region"
        aria-label="Hall Plan"
        style={{ width: HALL_WIDTH, height: HALL_HEIGHT }}
      >
        {items.map((item) => (
          <ItemCard
            key={item.id}
            item={item}
            onToggleOccupied={onToggleOccupied}
            onRemove={onRemove}
          />
        ))}
      </div>
    </div>
  )
}
