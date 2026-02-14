## Quick Start Guide

### Prerequisites Checklist
- [ ] Java 17+ installed
- [ ] MySQL Server installed and running
- [ ] Node.js 14+ and npm installed
- [ ] Maven installed

### Backend Quick Start (5-10 minutes)

1. **Create Database**:
   ```sql
   CREATE DATABASE crm_database;
   ```

2. **Configure Database** (`backend/src/main/resources/application.properties`):
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/crm_database
   spring.datasource.username=root
   spring.datasource.password=root
   ```

3. **Run Backend**:
   ```bash
   cd backend
   mvn clean install
   mvn spring-boot:run
   ```
   ✅ Server running at: `http://localhost:8080/api`

### Frontend Quick Start (5 minutes)

1. **Install Dependencies**:
   ```bash
   cd frontend
   npm install
   ```

2. **Create .env File**:
   ```
   REACT_APP_API_URL=http://localhost:8080/api
   ```

3. **Start Frontend**:
   ```bash
   npm start
   ```
   ✅ App running at: `http://localhost:3000`

### First Steps

1. **Access the App**: Open `http://localhost:3000`
2. **Register**: Create a new user account
3. **Login**: Use your credentials
4. **Explore**: Start managing customers, leads, tasks, and sales!

### Example User Registration

- Full Name: John Doe
- Email: john@example.com
- Password: password123
- Role: Sales Representative

### Useful Links

- Frontend: `http://localhost:3000`
- Backend API: `http://localhost:8080/api`
- Swagger Docs: `http://localhost:8080/api/swagger-ui.html`
- API Docs: `http://localhost:8080/api/v3/api-docs`

### Common Commands

```bash
# Backend
cd backend
mvn clean install          # Build
mvn spring-boot:run        # Run

# Frontend
cd frontend
npm install               # Install dependencies
npm start                # Run dev server
npm run build            # Build for production
npm test                # Run tests
```

### Next Steps

- [ ] Explore Dashboard
- [ ] Create test Customers
- [ ] Create test Leads
- [ ] Create test Tasks
- [ ] Track Sales
- [ ] Review API Documentation
- [ ] Check Security Settings

### Troubleshooting Quick Fix

**Port Issue**: Edit `application.properties` or `.env`
**DB Connection**: Check MySQL is running and credentials are correct
**CORS Error**: Verify backend is running and API URL is correct
**Token Error**: Login again to refresh token

---

**Need help?** Check the full README.md files in backend/ and frontend/ directories.
