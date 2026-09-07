# 🍔 Food Delivery Platform

A **full-stack Food Delivery Management Platform** built to simulate a real-world online food ordering system. The application provides a complete workflow starting from **restaurant and menu discovery to cart management, customer information, order placement, and backend order processing**.

The platform is designed using a **React.js frontend**, **Spring Boot REST APIs**, and a **MySQL relational database**, creating a complete client-server architecture. The frontend provides an interactive and responsive experience for customers, while the backend manages business logic, REST API communication, data persistence, and order-related operations.

The application is deployed as a cloud-based system, with the frontend hosted on **Vercel**, the Spring Boot backend deployed on **Render**, and the MySQL database hosted through **Railway**. This demonstrates the complete flow of a production-style web application from **frontend → REST API → database**.

## 🌐 Live Application

### 👤 Customer Application

**Live Website:** [Food Delivery Frontend](https://food-delivery-frontend-zeta-one.vercel.app/?utm_source=chatgpt.com)

The customer-facing application allows users to:

* Browse available restaurants
* Explore restaurant-specific menus
* View food items and prices
* Add and remove items from the cart
* Calculate the total order amount
* Enter customer information
* Place food orders

The frontend is built with **React.js and Vite** and communicates with the backend through REST APIs.

### ⚙️ Backend API

**Live API:** [Food Delivery Backend API](https://food-delivery-backend-avz1.onrender.com/?utm_source=chatgpt.com)

The backend is developed using **Java and Spring Boot** and acts as the core application layer.

It handles:

* Restaurant data
* Menu items
* Customer information
* Orders
* Order items
* CRUD operations
* REST API requests
* Database communication

The backend uses **Spring Data JPA and Hibernate** to communicate with the MySQL database.

## 🧩 System Overview

The application follows a three-layer architecture:

```text
┌─────────────────────────────┐
│       React Frontend        │
│           Vercel            │
│                             │
│ Restaurants • Menu • Cart   │
│ Checkout • Orders           │
└──────────────┬──────────────┘
               │
               │ REST API
               ▼
┌─────────────────────────────┐
│      Spring Boot Backend    │
│           Render            │
│                             │
│ Controllers • Services      │
│ JPA • Business Logic        │
└──────────────┬──────────────┘
               │
               │ JPA / Hibernate
               ▼
┌─────────────────────────────┐
│       MySQL Database        │
│          Railway            │
│                             │
│ Restaurants • Users         │
│ Menu • Orders • OrderItems  │
└─────────────────────────────┘
```

This architecture separates the **user interface, application logic, and data layer**, making the system easier to maintain and extend.

## ✨ Key Features

### 🏪 Restaurant & Menu Management

* Browse available restaurants
* View restaurant-specific menus
* Retrieve menu items through REST APIs
* Maintain restaurant and menu data

### 🛒 Shopping Cart

* Add food items to the cart
* Remove items from the cart
* Calculate the total order amount
* Review selected items before checkout

### 👤 Customer Management

* Capture customer information
* Store customer details in the database
* Associate customers with their orders

### 📦 Order Management

* Create customer orders
* Store individual order items
* Retrieve existing orders
* Associate orders with customers
* Maintain relationships between orders and their items

### 🔗 REST API Integration

The React frontend communicates with the Spring Boot backend through REST APIs for retrieving and modifying application data.

Example API operations include:

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
```

## 🛠️ Technology Stack

| Layer               | Technologies                            |
| ------------------- | --------------------------------------- |
| Frontend            | React.js, JavaScript, Vite, HTML5, CSS3 |
| Backend             | Java, Spring Boot                       |
| API                 | REST APIs, Spring Web                   |
| ORM                 | Spring Data JPA, Hibernate              |
| Database            | MySQL                                   |
| Database Hosting    | Railway                                 |
| Frontend Deployment | Vercel                                  |
| Backend Deployment  | Render                                  |
| Build Tool          | Maven                                   |
| Containerization    | Docker                                  |
| Version Control     | Git, GitHub                             |

## 🗄️ Database Design

The application uses a relational MySQL database with entities representing the major components of the food ordering system.

```text
Restaurants
     │
     └────── Menu Items

Users
     │
     └────── Orders
                 │
                 └────── Order Items
```

### Main Entities

* **Restaurant** — Stores restaurant information
* **MenuItem** — Stores food items and their details
* **User** — Stores customer information
* **Order** — Stores customer orders
* **OrderItem** — Stores individual food items belonging to an order

This relational structure allows the application to maintain clear relationships between customers, restaurants, menus, and orders.

## 🔄 Application Workflow

```text
User opens the application
          ↓
Browse Restaurants
          ↓
Select Restaurant
          ↓
Explore Menu
          ↓
Add Food Items to Cart
          ↓
Review Cart
          ↓
Enter Customer Information
          ↓
Place Order
          ↓
React Frontend
          ↓
Spring Boot REST API
          ↓
MySQL Database
          ↓
Order Stored Successfully
```

## 🎯 Technical Highlights

* Implemented a **full-stack client-server architecture**
* Developed REST APIs using **Spring Boot**
* Used **Spring Data JPA and Hibernate** for database interaction
* Designed a relational **MySQL database**
* Implemented CRUD operations for core entities
* Integrated React frontend with backend REST APIs
* Implemented cart and checkout workflow
* Used Docker for backend containerization
* Deployed frontend and backend to cloud platforms
* Connected the deployed application to a hosted MySQL database
* Used Git and GitHub for version control

## 🚀 Future Enhancements

* User authentication and authorization
* JWT-based security
* Online payment integration
* Order tracking
* Restaurant ratings and reviews
* Search and filtering
* Dedicated admin management
* Order analytics
* Improved mobile responsiveness

