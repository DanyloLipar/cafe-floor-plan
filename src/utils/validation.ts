import { MAX_SEATS, MIN_SEATS } from '../constants/items'
import type { TableFormErrors, TableFormResult } from '../types/form'
import { isValidSeats } from './guards'

const INTEGER_PATTERN = /^\d+$/

export const validateTableForm = (rawName: string, rawSeats: string): TableFormResult => {
  const name = rawName.trim()
  const seatsText = rawSeats.trim()
  const seats = INTEGER_PATTERN.test(seatsText) ? Number(seatsText) : NaN

  const errors: TableFormErrors = {}
  if (name === '') errors.name = 'Вкажи назву'
  if (!isValidSeats(seats)) errors.seats = `Вкажи ціле число від ${MIN_SEATS} до ${MAX_SEATS}`

  if (errors.name !== undefined || errors.seats !== undefined) return { ok: false, errors }
  return { ok: true, values: { name, seats } }
}
