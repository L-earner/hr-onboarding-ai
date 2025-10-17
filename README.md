# Employee Onboarding Platform

An interactive employee onboarding platform with AI-powered chat support, training modules, team directory, and gamification features.

## Features

- **AI Onboarding Companion**: Chat with an AI assistant powered by Relevance AI
- **Interactive Training Modules**: Engaging learning content for new employees
- **Team Directory**: Browse and connect with team members
- **Onboarding Dashboard**: Track progress and tasks
- **Gamification**: Company trivia, team matcher, and onboarding sprint challenges

## Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, shadcn/ui components
- **Backend**: Supabase (Authentication, Database, Edge Functions)
- **AI Integration**: Relevance AI for chatbot functionality
- **Database**: Neon Serverless PostgreSQL with Drizzle ORM

## Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [npm](https://www.npmjs.com/) or [bun](https://bun.sh/)

You'll also need accounts for:
- [Supabase](https://supabase.com/) - For backend services
- [Relevance AI](https://relevanceai.com/) - For AI chatbot functionality

## Getting Started

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd <your-project-name>
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Copy the example environment file:

```bash
cp .env.example .env
```

Edit `.env` and fill in your actual values:

```env
# Supabase Configuration
VITE_SUPABASE_PROJECT_ID="your_supabase_project_id"
VITE_SUPABASE_PUBLISHABLE_KEY="your_supabase_publishable_key"
VITE_SUPABASE_URL="https://your_project_id.supabase.co"

# Relevance AI Configuration
VITE_RELEVANCE_AGENT_ID="your_relevance_agent_id"
VITE_RELEVANCE_PROJECT_ID="your_relevance_project_id"
```

### 4. Set Up Supabase

1. Create a new project at [app.supabase.com](https://app.supabase.com)
2. Get your project credentials:
   - Go to Project Settings > API
   - Copy the Project URL (`VITE_SUPABASE_URL`)
   - Copy the Project ID (`VITE_SUPABASE_PROJECT_ID`)
   - Copy the anon/public key (`VITE_SUPABASE_PUBLISHABLE_KEY`)

3. Set up the Edge Function:
   - Install Supabase CLI: `npm install -g supabase`
   - Login: `supabase login`
   - Link your project: `supabase link --project-ref your_project_id`
   - Deploy the function: `supabase functions deploy relevance-chat`

4. Configure Edge Function secrets:
   ```bash
   supabase secrets set RELEVANCE_API_KEY=your_api_key
   supabase secrets set RELEVANCE_AGENT_ID=your_agent_id
   supabase secrets set RELEVANCE_PROJECT_ID=your_project_id
   supabase secrets set RELEVANCE_REGION=f1db6c
   ```

### 5. Set Up Relevance AI

1. Create an account at [relevanceai.com](https://relevanceai.com)
2. Create a new agent for onboarding assistance
3. Get your credentials:
   - Agent ID from the agent settings
   - Project ID from your project dashboard
   - API Key from your account settings
4. Add these to both `.env` (for local development) and Supabase secrets (for production)

### 6. Run the Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:8080`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run build:dev` - Build for development environment
- `npm run lint` - Lint code with ESLint
- `npm run preview` - Preview production build locally

## Project Structure

```
src/
├── components/         # React components
│   ├── ui/            # shadcn/ui reusable components
│   ├── ChatBot.tsx    # AI chatbot interface
│   ├── OnboardingDashboard.tsx
│   ├── TrainingModule.tsx
│   └── ...
├── data/              # Static data (team info, training content)
├── hooks/             # Custom React hooks
├── integrations/      # Third-party integrations (Supabase)
├── lib/               # Utility functions
└── pages/             # Page components

supabase/
└── functions/
    └── relevance-chat/  # Edge function for AI chatbot

server/
└── db.ts              # Database configuration
```

## Customization

### Adding Team Members

Edit `src/data/teamData.ts` to add or modify team member information.

### Adding Training Modules

Edit `src/data/trainingContent.ts` to customize training content.

### Styling

The project uses Tailwind CSS with custom CSS variables defined in:
- `src/index.css` - Global styles
- `src/App.css` - App-specific styles

Modify `tailwind.config.ts` to customize the design system.

## Deployment

### Deploy to Vercel

```bash
npm install -g vercel
vercel
```

### Deploy to Netlify

```bash
npm install -g netlify-cli
netlify deploy
```

### Deploy to Replit

This project is pre-configured for Replit deployment. Simply import the repository and run it.

## Environment Variables for Production

Make sure to set all environment variables in your hosting platform:
- Vercel: Project Settings > Environment Variables
- Netlify: Site Settings > Environment Variables
- Replit: Secrets tab in the workspace

## Troubleshooting

### Chatbot not responding
- Verify all Relevance AI credentials are correct
- Check Supabase Edge Function logs: `supabase functions logs relevance-chat`
- Ensure Edge Function secrets are set correctly

### Build errors
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`
- Check TypeScript errors: `npm run build`

### Supabase connection issues
- Verify your Supabase URL and keys are correct
- Check if your Supabase project is active

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

For issues and questions:
- Open an issue on GitHub
- Check the [CLAUDE.md](CLAUDE.md) file for development guidance
- Refer to the official documentation:
  - [Supabase Docs](https://supabase.com/docs)
  - [Relevance AI Docs](https://docs.relevanceai.com/)
  - [Vite Docs](https://vitejs.dev/)
