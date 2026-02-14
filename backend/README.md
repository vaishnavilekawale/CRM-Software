## Backend Setup Instructions

### Prerequisites
- Java Development Kit (JDK) 17 or higher
- MySQL Server 8.0+
- Maven 3.6+
- Git (optional)

### Step-by-Step Setup

#### 1. Database Setup

Open MySQL command line or MySQL Workbench:

```sql
-- Create database
CREATE DATABASE crm_database;

-- Use the database
USE crm_database;

-- Tables will be auto-created by Hibernate on first run
```

#### 2. Update Configuration

Edit `backend/src/main/resources/application.properties`:

```properties
# Database Connection
spring.datasource.url=jdbc:mysql://localhost:3306/crm_database
spring.datasource.username=root
spring.datasource.password=root

# JWT Secret (Change this in production!)
jwt.secret.key=super_secret_key_for_jwt_production

# Server Port
server.port=8080
```

#### 3. Build and Run

Navigate to backend directory:

```bash
cd backend

# Clean and build
mvn clean install

# Run the application
mvn spring-boot:run
```

The server will start and automatically create all tables.

#### 4. Verify Server

- Backend running: `http://localhost:8080`
- Swagger UI: `http://localhost:8080/api/swagger-ui.html`
- API Docs: `http://localhost:8080/api/v3/api-docs`

### API Testing

#### Using Swagger UI
1. Navigate to `http://localhost:8080/api/swagger-ui.html`
2. Register a new user using `POST /auth/register`
3. Login using `POST /auth/login`
4. Use the token in Authorization header for other endpoints

#### Using cURL

Register:
```bash
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "role": "SALES_REP"
  }'
```

Login:
```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Environment Variables

For production, use environment variables instead of hardcoded values:

```bash
export DB_URL=jdbc:mysql://localhost:3306/crm_database
export DB_USER=root
export DB_PASSWORD=root
export JWT_SECRET=your_production_secret_key
export JWT_EXPIRATION=86400000
```

### Troubleshooting

**Maven Build Fails**:
```bash
# Clear Maven cache
mvn clean

# Rebuild
mvn install
```

**MySQL Connection Error**:
- Make sure MySQL service is running
- Verify credentials are correct
- Check if port 3306 is open

**Port 8080 Already in Use**:
```bash
# Change port in application.properties
server.port=8081
```

**Swagger UI Not Loading**:
- Make sure you access: `http://localhost:8080/api/swagger-ui.html`
- Not: `http://localhost:8080/swagger-ui.html`

