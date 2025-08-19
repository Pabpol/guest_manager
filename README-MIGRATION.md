# Guest Manager - Migrated to React + NestJS

This project has been migrated from Express.js with EJS templates to a modern React frontend with NestJS backend.

## Architecture

### Backend (NestJS)
- **Location**: `./backend`
- **Port**: 3001
- **API Prefix**: `/api`
- **Database**: MySQL with Sequelize
- **Features**:
  - Guest management API
  - Email notifications
  - Excel export functionality
  - CORS enabled for frontend communication

### Frontend (React + TypeScript)
- **Location**: `./frontend`
- **Port**: 3000
- **Features**:
  - Wedding guest registration form
  - Confirmation pages
  - Admin dashboard with statistics
  - Excel download functionality
  - Responsive design

## Getting Started

### Prerequisites
- Node.js (v14+)
- MySQL database
- Gmail account for email functionality

### Environment Setup

1. Configure database in `backend/.env`:
```
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=admin
DB_DATABASE=guest_manager
EMAIL_PASS=your_gmail_app_password
```

2. Ensure your MySQL database exists with the `guests` table

### Installation & Running

#### Option 1: Run both servers simultaneously
```bash
# Install dependencies for both projects
cd backend && npm install
cd ../frontend && npm install
cd ..

# Install root level dependencies
npm install

# Run both backend and frontend in development mode
npm run dev
```

#### Option 2: Run individually
```bash
# Backend (Terminal 1)
cd backend
npm install
npm run start:dev

# Frontend (Terminal 2)  
cd frontend
npm install
npm start
```

### Production Build

```bash
# Build both projects
npm run build

# Start production backend (serves React build)
npm start
```

## API Endpoints

- `POST /api/form` - Submit guest registration
- `GET /api/invitados` - Get dashboard statistics  
- `GET /api/download-list` - Download guest list Excel
- `GET /api/confirmado` - Confirmation page data
- `GET /api/ya-confirmado` - Already confirmed page data
- `GET /api/error` - Error page data

## Migration Details

### What was migrated:
- ✅ Guest registration form with validation
- ✅ Email confirmation system
- ✅ Dashboard with guest statistics
- ✅ Excel export functionality
- ✅ All original routes and functionality
- ✅ Original styling and design
- ✅ Database schema (unchanged)

### Key improvements:
- Modern React frontend with TypeScript
- RESTful API with NestJS
- Better separation of concerns
- Type safety throughout
- Component-based architecture
- Hot reload for development

## Database Schema (Unchanged)

The original `guests` table structure is preserved:
```sql
- nombre (STRING)
- apellido (STRING) 
- menu (STRING)
- tieneAcompanante (BOOLEAN)
- nombreAcompnanante (STRING)
- apellidoAcompanante (STRING)
- menuAcompanante (STRING)
- mail (STRING, UNIQUE, NOT NULL)
```

## Original Files

The original Express.js application files are still present in the root directory for reference:
- `app.js` - Original Express app
- `routes/` - Original route handlers  
- `views/` - Original EJS templates
- `service/` - Original business logic
- `models/` - Original Sequelize models

## Troubleshooting

1. **CORS Issues**: Ensure backend CORS is configured for your frontend URL
2. **Database Connection**: Verify database credentials in `.env`
3. **Email Issues**: Use Gmail app password, not regular password
4. **Port Conflicts**: Backend runs on 3001, frontend on 3000