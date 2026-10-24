import { useEffect, useId, useRef, useState, type SyntheticEvent } from 'react'
import { MAX_SEATS, MIN_SEATS } from '../../constants/items'
import type { TableFormErrors, TableFormValues } from '../../types/form'
import { validateTableForm } from '../../utils/validation'
import './AddTableForm.css'

interface AddTableFormProps {
  onSubmit: (values: TableFormValues) => void
  onCancel: () => void
}

export const AddTableForm = ({ onSubmit, onCancel }: AddTableFormProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const nameId = useId()
  const seatsId = useId()
  const [name, setName] = useState('')
  const [seats, setSeats] = useState('')
  const [errors, setErrors] = useState<TableFormErrors>({})

  useEffect(() => {
    const dialog = dialogRef.current
    if (dialog !== null && !dialog.open) dialog.showModal()
  }, [])

  const handleSubmit = (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault()
    const result = validateTableForm(name, seats);

    if (result.ok) {
      onSubmit(result.values)
    } else {
      setErrors(result.errors)
    }
  }

  return (
    <dialog
      ref={dialogRef}
      className="table-dialog"
      aria-labelledby={`${nameId}-title`}
      onCancel={(event) => {
        event.preventDefault()
        onCancel()
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) onCancel()
      }}
    >
      <form className="table-form" noValidate onSubmit={handleSubmit}>
        <h2 id={`${nameId}-title`} className="table-form__title">
          Новий стіл
        </h2>

        <div className="field">
          <label htmlFor={nameId}>Назва</label>
          <input
            id={nameId}
            value={name}
            aria-invalid={errors.name !== undefined}
            aria-describedby={errors.name !== undefined ? `${nameId}-error` : undefined}
            onChange={(event) => setName(event.target.value)}
          />
          {errors.name !== undefined && (
            <p id={`${nameId}-error`} className="field__error">
              {errors.name}
            </p>
          )}
        </div>

        <div className="field">
          <label htmlFor={seatsId}>Місць</label>
          <input
            id={seatsId}
            type="number"
            inputMode="numeric"
            min={MIN_SEATS}
            max={MAX_SEATS}
            step={1}
            value={seats}
            aria-invalid={errors.seats !== undefined}
            aria-describedby={errors.seats !== undefined ? `${seatsId}-error` : undefined}
            onChange={(event) => setSeats(event.target.value)}
          />
          {errors.seats !== undefined && (
            <p id={`${seatsId}-error`} className="field__error">
              {errors.seats}
            </p>
          )}
        </div>

        <div className="table-form__actions">
          <button type="button" className="table-form__button" onClick={onCancel}>
            Скасувати
          </button>
          <button type="submit" className="table-form__button table-form__button--primary">
            Додати
          </button>
        </div>
      </form>
    </dialog>
  )
}
