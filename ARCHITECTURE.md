# Architecture of the React version

The React version lives in `src/` and is opened through `react.html`. The old vanilla version (`index.html`, `js/`) keeps running next to it until the migration is finished (see Exercise 3, Demo 6).

## Folder structure

The React code is organised **by feature**: every view of the app has its own folder, and only code that several features share lives in `components/`.

```
src/
├── main.tsx              entry point: loads the data, then mounts <App />
├── App.tsx               the shell: router + header + one route per view
├── data.ts               loads the JSON files (and the bookmarks) once at start-up
├── components/           shared, used by more than one feature
│   ├── Badge.tsx
│   ├── Section.tsx
│   └── PlaceholderPage.tsx
├── shell/                the frame around every page
│   ├── Header.tsx
│   └── NotFoundPage.tsx
├── dashboard/            feature: Dashboard
│   ├── DashboardPage.tsx
│   ├── CaseSummaryCard.tsx
│   ├── StatCard.tsx
│   ├── ReviewProgress.tsx
│   ├── RecentEvidence.tsx
│   └── RecentTimeline.tsx
├── people-locations/     feature: People & Locations
│   ├── TeamPage.tsx
│   ├── PersonDetailPage.tsx
│   ├── PeopleList.tsx
│   └── LocationsList.tsx
└── timeline/             feature: Timeline
    ├── TimelinePage.tsx
    ├── TimelineFilters.tsx
    ├── TimelineList.tsx
    └── TimelineEventCard.tsx
```

Evidence and Workspace are not migrated yet (Exercise 5). They will get their own folders `evidence/` and `workspace/`.

## Rule: shared or feature-local?

- A component that is used by **one feature only** lives in that feature's folder, even if it could be reused in theory. Example: `TimelineEventCard` is only used by the timeline, so it lives in `timeline/`.
- A component moves to `components/` as soon as **a second feature** uses it. Example: `Badge` is used by the timeline, the locations and the dashboard, so it lives in `components/`.
- `shell/` holds what belongs to the app as a whole, not to one view: the header with the navigation and the page for unknown URLs.

## Naming

- Each feature has one `...Page` component. It is the feature (container) component: it gets the data, reads the URL if needed and decides what to show.
- All other components are presentational: they get everything through props and only render it.

## Routing

`App.tsx` uses React Router with a `HashRouter`, so the route is after the `#` (for example `react.html#/team/people`). This works on GitHub Pages without any server configuration.

| URL                       | Page                       |
| ------------------------- | -------------------------- |
| `#/dashboard`             | `DashboardPage`            |
| `#/team/people`           | `TeamPage` (tab people)    |
| `#/team/locations`        | `TeamPage` (tab locations) |
| `#/team/people/:personId` | `PersonDetailPage`         |
| `#/timeline?person=...`   | `TimelinePage`             |
| anything else             | `NotFoundPage`             |
