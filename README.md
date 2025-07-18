# Student Fee Portal

A full-stack web application for managing student fee payments, built with Node.js, Express, TypeScript, Prisma, PostgreSQL (backend), and React + Vite (frontend).

---

## Features
- User authentication (sign up, login, logout)
- Student profile management
- Fee payment tracking
- Admin and student roles
- Responsive UI

---

## Project Structure
```
assignment/
  backend/      # Node.js, Express, TypeScript, Prisma
  frontend/     # React, Vite
```

---

## Backend Setup (Render)

1. **Install dependencies:**
   ```sh
   cd backend
   npm install
   ```
2. **Set up environment variables:**
   - Create a `.env` file in `backend/` with:
     ```env
     DATABASE_URL=your_postgres_connection_string
     
     ```
3. **Prisma setup:**
   - Run migrations:
     ```sh
     npx prisma migrate deploy
     ```
   - Generate client:
     ```sh
     npx prisma generate
     ```
4. **Build and start:**
   ```sh
   npm run build
   npm run start
   ```
5. **Deployment:**
   - Deploy to [Render](https://render.com/) as a web service.
   - Set root directory to `backend`.
   - Build command: `npm install && npm run build`
   - Start command: `npm run start`
   - Add environment variables in Render dashboard.

---

## Frontend Setup (Vercel)

1. **Install dependencies:**
   ```sh
   cd frontend
   npm install
   ```
2. **Set up environment variable:**
   - In Vercel dashboard, add:
     - `VITE_API_URL=https://your-backend.onrender.com`
3. **Development:**
   ```sh
   npm run dev
   ```
4. **Build:**
   ```sh
   npm run build
   ```
5. **Deployment:**
   - Deploy to [Vercel](https://vercel.com/)
   - Set root directory to `frontend`
   - Build command: `npm run build`
   - Output directory: `dist`
   - Add environment variable as above

---

## Testing the App

- **Sign up and login:** Use the signup form to create test users. You can add 2-3 users for testing.
- **Student actions:**
  - View and update profile
  - Pay fees (simulate payment)
- **Admin actions:**
  - View all students
  - Update student info

---

## Tech Stack
- **Backend:** Node.js, Express, TypeScript, Prisma, PostgreSQL
- **Frontend:** React, Vite, TypeScript
- **Deployment:** Render (backend), Vercel (frontend)

---
