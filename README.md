# Rental Management System — Frontend

A React-based web application for a rental management platform, where tenants can track rent payments and admins can review approvals — built on top of a Spring Boot + JWT secured backend.

## Features

- **Authentication** — Login and Registration with file uploads (ID proof, photo)
- **Protected Routes** — Role-based redirects (USER / ADMIN) using React Router
- **Tenant Dashboard** — View profile, rent payment history with pending/completed status, and submit new payments with screenshot upload
- **Admin Dashboard** — View all tenants, review pending payments, accept/reject with a remark
- **JWT Token Management** — Automatic token attachment via Axios interceptors
- **Responsive, Modern UI** — Glassmorphism-inspired design with gradient backgrounds

## Tech Stack

- **React 19** + **Vite**
- **React Router** for client-side routing
- **Axios** for API communication
- **Context API** for authentication state management
- **Plain CSS** (custom design system)

## Pages

| Route | Description | Access |
|-------|--------------|--------|
| `/` | Landing page | Public |
| `/login` | Login page | Public |
| `/register` | Registration page (with file uploads) | Public |
| `/profile` | Tenant profile, rent history, payment upload | USER |
| `/admin/dashboard` | Admin dashboard — users & pending payments | ADMIN |

## Running Locally

1. Clone the repo
2. Install dependencies:
```bash
   npm install
```
3. Ensure the backend is running at `http://localhost:8080`
4. Start the dev server:
```bash
   npm run dev
```
5. Open `http://localhost:5173`

## Related Repository

Backend (Spring Boot): [rental-management-backend](https://github.com/Rasika3128/rental-management-backend)