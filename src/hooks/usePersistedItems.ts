import { useEffect, useState } from 'react'
import type { FloorItem } from '../types/floor'
import { loadItems, saveItems } from '../utils/storage'

export const usePersistedItems = () => {
  const [items, setItems] = useState<FloorItem[]>(loadItems)

  useEffect(() => {
    saveItems(items)
  }, [items])

  return [items, setItems] as const
}
