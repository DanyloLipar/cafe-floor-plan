export interface TableFormValues {
  name: string
  seats: number
}

export interface TableFormErrors {
  name?: string
  seats?: string
}

export type TableFormResult =
  { ok: true; values: TableFormValues } | { ok: false; errors: TableFormErrors }
