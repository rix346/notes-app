# Notes App

A simple notes app built with Next.js and PostgreSQL to practise full-stack CRUD: reading, creating, editing and deleting data stored in a real database.

> Work in progress — reading notes works; the other features are being built step by step.

## Features

- [x] List all notes, newest first
- [ ] Create a note
- [ ] Edit a note
- [ ] Delete a note

## Tech stack

- [Next.js 16](https://nextjs.org) (App Router, Server Components)
- TypeScript
- PostgreSQL
- [node-postgres (`pg`)](https://node-postgres.com) — plain SQL queries, no ORM
- Plain CSS

## Getting started

### Prerequisites

- Node.js 20.9 or newer
- PostgreSQL running locally

### 1. Clone and install

```bash
git clone https://github.com/rix346/notes-app.git
cd notes-app
npm install
```

### 2. Create the database

```bash
psql -U postgres -c "CREATE DATABASE notes_app;"
```

### 3. Add your connection string

Create a file called `.env.local` in the project root:

```dotenv
DATABASE_URL=postgresql://USER:PASSWORD@localhost:5432/notes_app
```

Replace `USER` and `PASSWORD` with your PostgreSQL login. If your user has no password, leave out `:PASSWORD`. This file is ignored by Git and should never be committed.

### 4. Create the table and test data

```bash
npm run db:setup
```

This runs `db/schema.sql` (creates the `notes` table) and `db/seed.sql` (adds three test notes).

- The script logs in as the `postgres` role. If yours is different, change `-U postgres` in `package.json`.
- Run it only once. The schema is safe to run again, but the seed adds the test notes again each time.

### 5. Start the app

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project structure

```
app/page.tsx      Home page — reads notes from the database and lists them
lib/db.ts         Shared PostgreSQL connection pool
db/schema.sql     Table definition
db/seed.sql       Test data
```