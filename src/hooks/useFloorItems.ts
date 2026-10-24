import type { EquipmentKind } from '../types/floor'
import type { TableFormValues } from '../types/form'
import { createEquipment, createTable } from '../utils/items'
import { usePersistedItems } from './usePersistedItems'

export const useFloorItems = () => {
  const [items, setItems] = usePersistedItems()

  const addTable = (values: TableFormValues) => {
    const table = createTable(values)
    setItems((prev) => [...prev, table])
  }

  const addEquipment = (kind: EquipmentKind) => {
    const equipment = createEquipment(kind)
    setItems((prev) => [...prev, equipment])
  }

  const toggleOccupied = (id: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id && item.kind === 'table' ? { ...item, occupied: !item.occupied } : item,
      ),
    )
  }

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id))
  }

  return { items, addTable, addEquipment, toggleOccupied, removeItem }
}
