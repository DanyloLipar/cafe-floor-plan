import { v4 as uuidv4 } from 'uuid';
import { SPAWN_POSITION } from '../constants/layout';
import type { EquipmentItem, EquipmentKind, TableItem } from '../types/floor';
import type { TableFormValues } from '../types/form';

export const createTable = ({ name, seats }: TableFormValues): TableItem => ({
  id: uuidv4(),
  kind: 'table',
  name,
  seats,
  occupied: false,
  ...SPAWN_POSITION,
});

export const createEquipment = (kind: EquipmentKind): EquipmentItem => ({
  id: uuidv4(),
  kind,
  ...SPAWN_POSITION,
});
