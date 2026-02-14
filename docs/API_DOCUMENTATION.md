# CRM Software - Complete API Documentation

## Base URL
```
http://localhost:8080/api
```

## Authentication

All endpoints (except `/auth/register` and `/auth/login`) require Bearer token in Authorization header:

```
Authorization: Bearer {token}
```

## Response Format

All API responses follow this format:

```json
{
  "success": true,
  "message": "Success message",
  "data": { /* response data */ },
  "statusCode": 200
}
```

---

## Authentication Endpoints

### Register New User
```
POST /auth/register
```

**Request Body**:
```json
{
  "fullName": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "SALES_REP"
}
```

**Response**: User details with ID

---

### Login
```
POST /auth/login
```

**Request Body**:
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response**:
```json
{
  "token": "eyJhbGciOiJIUzUxMiJ9...",
  "userId": 1,
  "email": "john@example.com",
  "fullName": "John Doe",
  "role": "SALES_REP"
}
```

---

### Get Current User Profile
```
GET /auth/me
```

**Headers**: `Authorization: Bearer {token}`

**Response**: Current user details

---

### Get All Users (Admin Only)
```
GET /auth/users
```

**Headers**: `Authorization: Bearer {token}`

**Response**: List of all users

---

## Customer Endpoints

### Get All Customers
```
GET /customers?page=0&size=10
```

**Query Parameters**:
- `page` (int): Page number (default: 0)
- `size` (int): Records per page (default: 10)

**Response**: Paginated customer list

---

### Get Customer by ID
```
GET /customers/{id}
```

**Response**: Single customer object

---

### Create Customer
```
POST /customers
```

**Request Body**:
```json
{
  "name": "ABC Company",
  "email": "contact@abc.com",
  "phone": "+1-555-1234",
  "company": "ABC Inc",
  "address": "123 Main St, City",
  "notes": "Important customer",
  "assignedToId": 1
}
```

**Response**: Created customer with ID

---

### Update Customer
```
PUT /customers/{id}
```

**Request Body**: Same as Create (any fields can be partial)

**Response**: Updated customer object

---

### Delete Customer
```
DELETE /customers/{id}
```

**Response**: Success message

---

### Search Customers
```
GET /customers/search?name=ABC&page=0&size=10
```

**Query Parameters**:
- `name`: Customer name to search
- `page`, `size`: Pagination parameters

**Response**: Filtered customer list

---

## Lead Endpoints

### Get All Leads
```
GET /leads?page=0&size=10
```

**Response**: Paginated lead list

---

### Get Lead by ID
```
GET /leads/{id}
```

**Response**: Single lead object

---

### Create Lead
```
POST /leads
```

**Request Body**:
```json
{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "phone": "+1-555-5678",
  "company": "Tech Startup",
  "source": "WEB",
  "status": "NEW",
  "notes": "Good potential",
  "assignedToId": 1
}
```

**Lead Sources**: WEB, REFERRAL, ADS, COLD_CALL, EMAIL, WEBSITE

**Lead Status**: NEW, CONTACTED, CONVERTED, LOST, QUALIFIED

---

### Update Lead
```
PUT /leads/{id}
```

**Request Body**: Same as Create

**Response**: Updated lead object

---

### Delete Lead
```
DELETE /leads/{id}
```

---

### Filter Leads by Status
```
GET /leads/status/{status}?page=0&size=10
```

**Path Parameters**:
- `status`: NEW, CONTACTED, CONVERTED, LOST, QUALIFIED

---

### Filter Leads by Source
```
GET /leads/source/{source}?page=0&size=10
```

**Path Parameters**:
- `source`: WEB, REFERRAL, ADS, COLD_CALL, EMAIL, WEBSITE

---

## Task Endpoints

### Get All Tasks
```
GET /tasks?page=0&size=10
```

---

### Get Task by ID
```
GET /tasks/{id}
```

---

### Create Task
```
POST /tasks
```

**Request Body**:
```json
{
  "title": "Call customer",
  "description": "Follow up on previous meeting",
  "dueDate": "2024-12-31",
  "priority": "HIGH",
  "status": "OPEN",
  "assignedToId": 1,
  "createdById": 1
}
```

**Priority**: LOW, MEDIUM, HIGH, CRITICAL

**Status**: OPEN, IN_PROGRESS, COMPLETED, CANCELLED

---

### Update Task
```
PUT /tasks/{id}
```

---

### Mark Task as Complete
```
PUT /tasks/{id}
```

**Request Body**:
```json
{
  "status": "COMPLETED"
}
```

---

### Delete Task
```
DELETE /tasks/{id}
```

---

### Get Tasks by Status
```
GET /tasks/status/{status}?page=0&size=10
```

---

### Get Tasks by Priority
```
GET /tasks/priority/{priority}?page=0&size=10
```

---

### Get User's Tasks
```
GET /tasks/user/{userId}?page=0&size=10
```

---

## Sale Endpoints

### Get All Sales
```
GET /sales?page=0&size=10
```

---

### Get Sale by ID
```
GET /sales/{id}
```

---

### Create Sale
```
POST /sales
```

**Request Body**:
```json
{
  "customerId": 1,
  "amount": 5000.00,
  "status": "PROPOSAL",
  "saleDate": "2024-01-15",
  "productName": "Product X",
  "description": "Enterprise license",
  "assignedToId": 1
}
```

**Status**: PROPOSAL, NEGOTIATION, CLOSED_WON, CLOSED_LOST

---

### Update Sale
```
PUT /sales/{id}
```

---

### Delete Sale
```
DELETE /sales/{id}
```

---

### Get Sales by Status
```
GET /sales/status/{status}?page=0&size=10
```

---

### Get User's Sales
```
GET /sales/user/{userId}?page=0&size=10
```

---

### Get Customer's Sales
```
GET /sales/customer/{customerId}?page=0&size=10
```

---

## Error Responses

### Bad Request (400)
```json
{
  "success": false,
  "message": "Error description",
  "statusCode": 400
}
```

### Unauthorized (401)
```json
{
  "success": false,
  "message": "User not authenticated",
  "statusCode": 401
}
```

### Not Found (404)
```json
{
  "success": false,
  "message": "Resource not found",
  "statusCode": 404
}
```

---

## Postman Collection

Import this collection into Postman for easy API testing:

```json
{
  "info": {
    "name": "CRM API",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Register User",
      "request": {
        "method": "POST",
        "url": "{{base_url}}/auth/register"
      }
    }
  ]
}
```

---

## Rate Limiting

Currently no rate limiting. Implement with Spring in production.

## Pagination

All list endpoints support pagination:
- `page`: 0-indexed page number
- `size`: Records per page (max 100)

---

**Last Updated**: February 2026
