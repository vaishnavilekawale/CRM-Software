# Environment Configuration Guide

## Backend Configuration

Create `backend/src/main/resources/application.properties`:

### Development Environment

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
jwt.secret.key=dev_secret_key_change_in_production
jwt.expiration=86400000

# Logging
logging.level.root=INFO
logging.level.com.crm=DEBUG

# Swagger Configuration
springdoc.api-docs.path=/api-docs
springdoc.swagger-ui.path=/swagger-ui.html
springdoc.swagger-ui.enabled=true
```

### Production Environment

```properties
# Server Configuration
server.port=8080
server.servlet.context-path=/api
spring.application.name=CRM Application

# MySQL Database Configuration
spring.datasource.url=jdbc:mysql://db-server:3306/crm_database
spring.datasource.username=${DB_USERNAME}
spring.datasource.password=${DB_PASSWORD}
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

# Connection Pool
spring.datasource.hikari.maximum-pool-size=10
spring.datasource.hikari.minimum-idle=5

# JPA/Hibernate Configuration
spring.jpa.database-platform=org.hibernate.dialect.MySQL8Dialect
spring.jpa.hibernate.ddl-auto=validate
spring.jpa.show-sql=false
spring.jpa.properties.hibernate.format_sql=false

# JWT Configuration
jwt.secret.key=${JWT_SECRET_KEY}
jwt.expiration=86400000

# Logging
logging.level.root=WARN
logging.level.com.crm=INFO

# Swagger Configuration
springdoc.swagger-ui.enabled=false
```

## Frontend Configuration

Create `frontend/.env` for development:

```
REACT_APP_API_URL=http://localhost:8080/api
```

Create `frontend/.env.production` for production:

```
REACT_APP_API_URL=https://api.crm-system.com/api
```

## Environment Variables (Optional)

### Backend Environment Variables

```bash
# Database
export DB_URL=jdbc:mysql://localhost:3306/crm_database
export DB_USERNAME=root
export DB_PASSWORD=root

# JWT
export JWT_SECRET_KEY=your_production_secret_key_here
export JWT_EXPIRATION=86400000

# Server
export SERVER_PORT=8080
```

### Frontend Environment Variables

```bash
# API Configuration
export REACT_APP_API_URL=http://localhost:8080/api
export REACT_APP_ENV=development
```

## Docker Configuration

### Backend Dockerfile

```dockerfile
FROM openjdk:17-jdk-slim

WORKDIR /app

COPY target/crm-backend-1.0.0.jar app.jar

ENV DB_URL=jdbc:mysql://mysql:3306/crm_database
ENV DB_USERNAME=root
ENV DB_PASSWORD=root
ENV JWT_SECRET_KEY=change_me_in_production

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
```

### Docker Compose

```yaml
version: '3.8'

services:
  mysql:
    image: mysql:8.0
    environment:
      MYSQL_ROOT_PASSWORD: root
      MYSQL_DATABASE: crm_database
    ports:
      - "3306:3306"
    volumes:
      - mysql_data:/var/lib/mysql

  backend:
    build: ./backend
    depends_on:
      - mysql
    environment:
      DB_URL: jdbc:mysql://mysql:3306/crm_database
      DB_USERNAME: root
      DB_PASSWORD: root
      JWT_SECRET_KEY: production_secret_key
    ports:
      - "8080:8080"

  frontend:
    build: ./frontend
    environment:
      REACT_APP_API_URL: http://localhost:8080/api
    ports:
      - "3000:3000"

volumes:
  mysql_data:
```

## Configuration Checklist

### Local Development
- [ ] MySQL running locally
- [ ] Database `crm_database` created
- [ ] Backend configured with localhost database
- [ ] Frontend .env file created with http://localhost:8080/api
- [ ] Both services started and accessible

### Production Deployment
- [ ] Change JWT secret key
- [ ] Use strong database password
- [ ] Enable HTTPS for frontend
- [ ] Configure proper CORS origins
- [ ] Set up database backups
- [ ] Enable logging/monitoring
- [ ] Use environment variables for sensitive data
- [ ] Set appropriate logging levels

## Secrets Management

Never commit sensitive data. Use environment variables or .env.local:

```bash
# .env.local (local development - not in git)
REACT_APP_API_URL=http://localhost:8080/api
JWT_SECRET=my_super_secret_key
```

For production, use:
- Environment variables
- AWS Secrets Manager
- Azure Key Vault
- Docker secrets
- Vault or similar solutions

