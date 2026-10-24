import './App.css'
import { FloorPlan } from './components/FloorPlan/FloorPlan'
import { Toolbar } from './components/Toolbar/Toolbar'
import { useFloorItems } from './hooks/useFloorItems'

function App() {
  const { items, addTable, addEquipment, toggleOccupied, removeItem } = useFloorItems()

  return (
    <main className="app">
      <h1 className="app__title">Зал</h1>
      <Toolbar onAddTable={addTable} onAddEquipment={addEquipment} />
      <FloorPlan items={items} onToggleOccupied={toggleOccupied} onRemove={removeItem} />
    </main>
  )
}

export default App
