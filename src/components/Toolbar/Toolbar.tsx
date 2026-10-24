import { ADD_BUTTON_LABELS } from '../../constants/labels'
import { ADD_BUTTON_ORDER } from '../../constants/buttons'
import './Toolbar.css'

export function Toolbar() {
  return (
    <div className="toolbar">
      {ADD_BUTTON_ORDER.map((kind) => (
        <button key={kind} type="button" className="toolbar__button">
          {ADD_BUTTON_LABELS[kind]}
        </button>
      ))}
    </div>
  )
}
