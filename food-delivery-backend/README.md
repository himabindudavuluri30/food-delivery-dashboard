# 🍔 Food Delivery Dashboard — Backend

A **Spring Boot REST API** for a real-world Food Delivery Dashboard application.

The backend provides APIs for managing restaurants, menu items, users, orders, and order items. It connects to a **MySQL database hosted on Railway** and is deployed on **Render**.

## 🚀 Live API

**Backend:**
https://food-delivery-backend-avz1.onrender.com

### Main API Endpoints

```text
GET    /api/restaurants

GET    /api/menu-items

GET    /api/menu-items/restaurant/{restaurantId}

GET    /api/users

POST   /api/users

GET    /api/orders

POST   /api/orders

GET    /api/order-items

POST   /api/order-items

GET    /api/order-items/order/{orderId}
```

## ✨ Features

* 🏪 Restaurant management
* 🍕 Menu item management
* 👤 Customer management
* 📦 Order management
* 🧾 Order item management
* 🔗 RESTful API architecture
* 🗄️ MySQL database integration
* 🌐 CORS configuration for frontend communication
* ☁️ Cloud deployment using Render
* 🔐 Database credentials managed through environment variables

## 🛠️ Tech Stack

### Backend

* Java 17
* Spring Boot 3.5.6
* Spring Web
* Spring Data JPA
* Hibernate
* Maven

### Database

* MySQL
* Railway

### Deployment

* Render
* Docker

### Development Tools

* IntelliJ IDEA / VS Code
* Git
* GitHub
* MySQL Workbench

## 🏗️ System Architecture

```text
┌──────────────────────────┐
│      React Frontend      │
│        Vercel            │
└────────────┬─────────────┘
             │
             │ REST API
             ▼
┌──────────────────────────┐
│    Spring Boot Backend   │
│         Render           │
└────────────┬─────────────┘
             │
             │ JPA / Hibernate
             ▼
┌──────────────────────────┐
│      MySQL Database      │
│         Railway          │
└──────────────────────────┘
```

## 📊 Database Design

The application uses the following main tables:

```text
restaurants
     │
     └────── menu_items

users
     │
     └────── orders
                │
                └────── order_items
```

### Main Entities

| Entity     | Purpose                                       |
| ---------- | --------------------------------------------- |
| Restaurant | Stores restaurant information                 |
| MenuItem   | Stores food items and their details           |
| User       | Stores customer information                   |
| Order      | Stores customer orders                        |
| OrderItem  | Stores individual items belonging to an order |

## 📂 Project Structure

```text
food-delivery-backend/
│
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── Food/
│   │   │       └── Delivery/
│   │   │           └── Backend/
│   │   │               ├── Controller/
│   │   │               ├── Entity/
│   │   │               ├── Repository/
│   │   │               ├── CorsConfig.java
│   │   │               └── FoodDeliveryBackendApplication.java
│   │   │
│   │   └── resources/
│   │       └── application.properties
│   │
│   └── test/
│
├── Dockerfile
├── mvnw
├── mvnw.cmd
├── pom.xml
└── README.md
```

## 🔌 REST API

### Restaurants

```text
GET /api/restaurants
```

Returns the list of available restaurants.

### Menu Items

```text
GET /api/menu-items
```

Returns all menu items.

```text
GET /api/menu-items/restaurant/{restaurantId}
```

Returns menu items belonging to a specific restaurant.

### Users

```text
GET /api/users
POST /api/users
```

Used to retrieve and create customer records.

### Orders

```text
GET /api/orders
POST /api/orders
```

Used to retrieve and create customer orders.

### Order Items

```text
GET /api/order-items
POST /api/order-items
```

Used to manage individual food items associated with orders.

```text
GET /api/order-items/order/{orderId}
```

Returns the items belonging to a specific order.

## ⚙️ Environment Configuration

Database credentials are not hard-coded into the application.

The backend uses environment variables:

```properties
spring.datasource.url=${SPRING_DATASOURCE_URL}
spring.datasource.username=${SPRING_DATASOURCE_USERNAME}
spring.datasource.password=${SPRING_DATASOURCE_PASSWORD}

spring.jpa.hibernate.ddl-auto=${SPRING_JPA_HIBERNATE_DDL_AUTO:update}

server.port=${PORT:8080}
```

This keeps sensitive database credentials outside the source code.

## 💻 Run Locally

### 1. Clone the repository

```bash
git clone https://github.com/himabindudavuluri30/food-delivery-backend.git
```

### 2. Open the project

```bash
cd food-delivery-backend
```

### 3. Configure environment variables

Set the required database environment variables:

```text
SPRING_DATASOURCE_URL
SPRING_DATASOURCE_USERNAME
SPRING_DATASOURCE_PASSWORD
SPRING_JPA_HIBERNATE_DDL_AUTO
```

### 4. Run the application

On Windows:

```powershell
.\mvnw spring-boot:run
```

Or:

```powershell
.\mvnw clean package
java -jar target/*.jar
```

The backend runs on:

```text
http://localhost:8080
```

## 🐳 Docker

The application can also be built and run using Docker.

### Build

```bash
docker build -t food-delivery-backend .
```

### Run

```bash
docker run -p 8080:8080 food-delivery-backend
```

## ☁️ Deployment

The backend is deployed using **Render** with Docker.

The application connects to a **Railway MySQL database** through environment variables.

```text
GitHub
   ↓
Render
   ↓
Docker Build
   ↓
Spring Boot Application
   ↓
Railway MySQL
```

## 🔐 Security Considerations

Sensitive database credentials are stored as environment variables instead of being committed to GitHub.

The `.gitignore` file also prevents local environment files and other unnecessary files from being committed.

## 🎯 Learning Outcomes

This project provided practical experience with:

* Building REST APIs using Spring Boot
* Creating entities and repositories with Spring Data JPA
* Connecting Java applications to MySQL
* Designing relational database structures
* Implementing CRUD operations
* Handling relationships between entities
* Configuring CORS
* Managing environment variables
* Containerizing applications with Docker
* Deploying a Spring Boot application to the cloud
* Connecting a deployed backend to a React frontend
* Using Git and GitHub for version control

## 🔮 Future Improvements

* 🔐 JWT authentication and authorization
* 👨‍💼 Admin and restaurant-owner roles
* 💳 Online payment integration
* 📍 Real-time order tracking
* 🔎 Advanced search and filtering
* ⭐ Ratings and reviews
* 📊 Admin analytics dashboard
* 🧪 Automated unit and integration testing
* 📝 API documentation with Swagger/OpenAPI

## 👩‍💻 Author

**Hima Bindu Davuluri**

B.Tech — Computer Science & Engineering

GitHub:
https://github.com/himabindudavuluri30

---

