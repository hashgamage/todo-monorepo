# Global360 TODO App

A simple todo application built with Angular frontend and .NET backend.

## What's Inside

- **Backend**: .NET 9 Web API with Swagger documentation
- **Frontend**: Angular 20 with a clean, responsive UI
- **Storage**: In-memory data store (perfect for development)

## Getting Started

### Prerequisites

- .NET 9 SDK
- Node.js (for Angular)
- Your favorite code editor

### Running the App

1. **Start the backend:**
   ```bash
   cd backend/TodoApi
   dotnet run
   ```
   The API will be available at `https://localhost:5242`

2. **Start the frontend:**
   ```bash
   cd frontend
   npm install
   npm start
   ```
   The app will open at `http://localhost:4200`

### API Documentation

Once the backend is running, check out the Swagger UI at:
`https://localhost:5242/swagger`

## Features

- ✅ Add new todos
- ✅ Mark todos as complete/incomplete
- ✅ Delete todos
- ✅ Clean, modern UI
- ✅ Real-time updates

## Testing

Run backend tests:
```bash
cd backend/TodoApi.Tests
dotnet test
```

Run frontend tests:
```bash
cd frontend
npm test
```

## Project Structure

```
├── backend/
│   ├── TodoApi/          # Main API project
│   └── TodoApi.Tests/    # Unit tests
├── frontend/
│   └── src/app/          # Angular components and services
└── README.md
```

