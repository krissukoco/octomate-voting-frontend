# Octomate Voting Frontend

A simple React-based voting application built for a technical test. This frontend interfaces with a backend API to provide a voting system where users can vote for holiday destinations.

## 🌐 Live Demo

**Try the application**: [https://octomate-voting.krissukoco.com](https://octomate-voting.krissukoco.com)

### How to Test the Application:

1. **Login as Admin**
   - Username: `admin`
   - Password: `admin`

2. **Create User Account**
   - Navigate to "Users" from the admin dashboard
   - Click "Create New User" 
   - Enter only the username (password will be generated automatically by the backend)
   - After creation, you'll be redirected to the user list page
   - Find the newly created user in the table and click "Copy Password" to get the generated password

3. **Vote as User**
   - Logout from admin account
   - Login with the username you created and the copied password
   - Vote for your preferred holiday destination (choose from options or enter custom destination)

4. **View Voting Results**
   - Logout from user account
   - Login as admin again (`admin` / `admin`)
   - Navigate to "Votes" to see the voting statistics and results

The application demonstrates role-based authentication, user management, voting functionality, and result visualization.

## Features

- **Role-based Authentication**: Separate interfaces for Admin and User roles
- **Admin Dashboard**: Manage users, view voting results, and system administration
- **User Voting Interface**: Vote for holiday destinations with predefined options or custom choices
- **Real-time Updates**: Vote changes are reflected immediately
- **Responsive Design**: Built with Tailwind CSS and DaisyUI components

## Project Structure

```
src/
├── App.tsx                 # Main application component with auth context
├── _auth/                  # Authentication utilities
├── _network/               # API client configuration
│   └── api.ts             # HTTP client with auth headers
├── _services/             # API service functions
│   ├── auth.ts            # Authentication services
│   ├── user.ts            # User management services
│   └── vote.ts            # Voting services
├── context/               # React contexts
│   └── auth.tsx           # Authentication context provider
├── hooks/                 # Custom React hooks
│   └── api.tsx            # API request hook
├── pages/                 # Page components
│   ├── admin/             # Admin-specific pages
│   │   ├── home.tsx       # Admin dashboard
│   │   ├── user-create.tsx # Create new users
│   │   ├── user-list.tsx   # List all users
│   │   └── vote.tsx       # View voting results
│   ├── users/             # User-specific pages
│   │   └── home.tsx       # User voting interface
│   └── login.tsx          # Login page
└── routes/                # Route configuration
    └── index.tsx          # Role-based routing logic
```

## User Roles

### Admin
- Access user management (create, list users)
- View voting results and statistics
- Administrative dashboard

### User
- Vote for holiday destinations
- Choose from predefined options or enter custom destinations
- Modify vote choices

## Tech Stack

- **React 19** with TypeScript
- **Vite** for build tooling
- **React Router** for navigation
- **Tailwind CSS** + **DaisyUI** for styling
- **React Hook Form** for form handling
- **React Hot Toast** for notifications

## Setup & Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd octomate-voting-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment**
   ```bash
   cp .env.example .env
   ```
   Update the `VITE_API_BASE_URL` in `.env` to point to your backend API (default: `http://localhost:8080`)

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## Backend Integration

This frontend expects a backend API running with the following endpoints:
- `POST /auth/admin/login` - Admin authentication
- `POST /auth/user/login` - User authentication
- `GET /vote/current` - Get current user's vote
- `GET /vote/options` - Get predefined voting options
- `POST /vote` - Submit/update vote
- `GET /admin/summary` - Get voting statistics (admin only)
- User management endpoints for admin operations

## Development Notes

This project was built as a technical test submission for a backend position. The frontend is intentionally simple to demonstrate integration capabilities with the primary backend implementation. The focus is on clean code structure, proper authentication flow, and seamless API integration.
