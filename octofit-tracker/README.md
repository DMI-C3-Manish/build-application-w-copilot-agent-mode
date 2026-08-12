# OctoFit Tracker

A modern multi-tier fitness tracking application built with React 19, Node.js/Express, TypeScript, and MongoDB.

## Project Structure

```
octofit-tracker/
├── frontend/          # React 19 + Vite application
│   ├── src/
│   ├── public/
│   ├── package.json
│   ├── vite.config.ts
│   └── tsconfig.json
└── backend/           # Node.js + Express + TypeScript server
    ├── src/
    │   └── index.ts
    ├── package.json
    ├── tsconfig.json
    └── .env
```

## Configuration

### Frontend
- **Port**: 5173
- **Framework**: React 19
- **Build Tool**: Vite
- **API URL**: http://localhost:8000/api

### Backend
- **Port**: 8000
- **Runtime**: Node.js
- **Framework**: Express
- **Language**: TypeScript
- **Database**: MongoDB (local or Atlas)

### Database
- **Type**: MongoDB
- **Port**: 27017
- **Connection String**: mongodb://localhost:27017/octofit-tracker

## Getting Started

### Prerequisites
- Node.js (v18+)
- npm or yarn
- MongoDB (running locally or via Docker)

### Installation

#### Frontend Setup
```bash
cd octofit-tracker/frontend
npm install
npm run dev
```

#### Backend Setup
```bash
cd octofit-tracker/backend
npm install
npm run dev
```

### Running the Application

**Terminal 1 - Backend:**
```bash
cd octofit-tracker/backend
npm run dev
# Server runs on http://localhost:8000
```

**Terminal 2 - Frontend:**
```bash
cd octofit-tracker/frontend
npm run dev
# App runs on http://localhost:5173
```

**Terminal 3 - MongoDB (if using Docker):**
```bash
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

## Available Scripts

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run linter

### Backend
- `npm run dev` - Start development server with auto-reload
- `npm run build` - Build TypeScript to JavaScript
- `npm start` - Start production server
- `npm test` - Run tests

## API Endpoints

- `GET /api/health` - Health check endpoint

## Technologies Used

### Frontend
- React 19
- Vite
- TypeScript
- Oxlint

### Backend
- Node.js
- Express
- TypeScript
- Mongoose (MongoDB ODM)
- CORS
- dotenv

## Development

The application uses TypeScript for type safety and includes:
- Hot module replacement (HMR) for frontend development
- Nodemon for automatic backend restart on file changes
- Strict TypeScript compiler settings
- Environment configuration via .env files
