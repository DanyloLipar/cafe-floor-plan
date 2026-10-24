import { useState } from 'react';
import { ADD_BUTTON_ORDER } from '../../constants/items';
import { ADD_BUTTON_LABELS } from '../../constants/labels';
import type { EquipmentKind, ItemKind } from '../../types/floor';
import type { TableFormValues } from '../../types/form';
import { AddTableForm } from '../AddTableForm/AddTableForm';
import './Toolbar.css';

interface ToolbarProps {
  onAddTable: (values: TableFormValues) => void;
  onAddEquipment: (kind: EquipmentKind) => void;
}

export const Toolbar = ({ onAddTable, onAddEquipment }: ToolbarProps) => {
  const [isTableFormOpen, setIsTableFormOpen] = useState(false);

  const handleAddClick = (kind: ItemKind) => {
    if (kind === 'table') {
      setIsTableFormOpen(true);
    } else {
      onAddEquipment(kind);
    }
  };

  return (
    <>
      <div className="toolbar">
        {ADD_BUTTON_ORDER.map((kind) => (
          <button
            key={kind}
            type="button"
            className="toolbar__button"
            onClick={() => handleAddClick(kind)}
          >
            {ADD_BUTTON_LABELS[kind]}
          </button>
        ))}
      </div>

      {isTableFormOpen && (
        <AddTableForm
          onSubmit={(values) => {
            onAddTable(values);
            setIsTableFormOpen(false);
          }}
          onCancel={() => setIsTableFormOpen(false)}
        />
      )}
    </>
  );
};
