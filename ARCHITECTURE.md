# Architecture

The React code lives in `src/` and is organised **by feature**: every view has its own folder.

## Folder structure

```
src/
├── main.tsx              start of the app, loads the data
├── App.tsx               the app itself, one route per view
├── data.ts               loads the JSON files
│
├── dashboard/            Dashboard view
├── people-locations/     People & Locations view
├── timeline/             Timeline view
│
├── components/           shared: used by more than one view
│   ├── Section.tsx
│   ├── Badge.tsx
│   └── PlaceholderPage.tsx
│
└── shell/                the frame around every page
    ├── Header.tsx
    └── NotFoundPage.tsx
```

- **View folders** (`dashboard/`, `people-locations/`, `timeline/`): everything that only this view needs.
- **`components/`**: small building blocks that several views use.
- **`shell/`**: the frame of the whole app. It exists once and is around every page, it is not used inside a view.
- **Top level of `src/`**: the start of the app. It doesn't belong to any view.

Evidence and Workspace are not migrated yet. They will get their own folders in Exercise 5.

## Rule: shared or feature-local?

| Used by…              | Goes into…       | Example                                                               |
| --------------------- | ---------------- | --------------------------------------------------------------------- |
| only **one** view     | that view folder | `TimelineEventCard`: only the timeline uses it → `timeline/`          |
| **two or more** views | `components/`    | `Section`: People & Locations and the timeline use it → `components/` |

A component only moves to `components/` when a second view really uses it, not because it _could_ be reused one day.
