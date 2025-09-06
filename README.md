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
ng test --code-coverage
```
frontend test coverage result:
<img width="1193" height="366" alt="Screenshot 2025-09-07 at 9 27 38 AM" src="https://github.com/user-attachments/assets/868f8940-7801-41a4-b3f9-b3e196b61a93" />

<img width="1129" height="413" alt="image" src="https://github.com/user-attachments/assets/00e7fac6-4de2-442f-a6d5-d908f6f451a0" />


## Project Structure

```
├── backend/
│   ├── TodoApi/          # Main API project
│   └── TodoApi.Tests/    # Unit tests
├── frontend/
│   └── src/app/          # Angular components and services
└── README.md
```

