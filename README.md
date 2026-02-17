# 📊 CRM Software

A simple Customer Relationship Management (CRM) system built with **Java Spring Boot** and **React.js**. Manage customers, leads, tasks, and sales pipelines easily.


---

## 🎯 Features

- 👥 **Customer Management** - Add, edit, delete customers
- 🎯 **Lead Tracking** - Track sales leads and their status
- ✅ **Task Management** - Create and manage tasks
- 💰 **Sales Pipeline** - Monitor sales deals
- 🔐 **Secure Login** - User authentication with JWT
- 📱 **Responsive Design** - Works on all devices

---

## 🛠️ Tech Stack

**Backend:** Java 17, Spring Boot 3.1.5, MySQL, JWT
**Frontend:** React 18.2, Bootstrap 5.3, Axios

---

## � Quick Start

### 1. Clone Repository
```bash
git clone https://github.com/vaishnavilekawale/CRM-Software
cd CRM-Software
```


### 3. Backend Setup
```bash
cd backend

# Create application.properties with your credentials
# Copy from application.example.properties and add your MySQL username/password

mvn clean install
mvn spring-boot:run
```



### 4. Frontend Setup
```bash
cd ../frontend

npm install
npm start

---

## 📚 Documentation

- [API Documentation](docs/API_DOCUMENTATION.md) - Full API reference
- [Setup Guide](SETUP_GUIDE.md) - Detailed setup instructions
- [Project Summary](PROJECT_SUMMARY.md) - Project overview
- [Quick Start](QUICKSTART.md) - Quick start guide
- [Security Guide](SECURITY.md) - Security best practices


---

## 👤 Author

**Vaishnavi Lekawale** - [GitHub](https://github.com/vaishnavilekawale)

---

<div align="center">

⭐ If helpful, please give it a star!

</div>

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

### Available Endpoints

| Module | Count | Description |
|--------|-------|-------------|
| **Authentication** | 4 | Register, Login, Logout, Refresh |
| **Customers** | 6 | CRUD operations on customers |
| **Leads** | 7 | Lead management and tracking |
| **Tasks** | 7 | Task creation and management |
| **Sales** | 7 | Sales deals and pipeline |
| **Total** | **31+** | Complete REST API |

---

## 🚀 Getting Started

### Start Development Servers

Open two terminal windows:

**Terminal 1 - Backend:**
```bash
cd backend
mvn spring-boot:run
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
```

---

## 🛠️ Development Guide

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
mvn clean package
# JAR file will be in target/ directory
```

#### Frontend
```bash
cd frontend
npm run build
```

#### Database Connection Error
- Verify MySQL is running
- Check database credentials in `application.properties`
- Ensure database `crm_database` exists

### Frontend Issues

#### Port 3000 Already in Use
```bash
PORT=3001 npm start
```

#### API Connection Errors
- Verify backend is running on port 8080
- Check `.env` file has correct `REACT_APP_API_URL`
- Clear browser cache and restart

#### Module Not Found
```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
```

---

<div align="center">


</div>

