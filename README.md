# Multi-Vendor Event & Venue Booking Platform

A full-stack web application that enables users to discover, book, and manage events and venues through a unified platform. The system supports multiple vendors, secure booking management, PayPal payment integration, and role-based access for Users, Vendors, and Administrators.

---

# Project Overview

The Multi-Vendor Event & Venue Booking Platform simplifies the process of discovering, booking, and managing events and venues. Users can browse available events and venues, make secure bookings, and complete payments through PayPal Sandbox. Vendors can manage their events and venues, while administrators monitor and manage the overall platform.

---

# Features

## User
- User Registration & Login
- Browse Events and Venues
- View Event & Venue Details
- Book Events and Venues
- PayPal Sandbox Payment
- Booking History
- Profile Management

## Vendor
- Vendor Registration & Login
- Add, Update and Delete Venues
- Add, Update and Delete Events
- View & Manage Bookings
- Vendor Dashboard

## Admin
- Admin Login
- Approve/Reject Vendor Requests
- Manage Users
- Manage Events
- Manage Venues
- Monitor Bookings

---

# Tech Stack

## Backend
- Java
- Spring Boot
- Hibernate / JPA

## Frontend
- Next.js
- HTML
- CSS
- JavaScript

## Database
- MySQL

## Payment Gateway
- PayPal Sandbox API

## Tools & Platforms
- Eclipse IDE
- VS Code
- Postman
- MySQL Workbench
- Git
- GitHub

---

# Project Modules

### Authentication Module
- User Authentication
- Vendor Authentication
- Admin Authentication

### User Module
- Event Browsing
- Venue Browsing
- Booking Management
- Booking History
- Payment

### Vendor Module
- Event Management
- Venue Management
- Booking Management

### Admin Module
- Vendor Approval
- User Management
- Event Management
- Venue Management

### Payment Module
- PayPal Sandbox Integration
- Payment Confirmation

---

# Security

- Role-Based Access Control
- Input Validation
- Exception Handling
- JWT Authentication

---

# How to Run the Application

## Prerequisites

Install the following software:

- Java 17 or later
- Maven
- Node.js (18+ recommended)
- npm
- MySQL Server
- Eclipse IDE (Backend)
- VS Code (Frontend)

---

## Clone the Repository

```bash
git clone https://github.com/your-username/MultiVendor_Event-venue.git
```

Navigate to the project directory.

---

## Backend Setup

Open the backend project in Eclipse IDE.

Open:

```
src/main/resources/application.properties
```

Configure the following properties using your own credentials.

### Database Configuration

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/eventvenue_db
spring.datasource.username=YOUR_DATABASE_USERNAME
spring.datasource.password=YOUR_DATABASE_PASSWORD
```

### Email Configuration

```properties
spring.mail.username=YOUR_EMAIL_ADDRESS
spring.mail.password=YOUR_APP_PASSWORD
```

> If using Gmail, generate an App Password instead of using your Gmail account password.

### JWT Configuration

```properties
jwt.secret=YOUR_SECRET_KEY
```

### PayPal Sandbox Configuration

```properties
paypal.client.id=YOUR_PAYPAL_CLIENT_ID
paypal.client.secret=YOUR_PAYPAL_CLIENT_SECRET
paypal.mode=sandbox
```

Create PayPal Sandbox credentials from:

https://developer.paypal.com/

### Stripe Configuration (Optional)

```properties
stripe.api.secret-key=YOUR_STRIPE_SECRET_KEY
```

Generate your Stripe API key from:

https://dashboard.stripe.com/apikeys

Run the Spring Boot application:

```bash
mvn spring-boot:run
```

or run it directly from Eclipse as a Spring Boot Application.

Backend URL:

```
http://localhost:8080
```

---

## Frontend Setup

Open the frontend folder using VS Code.

Install dependencies:

```bash
npm install --legacy-peer-deps
```

If dependency conflicts occur:

```bash
npm install --force
```

Start the application:

```bash
npm run dev
```

Frontend URL:

```
http://localhost:3000
```

---

# My Contributions

- Developed the backend using Spring Boot.
- Designed and implemented business logic.
- Implemented authentication for Users, Vendors, and Administrators.
- Developed booking management functionality.
- Integrated Hibernate/JPA with MySQL.
- Integrated PayPal Sandbox payment gateway.
- Ensured seamless communication between the Next.js frontend and Spring Boot backend.
- Tested backend APIs using Postman.
- Collaborated with team members during development.

---

# Learning Outcomes

- Spring Boot Development
- Hibernate & JPA
- Backend Development
- Payment Gateway Integration
- Frontend-Backend Integration
- RESTful Service Development
- Version Control using Git & GitHub
- Team Collaboration

---

# Team Size

4 Members

---

