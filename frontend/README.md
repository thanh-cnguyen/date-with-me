# Date With Me — Frontend

The React frontend for the Date With Me invitation and date-planning experience.

## Tech Stack

- React + Vite
- Supabase JavaScript client
- CSS

## Requirements

- Node.js 24
- npm

## Local Setup

### 1. Install dependencies

From the repository root:

```bash
cd frontend
npm install
```

### 2. Configure environment variables

Create `frontend/.env.local`:

```dotenv
VITE_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=YOUR_PUBLISHABLE_KEY
```

If `.env.example` is available, copy it and replace the placeholders:

```bash
cp .env.example .env.local
```

For Windows PowerShell:

```powershell
Copy-Item .env.example .env.local
```

The variable names must match those in `src/lib/supabase.js`.

> Keep `.env.local` ignored by Git. All `VITE_` variables are visible in the browser. Use only the Supabase publishable key—never a secret key, service-role key, or database password. Protect database access with appropriate row-level security policies.

### 3. Start the development server

```bash
npm run dev
```

Open the local URL printed in the terminal.

Restart the development server after changing environment variables.

## Available Commands

| Command | Purpose |
|---|---|
| `npm run dev` | Start the development server |
| `npm run lint` | Check code with ESLint |
| `npm run build` | Generate a production build in `dist/` |
| `npm run preview` | Preview the production build locally |

## Supabase Client

The client is configured in `src/lib/supabase.js`.

To use it from `src/App.jsx`:

```javascript
import { supabase } from './lib/supabase'
```

Adjust the relative import path when using it from other directories.

Client initialization does not verify database connectivity or access permissions.

## Frontend Checks

Before committing frontend changes:

- Run `npm run lint` and `npm run build`.
- Check affected screens at desktop and mobile widths.
- Confirm `.env.local` and `node_modules/` are ignored by Git.
- Keep actual credentials out of committed files.

See the [root README](../README.md) for project progress and architecture.
