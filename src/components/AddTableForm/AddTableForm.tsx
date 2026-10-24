import { useEffect, useId, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { MAX_SEATS, MIN_SEATS } from '../../constants/items';
import type { TableFormFields, TableFormValues } from '../../types/form';
import { getNameError, getSeatsError } from '../../utils/validation';
import './AddTableForm.css';

interface AddTableFormProps {
  onSubmit: (values: TableFormValues) => void;
  onCancel: () => void;
}

export const AddTableForm = ({ onSubmit, onCancel }: AddTableFormProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const nameId = useId();
  const seatsId = useId();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TableFormFields>({ defaultValues: { name: '', seats: '' } });

  useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog !== null && !dialog.open) dialog.showModal();
  }, []);

  const submit = (fields: TableFormFields) => {
    onSubmit({ name: fields.name.trim(), seats: Number(fields.seats) });
  };

  return (
    <dialog
      ref={dialogRef}
      className="table-dialog"
      aria-labelledby={titleId}
      onCancel={(event) => {
        event.preventDefault();
        onCancel();
      }}
    >
      <form className="table-form" noValidate onSubmit={handleSubmit(submit)}>
        <h2 id={titleId} className="table-form__title">
          Новий стіл
        </h2>

        <div className="field">
          <label htmlFor={nameId}>Назва</label>
          <input
            id={nameId}
            aria-invalid={errors.name !== undefined}
            aria-describedby={errors.name !== undefined ? `${nameId}-error` : undefined}
            {...register('name', { validate: getNameError })}
          />
          {errors.name !== undefined && (
            <p id={`${nameId}-error`} className="field__error">
              {errors.name.message}
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
            aria-invalid={errors.seats !== undefined}
            aria-describedby={errors.seats !== undefined ? `${seatsId}-error` : undefined}
            {...register('seats', { validate: getSeatsError })}
          />
          {errors.seats !== undefined && (
            <p id={`${seatsId}-error`} className="field__error">
              {errors.seats.message}
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
  );
};
