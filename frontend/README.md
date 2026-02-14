## Frontend Setup Instructions

### Prerequisites
- Node.js 14.0 or higher
- npm 6.0 or higher
- Frontend should be started AFTER backend is running

### Step-by-Step Setup

#### 1. Install Dependencies

Navigate to frontend directory:

```bash
cd frontend

# Install all required packages
npm install
```

Wait for all dependencies to be installed. This may take a few minutes.

#### 2. Environment Configuration

Create a `.env` file in the frontend root directory:

```
REACT_APP_API_URL=http://localhost:8080/api
```

Or if backend is on different machine:
```
REACT_APP_API_URL=http://your-backend-url:8080/api
```

#### 3. Start Development Server

```bash
npm start
```

The application will:
- Automatically open in your default browser at `http://localhost:3000`
- Show compilation status in terminal
- Auto-reload on file changes (Hot Reload)

#### 4. First Login

Default test credentials:

**Admin**:
- Email: `admin@crm.com`
- Password: `admin123`

**Sales Rep**:
- Email: `sales@crm.com`
- Password: `sales123`

First, you need to register a new user:
1. Click "Register here" on login page
2. Fill in the form
3. Select role (Admin or Sales Rep)
4. Click Register
5. Login with your credentials

### Building for Production

```bash
npm run build
```

Creates an optimized production build in the `build/` folder.

### Available Scripts

```bash
# Start development server
npm start

# Run tests
npm test

# Build for production
npm run build

# Run linter (if configured)
npm run lint
```

### Troubleshooting

**Backend Connection Error**:
- Make sure backend is running on port 8080
- Check REACT_APP_API_URL in .env file
- Verify CORS is enabled in backend

**Blank Page or Runtime Error**:
- Check browser console (F12)
- Common issue: Backend URL mismatch
- Try clearing cache: `npm cache clean --force`

**npm Install Fails**:
```bash
# Clear npm cache
npm cache clean --force

# Reinstall
npm install
```

**Port 3000 Already in Use**:
```bash
# Use different port
PORT=3001 npm start
```

**Module Not Found Error**:
```bash
# Remove node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Project Structure

```
frontend/
├── src/
│   ├── components/           # Reusable components
│   │   ├── Navigation.js
│   │   └── ProtectedRoute.js
│   ├── pages/               # Page components
│   │   ├── Login.js
│   │   ├── Register.js
│   │   ├── Dashboard.js
│   │   ├── Customers.js
│   │   ├── Leads.js
│   │   ├── Tasks.js
│   │   └── Sales.js
│   ├── services/            # API services
│   │   ├── api.js          # Axios instance
│   │   └── apiService.js   # API methods
│   ├── context/            # React context
│   │   └── AuthContext.js
│   ├── styles/             # CSS files
│   │   ├── Auth.css
│   │   ├── Navigation.css
│   │   ├── Dashboard.css
│   │   └── CrudPages.css
│   ├── App.js              # Main component
│   └── index.js            # Entry point
├── public/                 # Static files
│   └── index.html
└── package.json
```

### Features

- ✅ User Authentication (Login/Register)
- ✅ JWT Token Management
- ✅ Protected Routes
- ✅ Customer Management (CRUD)
- ✅ Lead Management with Status Filter
- ✅ Task Management with Priority/Status
- ✅ Sales Pipeline Management
- ✅ Responsive Design
- ✅ Bootstrap UI Components
- ✅ Real-time API Integration

### Performance Tips

1. Use React DevTools browser extension
2. Minimize bundle size: `npm run build`
3. Use code splitting with React.lazy()
4. Enable production mode for frontend build

### Security Note

- Never commit .env file to git
- Change API URL for production
- Use HTTPS in production
- Validate all inputs

