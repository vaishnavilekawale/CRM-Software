# 📊 CRM Software

A simple Customer Relationship Management (CRM) system built with **Java Spring Boot** and **React.js**.

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![Status](https://img.shields.io/badge/status-Active-brightgreen)

---

## 🎯 Features

- 👥 Customer Management
- 🎯 Lead Tracking
- ✅ Task Management
- 💰 Sales Pipeline
- 🔐 Secure Login (JWT)
- 📱 Responsive Design

---

## 🛠️ Tech Stack

**Backend:** Java 17, Spring Boot 3.1.5, MySQL, JWT  
**Frontend:** React 18.2, Bootstrap 5.3, Axios

---

## 📋 Prerequisites

- Java JDK 17+
- Node.js 16+
- Maven 3.6+
- MySQL 8.0+

---

## 🚀 Quick Start

### 1. Clone Repository
```bash
git clone https://github.com/vaishnavilekawale/CRM-Software
cd CRM-Software
```

### 2. Setup Database
```bash
mysql -u root -p
CREATE DATABASE crm_database;
EXIT;
```

### 3. Backend Setup
```bash
cd backend
# Copy application.example.properties to application.properties
# Add your MySQL username and password
mvn clean install
mvn spring-boot:run
```
Backend: `http://localhost:8080`

### 4. Frontend Setup
```bash
cd ../frontend
npm install
npm start
```
Frontend: `http://localhost:3000`

---

## 📚 Documentation

- [API Documentation](docs/API_DOCUMENTATION.md)
- [Setup Guide](SETUP_GUIDE.md)
- [Security Guide](SECURITY.md)

---


## 👤 Author

**Vaishnavi Lekawale** - [GitHub](https://github.com/vaishnavilekawale)

---

<div align="center">

⭐ If helpful, please give it a star!

</div>
