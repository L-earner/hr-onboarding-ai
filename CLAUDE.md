# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an employee onboarding platform built with React, TypeScript, and Vite. The application provides an interactive onboarding experience with AI-powered chat support, training modules, team directory, and gamification features.

**Tech Stack:**
- Vite + React 18 + TypeScript
- Tailwind CSS + shadcn/ui components
- Supabase for backend and Edge Functions
- Relevance AI for chatbot functionality
- Drizzle ORM (server-side database access)

## Development Commands

```bash
# Install dependencies
npm i

# Start development server (runs on port 8080)
npm run dev

# Build for production
npm run build

# Build for development environment
npm run build:dev

# Lint code
npm run lint

# Preview production build
npm preview
```

## Architecture

### Application Structure

The app uses a **single-page application (SPA) architecture** with client-side routing managed through React state in `App.tsx`:

- **Main entry point**: `src/main.tsx` renders the root `App` component
- **Core layout**: `App.tsx` manages navigation state and conditionally renders sections
- **Navigation**: Handled by `Sidebar.tsx` component, which updates `activeSection` state
- **Sections**: home, notifications, learn, bounties, directory, games

### Key Directories

```
src/
├── components/         # Feature components
│   ├── ui/            # shadcn/ui components (48 files - reusable primitives)
│   ├── ChatBot.tsx    # AI chat interface using Relevance AI
│   ├── OnboardingDashboard.tsx
│   ├── TrainingModule.tsx
│   ├── TeamProfile.tsx
│   ├── CompanyTrivia.tsx
│   ├── TeamMatcher.tsx
│   └── OnboardingSprint.tsx
├── data/              # Static data files
│   ├── teamData.ts    # Team member information
│   └── trainingContent.ts  # Training module content
├── hooks/             # React hooks
│   ├── use-mobile.tsx
│   └── use-toast.ts
├── integrations/
│   └── supabase/      # Supabase client and types
├── lib/
│   └── utils.ts       # cn() utility for className merging
└── pages/             # Route pages (currently just NotFound)

server/
└── db.ts              # Neon serverless database setup with Drizzle

supabase/
└── functions/
    └── relevance-chat/  # Edge function for AI chatbot
```

### State Management

- **Local state**: React `useState` in `App.tsx` manages navigation and active components
- **No global state library**: Uses prop drilling for component communication
- **Data flow**: Static data from `src/data/` files, AI responses from Supabase Edge Function

### AI Chatbot Integration

The chatbot (`ChatBot.tsx`) integrates with Relevance AI through a Supabase Edge Function:

1. User sends message from `ChatBot.tsx`
2. Request sent to `/functions/v1/relevance-chat` Edge Function
3. Edge Function calls Relevance AI API with conversation tracking
4. Response polled asynchronously (max 30 attempts with exponential backoff)
5. Answer extracted and displayed with markdown rendering via `react-markdown`

**Environment variables required:**
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_PUBLISHABLE_KEY`
- `VITE_RELEVANCE_AGENT_ID`
- `VITE_RELEVANCE_PROJECT_ID`

**Edge Function environment:**
- `RELEVANCE_API_KEY`
- `RELEVANCE_AGENT_ID`
- `RELEVANCE_PROJECT_ID`
- `RELEVANCE_REGION` (defaults to 'f1db6c')

### Styling System

- **Tailwind CSS**: Utility-first CSS framework
- **CSS Variables**: Defined in `src/index.css` and `src/App.css`
- **Component styling**: Mix of Tailwind classes and custom CSS files
- **UI Components**: shadcn/ui pattern with `cn()` utility for conditional classes

### Path Aliases

TypeScript path alias `@/*` maps to `./src/*` for clean imports:
```typescript
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
```

## Replit Hosting

This app is configured to run on Replit. The Vite dev server:
- Listens on `::` (all interfaces) port 8080
- Has `allowedHosts` configured for `.replit.dev` and `.repl.co` domains
- Uses Replit-specific environment variable handling

## TypeScript Configuration

TypeScript is configured with relaxed settings for rapid development:
- `noImplicitAny: false`
- `strictNullChecks: false`
- `noUnusedLocals: false`
- `noUnusedParameters: false`

When adding type safety, consider these areas for improvement.

## UI Components Pattern

The project uses shadcn/ui components in `src/components/ui/`. These are:
- Built on Radix UI primitives
- Styled with Tailwind CSS
- Customizable and owned by the project (not a node_module)
- Import pattern: `import { Button } from "@/components/ui/button"`

To add new shadcn/ui components, use the CLI or manually copy from shadcn/ui docs, ensuring they match the project's styling configuration in `components.json`.

## Data Files

Static content is stored in `src/data/`:
- `teamData.ts`: Team member profiles with avatars, roles, bios
- `trainingContent.ts`: Training module content and structure

These files export TypeScript objects consumed by feature components.

## Working with the Chatbot

The ChatBot component maintains conversation state:
- Messages array with user/bot messages
- `conversationId` for maintaining context across messages
- Auto-scrolling to latest message
- Markdown rendering for rich bot responses
- Refresh button to reset conversation

When modifying the chatbot, ensure the Edge Function polling logic in `supabase/functions/relevance-chat/index.ts` correctly extracts answers from the Relevance AI response structure.

## Database (Server-side)

The `server/db.ts` file sets up Neon serverless Postgres with Drizzle ORM. This is separate from the Supabase client integration and requires `DATABASE_URL` environment variable. The schema is referenced from `@shared/schema` (location not visible in current structure).
