# Catur League - Chess Scoreboard

A modern, secure, and production-ready chess scoreboard application built with Next.js, featuring authentication and role-based access control. Admins can modify scores while regular users can only view them.

## Features

- **Role-based Access Control**: Distinguishes between Admin and User roles
- **Authentication**: Using NextAuth.js
- **Real-time Updates**: Scores update immediately for all users
- **Dark/Light Mode**: Toggle between color schemes
- **Responsive Design**: Works on all device sizes
- **Secure Backend**: Server Actions with admin validation
- **Modern UI**: With smooth animations using Framer Motion

## Tech Stack

- **Framework**: Next.js (App Router)
- **Language**: JavaScript
- **Styling**: Tailwind CSS
- **Authentication**: NextAuth.js
- **Database**: Firebase
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- A Vercel account (for deployment)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/catur-league.git
cd catur-league
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env.local` file:
```bash
cp .env.local.example .env.local
```

4. Update the environment variables in `.env.local` with your own values.


### Running the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Deployment

This application is configured for easy deployment on Vercel:

1. Push your code to a GitHub repository

2. Import the repository in Vercel

3. Configure the environment variables in the Vercel dashboard

4. Deploy!

## Admin Access

To add admin users, include their email addresses in the `ADMIN_EMAILS` environment variable (comma-separated). For example:
```
ADMIN_EMAILS=admin@example.com,another-admin@example.com
```

## Project Structure

- `/src/app` - Main application code
  - `/api/auth` - NextAuth.js API routes
  - `/auth/signin` - Custom sign-in page
  - `actions.js` - Server Actions for score manipulation
- `/src/components` - React components
  - `/ui` - Reusable UI components
  - `/providers` - Context providers
- `/src/lib` - Utility functions
  - `auth.js` - Authentication utilities
  

## License

This project is licensed under the MIT License.
