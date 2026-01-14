# JEREMIAH33:3

A calm, faith-based focus tool that helps you work with intention while staying grounded in Scripture.

## What This Is

JEREMIAH33:3 is a simple, peaceful focus timer paired with Bible verses. It's designed to help you stay present in your work while keeping God's truth in front of you.

The name comes from Jeremiah 33:3: *"Call to me and I will answer you and tell you great and unsearchable things you do not know."*

## Live App

Visit the app at: **[jeremiah33-3.app](https://jeremiah33-3.app)**

## Features

### Focus Timer

Work with intention using a simple, calming countdown timer. It isn't a full Pomodoro system — there are no complex intervals or break cycles. Instead, it's designed to be peaceful and distraction-free, giving you space to breathe, focus, and stay present in your work.

### Bible Verse

Stay encouraged as you work with Scripture displayed beside the timer. A new verse appears every 5 minutes to refresh your motivation and refocus your mind on God's truth. If you ever want additional encouragement, you can generate a new verse at any time with a single click.

### User Accounts & Progress Tracking

Create an account to track your focus sessions over time:
- **Session History**: View all your completed focus sessions
- **Dashboard Stats**: See your total focus time, weekly summaries, and consistency streaks
- **Trend Analysis**: Track your progress with up/down trend indicators
- **Email or Google Sign-In**: Quick and secure authentication

## Tech Stack

- **Next.js 16** with App Router and React 19
- **TypeScript** with strict mode
- **Tailwind CSS 4** for styling
- **Supabase** for authentication and database
- **Framer Motion** for smooth animations
- **Vercel** for deployment and hosting

## Development

### Prerequisites

- Node.js 18+ and npm
- Supabase account (optional for local development)

### Getting Started

1. Clone the repository:
```bash
git clone https://github.com/Jeremias-Ventura/JEREMIAH333.git
cd JEREMIAH333
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

Edit `.env.local` with your Supabase credentials (get them from [supabase.com](https://supabase.com)):
```
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

### Database Setup

If you're using Supabase, run the migrations in order:

1. Go to your Supabase project → SQL Editor
2. Run each file in `supabase/migrations/` in order (001-005)
3. This creates the necessary tables and Row Level Security policies

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Run production build
npm run lint     # Run ESLint
```

## Architecture

For detailed architecture documentation, see [CLAUDE.md](CLAUDE.md).

Key architectural patterns:
- **Route Groups**: `(public)`, `(auth)`, `(protected)` for organized routing
- **Server Actions**: Authentication and data operations use Next.js server actions
- **Row Level Security**: Supabase RLS policies ensure users can only access their own data
- **Immutable Sessions**: Focus sessions cannot be modified after creation for data integrity
- **Graceful Degradation**: App works without Supabase via mock clients

## Security

This app implements multiple security layers:
- Row Level Security (RLS) policies on all database tables
- Input validation on all server actions
- Security headers (X-Frame-Options, CSP, HSTS, etc.)
- Database CHECK constraints for data integrity
- No exposed secrets in client code

For detailed security information, see [DEPLOYMENT_CHECKLIST.md](DEPLOYMENT_CHECKLIST.md).

## Deployment

The app is deployed on Vercel. For deployment instructions, see [DEPLOYMENT_CHECKLIST.md](DEPLOYMENT_CHECKLIST.md).

Required environment variables:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `NEXT_PUBLIC_SITE_URL`

## Future Features

We're planning to add:
- **Custom Bible Verses**: Add your own favorite verses to the rotation
- **Streak Tracking**: Visual streak calendars and milestone celebrations
- **Export Data**: Download your session history as CSV/JSON
- **Mobile App**: Native iOS and Android apps

## Contributing

This is a personal project, but feedback and suggestions are welcome! Feel free to open an issue or reach out via email.

## Contact

For feedback, support, or encouragement: jeremiah333app@gmail.com

## License

© 2025 JEREMIAH33:3. All rights reserved.

---

Built with love and faith 🙏

