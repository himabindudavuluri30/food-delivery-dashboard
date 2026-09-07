# 🍔 Food Delivery Dashboard — Frontend

A modern **Food Delivery Dashboard** built with React that allows users to browse restaurants, explore menus, add food items to their cart, and place orders.

The application is connected to a **Spring Boot REST API** and uses **MySQL** for persistent data storage.

## 🚀 Live Demo

**Frontend:**
https://food-delivery-frontend-zeta-one.vercel.app/

**Backend API:**
https://food-delivery-backend-avz1.onrender.com/

## ✨ Features

* 🏪 Browse available restaurants
* 🍕 View restaurant-specific menus
* 🛒 Add and remove items from cart
* 💰 Calculate cart totals
* 📦 Place food orders
* 👤 Create customer information during checkout
* 🔗 REST API integration
* 📱 Responsive dashboard interface
* ⚡ Fast frontend development with Vite
* ☁️ Deployed using Vercel

## 🛠️ Tech Stack

### Frontend

* React.js
* JavaScript
* Vite
* HTML5
* CSS3
* Lucide React Icons

### Backend

* Java
* Spring Boot
* REST APIs

### Database

* MySQL

### Deployment

* Vercel — Frontend
* Render — Backend
* Railway — MySQL Database

## 🏗️ Application Architecture

```text
React Frontend
      │
      │ REST API
      ▼
Spring Boot Backend
      │
      │ JDBC / JPA
      ▼
MySQL Database
```

The React frontend communicates with the Spring Boot backend through REST APIs.

The backend handles business logic and database operations, while MySQL stores restaurant, menu, user, order, and order-item information.

## 📂 Project Structure

```text
food-delivery-frontend/
│
├── public/
│
├── src/
│   ├── components/
│   │   └── Checkout.jsx
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── .gitignore
├── package.json
├── package-lock.json
├── vite.config.js
└── README.md
```

## 🔌 API Integration

The frontend uses the deployed Spring Boot backend.

The API base URL is configured using an environment variable:

```env
VITE_API_URL=https://food-delivery-backend-avz1.onrender.com
```

Example API requests:

```text
GET /api/restaurants
GET /api/menu-items/restaurant/{restaurantId}

POST /api/users
POST /api/orders
POST /api/order-items
```

## 💻 Run Locally

### 1. Clone the repository

```bash
git clone https://github.com/himabindudavuluri30/food-delivery-frontend.git
```

### 2. Open the project

```bash
cd food-delivery-frontend
```

### 3. Install dependencies

```bash
npm install
```

### 4. Create environment file

Create a `.env` file in the project root:

```env
VITE_API_URL=https://food-delivery-backend-avz1.onrender.com
```

### 5. Start the development server

```bash
npm run dev
```

The application will be available at the local URL shown in your terminal.



## 🎯 Learning Outcomes

Through this project, I gained practical experience in:

* Building React applications
* Creating reusable React components
* Managing application state
* Integrating REST APIs
* Connecting frontend and backend systems
* Working with environment variables
* Implementing a real-world checkout workflow
* Deploying applications to cloud platforms
* Using Git and GitHub for version control

## 🔮 Future Improvements

* 🔐 User authentication and authorization
* 💳 Online payment integration
* 📍 Order tracking
* ⭐ Restaurant and food ratings
* 🔎 Search and filtering
* 🧑‍💼 Admin dashboard
* 📊 Order analytics
* 📱 Improved mobile experience

## 👩‍💻 Author

**Hima Bindu Davuluri**

B.Tech — Computer Science & Engineering

GitHub:
https://github.com/himabindudavuluri30

---


