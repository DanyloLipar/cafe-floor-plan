import { MAX_SEATS, MIN_SEATS } from '../constants/items';

const INTEGER_PATTERN = /^\d+$/;

export const isValidSeats = (seats: number): boolean =>
  Number.isInteger(seats) && seats >= MIN_SEATS && seats <= MAX_SEATS;

export const getNameError = (value: string): string | undefined =>
  value.trim() === '' ? 'Вкажи назву' : undefined;

export const getSeatsError = (value: string): string | undefined => {
  const text = value.trim();
  const isValid = INTEGER_PATTERN.test(text) && isValidSeats(Number(text));

  return isValid ? undefined : `Вкажи ціле число від ${MIN_SEATS} до ${MAX_SEATS}`;
};
