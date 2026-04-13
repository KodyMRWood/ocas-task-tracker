# OCAS Task Tracker

## Overview

This repository contains two main projects:

- `TaskTrackerBackend/TaskTrackerServer` — ASP.NET Core backend API using Entity Framework Core
- `TaskTrackerFrontend/TaskTracker` — React + TypeScript frontend built with Vite

## Prerequisites

- .NET 10 SDK
- Node.js (recommended 18+ or latest LTS)
- npm (comes with Node.js)

---

## Backend

### Install dependencies

Open a terminal and run:

```powershell
cd TaskTrackerBackend/TaskTrackerServer
dotnet restore
```

### Run the backend

From the backend folder:

```powershell
dotnet run
```

Navigate to http://localhost:5264/api/tasks

This starts the ASP.NET Core API server from `TaskTrackerBackend/TaskTrackerServer`.

### Backend database migrations

If you need to apply Entity Framework migrations:

```powershell
dotnet ef database update
```

This should be run from `TaskTrackerBackend/TaskTrackerServer`.

### Run backend tests

The backend tests are in `TaskTrackerBackend/TaskTrackerServer.Tests`.

```powershell
cd TaskTrackerBackend/TaskTrackerServer.Tests
dotnet test
```

To run a single test or filter tests:

```powershell
dotnet test --filter "<TestName>"
```

---

## Frontend

### Install dependencies

Open a terminal and run:

```powershell
cd TaskTrackerFrontend/TaskTracker
npm install
```

### Run the frontend

From the frontend folder:

```powershell
npm run dev
```

Navigate to http://localhost:5173/ to access the frontend

This starts the Vite development server. The frontend will connect to the backend API if the backend is running.

### Build the frontend

```powershell
npm run build
```

### Preview the built frontend

```powershell
npm run preview
```

### Frontend tests

There are currently no frontend test files included in this project.

---

## Working flow

1. Start the backend first so the API is available.
2. Start the frontend from `TaskTrackerFrontend/TaskTracker`.
3. Open the Vite local URL printed in the terminal.

## Notes

- The backend project is located under `TaskTrackerBackend/TaskTrackerServer`.
- The frontend project is located under `TaskTrackerFrontend/TaskTracker`.
- If the backend or frontend port needs to change, update the frontend fetch base URL or backend launch settings accordingly.
