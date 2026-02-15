# 📊 CRM Software - Customer Relationship Management System

A comprehensive full-stack Customer Relationship Management (CRM) system built with **Java Spring Boot** backend and **React.js** frontend. This enterprise-grade application provides complete customer, lead, task, and sales pipeline management with role-based access control and JWT authentication.

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![Status](https://img.shields.io/badge/status-Active-brightgreen)

---

## 🎯 Key Features

### 🔐 Authentication & Authorization
- User registration and login with JWT tokens
- Role-based access control (Admin, Sales Rep)
- Secure password encryption with BCrypt
- Token-based authentication for all API endpoints

### 📊 Dashboard & Analytics
- Real-time statistics and metrics
- Interactive charts and visualizations
- Sales pipeline overview
- Team performance tracking

### 👥 Customer Management
- Complete CRUD operations for customers
- Customer contact information and history
- Customer segmentation and filtering
- Advanced search capabilities

### 🎯 Lead Management
- Sales lead tracking with status management
- Lead scoring and qualification
- Customizable lead filters
- Pipeline stage tracking

### ✅ Task Management
- Task creation and assignment
- Priority levels and due dates
- Task status tracking
- Team collaboration features

### 💰 Sales Pipeline
- Sales deals and opportunities tracking
- Deal stage management
- Revenue forecasting
- Sales performance metrics

### 📱 User Experience
- Responsive design for all devices
- Modern Bootstrap UI with custom styling
- Real-time API integration
- Modal forms for quick CRUD operations
- Intuitive navigation with role-based access

---

## 🛠️ Technology Stack

### Backend
| Technology | Version | Purpose |
|-----------|---------|---------|
| **Java** | 17 | Programming Language |
| **Spring Boot** | 3.1.5 | Framework |
| **Spring Security** | Latest | Authentication & Authorization |
| **Spring Data JPA** | Latest | Database ORM |
| **MySQL** | 8.0 | Database |
| **JWT (jjwt)** | Latest | Token Management |
| **Maven** | 3.6+ | Build Tool |
| **Swagger 3.0** | Latest | API Documentation |

### Frontend
| Technology | Version | Purpose |
|-----------|---------|---------|
| **React** | 18.2 | UI Framework |
| **React Router** | 6 | Routing & Navigation |
| **Axios** | 1.5 | HTTP Client |
| **Bootstrap** | 5.3 | UI Components |
| **React Bootstrap** | 2.9 | Bootstrap Components for React |
| **React Icons** | 4.12 | Icon Library |
| **Chart.js** | 4.4 | Charts & Graphs |
| **date-fns** | 2.30 | Date Utilities |

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Java JDK 17+** - Download from [Oracle JDK](https://www.oracle.com/java/technologies/downloads/)
- **Node.js 16+** - Download from [nodejs.org](https://nodejs.org/)
- **npm 8+** - Comes with Node.js
- **Maven 3.6+** - Download from [maven.apache.org](https://maven.apache.org/)
- **MySQL 8.0+** - Download from [mysql.com](https://www.mysql.com/)
- **Git** - Download from [git-scm.com](https://git-scm.com/)

### Verify Installation
```bash
# Check Java version
java -version

# Check Node version
node --version

# Check npm version
npm --version

# Check Maven version
mvn --version

# Check Git version
git --version
```

---

## 📦 Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/vaishnavilekawale/CRM-Software
cd CRM-Software
```

### 2. Database Setup

#### Create MySQL Database
```bash
# Connect to MySQL
mysql -u root -p

# Create database and user
CREATE DATABASE crm_database;
CREATE USER 'crm_user'@'localhost' IDENTIFIED BY 'crm_password';
GRANT ALL PRIVILEGES ON crm_database.* TO 'crm_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

#### Using SQL Script (if provided)
```bash
mysql -u root -p crm_database < database/crm_setup.sql
```

### 3. Backend Setup

#### Navigate to Backend Directory
```bash
cd backend
```

#### Configure Application Properties
Create `src/main/resources/application.properties`:

```properties
# Server Configuration
server.port=8080
server.servlet.context-path=/api
spring.application.name=CRM Application

# MySQL Database Configuration
spring.datasource.url=jdbc:mysql://localhost:3306/crm_database
spring.datasource.username=root
spring.datasource.password=root
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

# JPA/Hibernate Configuration
spring.jpa.database-platform=org.hibernate.dialect.MySQL8Dialect
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=false
spring.jpa.properties.hibernate.format_sql=true

# JWT Configuration
jwt.secret.key=your_secret_key_here_change_in_production
jwt.expiration=86400000

# Logging
logging.level.root=INFO
logging.level.com.crm=DEBUG

# Swagger Configuration
springdoc.api-docs.path=/api-docs
springdoc.swagger-ui.path=/swagger-ui.html
springdoc.swagger-ui.enabled=true
```

#### Build and Run Backend
```bash
# Build with Maven
mvn clean install

# Run the application
mvn spring-boot:run

# Or run the JAR file
java -jar target/crm-backend-1.0.0.jar
```

Backend will be available at: `http://localhost:8080`

### 4. Frontend Setup

#### Navigate to Frontend Directory
```bash
cd ../frontend
```

#### Install Dependencies
```bash
npm install
```

#### Configure Environment Variables
Create `.env` file in frontend directory:

```
REACT_APP_API_URL=http://localhost:8080/api
```

#### Run Development Server
```bash
npm start
```

Frontend will be available at: `http://localhost:3000`

#### Build for Production
```bash
npm run build
```

---

## 📂 Project Structure

```
CRM-Software/
│
├── backend/
│   ├── src/
│   │   └── main/
│   │       ├── java/com/crm/
│   │       │   ├── application/          # Main Spring Boot Application
│   │       │   ├── controller/           # REST API Controllers (5)
│   │       │   ├── service/              # Business Logic (5 Services)
│   │       │   ├── repository/           # Data Access Layer (JPA Repositories)
│   │       │   ├── model/                # Entity Classes (5 Models)
│   │       │   ├── dto/                  # Data Transfer Objects (8 DTOs)
│   │       │   ├── security/             # JWT & Security Config
│   │       │   ├── exception/            # Custom Exceptions
│   │       │   └── util/                 # Utility Classes
│   │       └── resources/
│   │           └── application.properties # Configuration File
│   ├── pom.xml                           # Maven Configuration
│   └── README.md                         # Backend README
│
├── frontend/
│   ├── public/
│   │   └── index.html                    # HTML Template
│   ├── src/
│   │   ├── components/                   # Reusable Components
│   │   ├── pages/                        # Page Components (6 Pages)
│   │   │   ├── LoginPage
│   │   │   ├── DashboardPage
│   │   │   ├── CustomersPage
│   │   │   ├── LeadsPage
│   │   │   ├── TasksPage
│   │   │   └── SalesPage
│   │   ├── context/                      # React Context (Auth Context)
│   │   ├── services/                     # API Service Layer
│   │   ├── styles/                       # CSS Files
│   │   ├── App.js                        # Main App Component
│   │   ├── index.js                      # Entry Point
│   │   └── .env                          # Environment Variables
│   ├── package.json                      # Dependencies
│   └── README.md                         # Frontend README
│
├── docs/
│   └── API_DOCUMENTATION.md              # Complete API Reference
│
├── README.md                             # This File
├── SETUP_GUIDE.md                        # Setup Instructions
├── PROJECT_SUMMARY.md                    # Project Overview
└── QUICKSTART.md                         # Quick Start Guide
```

---

## 🚀 Quick Start

### Start Everything at Once

#### Option 1: Terminal Tabs
Open two terminal windows:

**Terminal 1 - Backend:**
```bash
cd backend
mvn spring-boot:run
# Runs on http://localhost:8080
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
# Runs on http://localhost:3000
```

#### Option 2: Using npm concurrently (if configured)
```bash
npm run dev
```

### Default Test Credentials
```
Email: admin@crm.com
Password: admin123
```

---

## 📡 API Documentation

### Base URL
```
http://localhost:8080/api
```

### API Documentation UI
Access the interactive Swagger UI at:
```
http://localhost:8080/swagger-ui.html
```

### Available Endpoints

| Module | Count | Description |
|--------|-------|-------------|
| **Authentication** | 4 | Register, Login, Logout, Refresh |
| **Customers** | 6 | CRUD operations on customers |
| **Leads** | 7 | Lead management and tracking |
| **Tasks** | 7 | Task creation and management |
| **Sales** | 7 | Sales deals and pipeline |
| **Total** | **31+** | Complete REST API |

### Example API Calls

#### Login
```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123"
  }'
```

#### Get All Customers
```bash
curl -X GET http://localhost:8080/api/customers \
  -H "Authorization: Bearer {token}"
```

#### Create New Lead
```bash
curl -X POST http://localhost:8080/api/leads \
  -H "Authorization: Bearer {token}" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "1234567890",
    "status": "NEW"
  }'
```

For complete API documentation, see [API_DOCUMENTATION.md](docs/API_DOCUMENTATION.md)

---

## 🗄️ Database Schema

### Core Tables

#### Users Table
```sql
- id (Primary Key)
- full_name
- email (Unique)
- password (Encrypted)
- role (ADMIN, SALES_REP)
- created_at
- updated_at
```

#### Customers Table
```sql
- id (Primary Key)
- name
- email
- phone
- company
- user_id (Foreign Key)
- created_at
- updated_at
```

#### Leads Table
```sql
- id (Primary Key)
- name
- email
- phone
- status (NEW, QUALIFIED, PROPOSAL, NEGOTIATION, CLOSED)
- source
- user_id (Foreign Key)
- created_at
- updated_at
```

#### Tasks Table
```sql
- id (Primary Key)
- title
- description
- status (PENDING, IN_PROGRESS, COMPLETED)
- priority (LOW, MEDIUM, HIGH)
- assigned_to (Foreign Key)
- due_date
- created_at
- updated_at
```

#### Sales Table
```sql
- id (Primary Key)
- title
- amount
- status (PIPELINE, PROPOSAL, NEGOTIATION, CLOSED_WON, CLOSED_LOST)
- customer_id (Foreign Key)
- user_id (Foreign Key)
- expected_close_date
- created_at
- updated_at
```

---

## 🔐 Security Features

- ✅ JWT Token-based Authentication
- ✅ Spring Security Configuration
- ✅ BCrypt Password Encryption
- ✅ Role-based Access Control (RBAC)
- ✅ Protected Routes & Endpoints
- ✅ CORS Configuration
- ✅ Input Validation
- ✅ Error Handling & Logging

---

## 🛠️ Development Guide

### Code Style & Standards
- Follow Google Java Style Guide for backend
- Follow Airbnb JavaScript Style Guide for frontend
- Use meaningful variable and function names
- Add comments for complex logic
- Write unit tests for critical functions

### Running Tests

#### Backend Tests
```bash
cd backend
mvn test
```

#### Frontend Tests
```bash
cd frontend
npm test
```

### Building for Production

#### Backend
```bash
cd backend
mvn clean package -DskipTests
# JAR file will be in target/ directory
```

#### Frontend
```bash
cd frontend
npm run build
# Build directory contains optimized production files
```

---

## 🐛 Troubleshooting

### Backend Issues

#### Port 8080 Already in Use
```bash
# Find and kill process using port 8080
# Windows
netstat -ano | findstr :8080
taskkill /PID <PID> /F

# Linux/Mac
lsof -i :8080
kill -9 <PID>
```

#### Database Connection Error
- Verify MySQL is running
- Check database credentials in `application.properties`
- Ensure database `crm_database` exists
- Verify MySQL user has proper permissions

#### JWT Token Errors
- Clear browser localStorage: `localStorage.clear()`
- Ensure `jwt.secret.key` is set in `application.properties`
- Check token expiration time

### Frontend Issues

#### Port 3000 Already in Use
```bash
# Set different port
PORT=3001 npm start
```

#### API Connection Errors
- Verify backend is running on `http://localhost:8080`
- Check `.env` file has correct `REACT_APP_API_URL`
- Clear browser cache and restart
- Check browser console for detailed errors

#### Module Not Found
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

---

## 📚 Additional Resources

- [Spring Boot Documentation](https://spring.io/projects/spring-boot)
- [React Documentation](https://react.dev)
- [MySQL Documentation](https://dev.mysql.com/doc/)
- [JWT Introduction](https://jwt.io/introduction)
- [RESTful API Best Practices](https://restfulapi.net/)

---

<!-- ## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/AmazingFeature`)
3. **Commit** your changes (`git commit -m 'Add AmazingFeature'`)
4. **Push** to the branch (`git push origin feature/AmazingFeature`)
5. **Open** a Pull Request -->

<!-- ### Contribution Guidelines
- Follow the existing code style
- Add tests for new features
- Update documentation when needed
- Write clear commit messages
- Ensure your code doesn't break existing functionality -->

---

## 📝 Changelog

### Version 1.0.0 (Initial Release)
- ✅ Complete authentication system with JWT
- ✅ Customer management module
- ✅ Lead management with status tracking
- ✅ Task management with priorities
- ✅ Sales pipeline tracking
- ✅ Dashboard with statistics
- ✅ Role-based access control
- ✅ API documentation with Swagger
- ✅ Responsive React UI with Bootstrap
- ✅ Database design with 5 core tables
- ✅ 30+ REST API endpoints

---

<!-- ## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

--- -->

## 👨‍💼 Author & Support

**Developed by:** Vaishnavi Lekawale
**Email:** lekawalevaishnavi.@gmail.com
**GitHub:** [@vaishnavilekawale](https://github.com/vaishnavilekawale)

### Support
<!-- For support, email support@crmsoftware.com or open an issue on GitHub. -->

---

## 🙏 Acknowledgments

- Spring Boot team for the excellent framework
- React community for continuous updates
- Bootstrap team for amazing UI components
- JWT community for secure authentication
- All contributors and users

---

<!-- ## 📈 Roadmap

### Upcoming Features
- [ ] Email notifications integration
- [ ] SMS alerts for important tasks
- [ ] Advanced reporting and analytics
- [ ] Mobile app (React Native)
- [ ] Document management system
- [ ] Video call integration
- [ ] Calendar integration
- [ ] Multi-language support (i18n)
- [ ] Two-factor authentication (2FA)
- [ ] Activity logging and audit trail -->

---

## 🔗 Quick Links

| Resource | Link |
|----------|------|
| **API Docs** | [API_DOCUMENTATION.md](docs/API_DOCUMENTATION.md) |
| **Setup Guide** | [SETUP_GUIDE.md](SETUP_GUIDE.md) |
| **Quick Start** | [QUICKSTART.md](QUICKSTART.md) |
| **Project Summary** | [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md) |
| **Swagger UI** | http://localhost:8080/swagger-ui.html |

---

<div align="center">

### ⭐ If you find this project helpful, please give it a star!

<!-- Made with ❤️ by CRM Development Team -->

</div>
