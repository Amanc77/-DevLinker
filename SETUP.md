# DevLinker Setup Instructions

## Quick Start

### 1. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file:
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/devlinker
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRE=7d
CORS_ORIGIN=http://localhost:5173
```

Make sure MongoDB is running, then:
```bash
# Seed the database with communities
npm run seed

# Start the server
npm start
# or for development with auto-reload
npm run dev
```

### 2. Frontend Setup

```bash
cd frontend
npm install
```

Create a `.env` file:
```env
VITE_API_BASE_URL=http://localhost:5000/api
```

Start the development server:
```bash
npm run dev
```

## Features Implemented

✅ User Authentication (Register/Login with JWT)
✅ Upload Community (Protected route - requires login)
✅ Join Community with Confirmation Dialog
✅ Save/Unsave Communities
✅ Filter Communities (Tech Stack, Platform, Location, Activity Level)
✅ Search Communities
✅ Dark Mode (Default) and Light Mode
✅ Responsive Design
✅ Footer Component
✅ Transparent Navbar with Glass Effect
✅ All data fetched from backend API

## API Endpoints

### Auth
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### Communities
- `GET /api/communities` - Get all communities (with filters)
- `GET /api/communities/:id` - Get single community
- `GET /api/communities/featured/list` - Get featured communities
- `POST /api/communities` - Create community (protected)

### Users
- `POST /api/users/join-community/:id` - Join community (protected)
- `DELETE /api/users/leave-community/:id` - Leave community (protected)
- `POST /api/users/save-community/:id` - Save community (protected)
- `DELETE /api/users/unsave-community/:id` - Unsave community (protected)
- `GET /api/users/my-communities` - Get user's communities (protected)

## Notes

- Dark mode is the default theme
- Light mode has been fully styled and looks great
- All community data is stored in MongoDB
- User joined communities are tracked in the User schema
- The seed script includes 100+ communities from your provided list

