import { MAX_SEATS, MIN_SEATS } from '../constants/items';
import { isValidSeats } from './guards';

const INTEGER_PATTERN = /^\d+$/;

export const getNameError = (value: string): string | undefined =>
  value.trim() === '' ? 'Вкажи назву' : undefined;

export const getSeatsError = (value: string): string | undefined => {
  const text = value.trim();
  const isValid = INTEGER_PATTERN.test(text) && isValidSeats(Number(text));

  return isValid ? undefined : `Вкажи ціле число від ${MIN_SEATS} до ${MAX_SEATS}`;
};
