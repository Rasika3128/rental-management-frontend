# RentEase: Rental Management System (Frontend)

A responsive React web app where tenants track rent, deposits and payment status, and property owners (admins) manage tenants and approve payments.

**Live demo:** https://rental-management-frontend-omega.vercel.app
**Backend API:** https://rental-management-backend-geea.onrender.com
**Backend repo:** [rental-management-backend](https://github.com/Rasika3128/rental-management-backend)

> The backend runs on a free tier and may take ~50 seconds to wake up on the first request.

## Screenshots

<!-- Add screenshots to a /screenshots folder and link them here -->
| Landing | Login | Tenant Profile | Admin Dashboard |
|---|---|---|---|
| ![](screenshots/landing.png) | ![](screenshots/login.png) | ![](screenshots/profile.png) | ![](screenshots/admin.png) |

## Features

**Tenant**
- Register with ID proof and passport photo upload
- Enter rent, deposit and occupation (student / working) details
- Profile with photo and an account summary: monthly rent, total paid, balance, deposit status
- Submit rent payments with a screenshot and track Pending / Accepted / Rejected status

**Admin**
- Dashboard with total users and pending payments
- Review payment screenshots, accept or reject with a remark
- Edit a tenant's rent and deposit details
- Reset a tenant's password and delete users

**General**
- JWT authentication with role-based protected routes (USER / ADMIN)
- Axios interceptor that attaches the token automatically
- Responsive glassmorphism-style UI (desktop and mobile)
- Reusable components for loading and error states

## Tech Stack

- React 19 + Vite
- React Router
- Axios
- Context API (auth state)
- Custom CSS design system
- Deployed on Vercel

## Pages

| Route | Description | Access |
|-------|-------------|--------|
| `/` | Landing page | Public |
| `/login` | Login | Public |
| `/register` | Registration with file uploads | Public |
| `/profile` | Profile, account summary, rent history, payment upload | USER |
| `/admin/dashboard` | Users, finance editing, pending payments | ADMIN |

## Running Locally

1. Clone the repo and run `npm install`
2. Set the API base URL in `src/services/api.js` (the backend URL or `http://localhost:8080/api`)
3. Start the dev server: `npm run dev`
4. Open `http://localhost:5173`

## Roadmap

- Email-based password reset
- Data export (CSV/Excel) for admins
- Toast notifications and modals instead of browser prompts
- Analytics charts on the admin dashboard