# Job Application Tracker (MERN)

A simple CRUD MERN app to track job applications.

## Prerequisites
- Node.js 18+ and npm
- MongoDB (local or Atlas)

## 1) Backend Setup
```bash
cd backend
cp .env.example .env   # or create .env
# edit .env and set MONGO_URI if needed
npm install
npm run dev
```
Server runs at http://localhost:5000 and exposes `/api/jobs`.

## 2) Frontend Setup
Open a new terminal:
```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```
Frontend runs at http://localhost:5173

## Notes
- Update `VITE_API_BASE_URL` in `frontend/.env` if your backend runs on a different host/port.
- CRUD endpoints:
  - GET    /api/jobs
  - GET    /api/jobs/:id
  - POST   /api/jobs
  - PUT    /api/jobs/:id
  - DELETE /api/jobs/:id
- Filter by `?q=<company>` and `?status=Applied|Interview|Rejected|Offer|Hired`

## Screens
- Home: Add new job + filter + list
- Edit: Update an existing job
```