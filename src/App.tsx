import './App.css'
import { FloorPlan } from './components/FloorPlan/FloorPlan'
import { Toolbar } from './components/Toolbar/Toolbar'
import { usePersistedItems } from './hooks/usePersistedItems'

function App() {
  const [items] = usePersistedItems()

  return (
    <main className="app">
      <h1 className="app__title">Зал</h1>
      <Toolbar />
      <FloorPlan items={items} />
    </main>
  )
}

export default App
