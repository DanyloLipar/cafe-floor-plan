# cafe-floor-plan

A single-screen floor plan for a small café: a top-down view of one room with cards for tables, a bar, a register and a fridge. The owner can see where everything stands, drag items with a mouse or a finger, add new ones, mark a table as occupied and reload the page without losing the layout.

There is no server, database or login. All changes are saved to the browser's `localStorage`.

## Features

- Hall with a 16:10 frame; every card stays inside it.
- Tables show name, seats and status. Occupied tables have a different colour and an explicit "Зайняти / Звільнити" button.
- Bar, register and fridge show only their type; several of the same kind can be added.
- "Додати стіл" opens a form (name is required, seats are an integer from 1 to 12). Equipment is added with one click.
- Drag with pointer events (mouse and touch). Movement of 3px or more is a drag; a press without movement is a normal click, so dragging from a button does not trigger it.
- Every card has a "Прибрати" button without a confirmation dialog.
- Responsive layout: buttons wrap, the hall takes the full width and grows taller below 780px.

## Getting started

```bash
npm install
npm run dev
```

| Command          | Description                    |
| ---------------- | ------------------------------ |
| `npm run dev`    | Start the dev server           |
| `npm run build`  | Type-check and build to `dist` |
| `npm run lint`   | Run ESLint                     |
| `npm run format` | Format files with Prettier     |
| `npm test`       | Run unit tests (Vitest)        |

## Stack

React 19, TypeScript, Vite, React Hook Form (add-table form), uuid (item ids), classnames, Vitest, ESLint and Prettier.

## Project structure

```
src/
├── components/   AddTableForm, FloorPlan, ItemCard, Toolbar (each with its own CSS)
├── hooks/        useFloorItems (state and actions), usePersistedItems, useDragItem
├── utils/        storage and parseItems (saved data), geometry, validation, items, positionStyle, initialItems (tests in __tests__/)
├── constants/    layout, labels, items
├── types/        floor (items) and form
└── styles/       global.css
```

## Limitations

- Tests cover the pure logic (validation, geometry, saved-data parsing and storage); components and hooks are not tested.
- Changes are not synced between open tabs.
