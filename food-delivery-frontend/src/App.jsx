import { useState, useEffect } from "react";

import {
  Search,
  ShoppingCart,
  User,
  MapPin,
  X,
  Plus,
  Minus,
  Trash2,
  CheckCircle,
  Clock,
  Bike,
  PackageCheck,
  ChevronRight
} from "lucide-react";

import Restaurant from "./components/Restaurant";
import Checkout from "./components/Checkout";


/* =========================================================
   API CONFIGURATION
========================================================= */

const API_URL = import.meta.env.VITE_API_URL;


/* =========================================================
   APP
========================================================= */

function App() {

  const [page, setPage] = useState("home");

  const [restaurants, setRestaurants] = useState([]);
  const [restaurantsLoading, setRestaurantsLoading] = useState(true);
  const [restaurantsError, setRestaurantsError] = useState("");

  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [menu, setMenu] = useState([]);

  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);

  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(false);


  /* =========================================================
     FETCH RESTAURANTS
  ========================================================= */

  useEffect(() => {

    setRestaurantsLoading(true);
    setRestaurantsError("");

    fetch(`${API_URL}/api/restaurants`)

      .then((response) => {

        if (!response.ok) {
          throw new Error("Failed to fetch restaurants");
        }

        return response.json();
      })

      .then((data) => {

        console.log("Restaurants received:", data);

        setRestaurants(Array.isArray(data) ? data : []);

      })

      .catch((error) => {

        console.error("Restaurant error:", error);

        setRestaurantsError(
          "Unable to load restaurants."
        );

        setRestaurants([]);

      })

      .finally(() => {

        setRestaurantsLoading(false);

      });

  }, []);


  /* =========================================================
     FETCH MENU
  ========================================================= */

  useEffect(() => {

    if (!selectedRestaurant) {
      return;
    }

    setMenu([]);

    fetch(
      `${API_URL}/api/menu-items/restaurant/${selectedRestaurant.id}`
    )

      .then((response) => {

        if (!response.ok) {
          throw new Error("Failed to fetch menu");
        }

        return response.json();

      })

      .then((data) => {

        console.log("Menu received:", data);

        setMenu(Array.isArray(data) ? data : []);

      })

      .catch((error) => {

        console.error("Menu error:", error);

        setMenu([]);

      });

  }, [selectedRestaurant]);


  /* =========================================================
     FETCH ORDERS
  ========================================================= */

  const fetchOrders = () => {

    setOrdersLoading(true);

    fetch(`${API_URL}/api/orders`)

      .then((response) => {

        if (!response.ok) {
          throw new Error("Failed to fetch orders");
        }

        return response.json();

      })

      .then((data) => {

        console.log("Orders received:", data);

        setOrders(Array.isArray(data) ? data : []);

      })

      .catch((error) => {

        console.error("Orders error:", error);

        setOrders([]);

      })

      .finally(() => {

        setOrdersLoading(false);

      });

  };


  /* =========================================================
     LOAD ORDERS WHEN ORDERS PAGE OPENS
  ========================================================= */

  useEffect(() => {

    if (page === "orders") {
      fetchOrders();
    }

  }, [page]);


  /* =========================================================
     OPEN RESTAURANT
  ========================================================= */

  const openRestaurant = (restaurant) => {

    setSelectedRestaurant(restaurant);

    setMenu([]);

    setPage("restaurant");

  };


  /* =========================================================
     ADD TO CART
  ========================================================= */

  const addToCart = (item) => {

    setCart((currentCart) => {

      const existingItem = currentCart.find(
        (cartItem) => cartItem.id === item.id
      );

      if (existingItem) {

        return currentCart.map((cartItem) =>

          cartItem.id === item.id

            ? {
                ...cartItem,
                quantity: cartItem.quantity + 1
              }

            : cartItem

        );

      }

      return [
        ...currentCart,
        {
          ...item,
          quantity: 1
        }
      ];

    });

  };


  /* =========================================================
     INCREASE QUANTITY
  ========================================================= */

  const increaseQuantity = (id) => {

    setCart((currentCart) =>

      currentCart.map((item) =>

        item.id === id

          ? {
              ...item,
              quantity: item.quantity + 1
            }

          : item

      )

    );

  };


  /* =========================================================
     DECREASE QUANTITY
  ========================================================= */

  const decreaseQuantity = (id) => {

    setCart((currentCart) =>

      currentCart

        .map((item) =>

          item.id === id

            ? {
                ...item,
                quantity: item.quantity - 1
              }

            : item

        )

        .filter((item) => item.quantity > 0)

    );

  };


  /* =========================================================
     REMOVE ITEM
  ========================================================= */

  const removeItem = (id) => {

    setCart((currentCart) =>

      currentCart.filter(
        (item) => item.id !== id
      )

    );

  };


  /* =========================================================
     TOTAL ITEMS
  ========================================================= */

  const totalItems = cart.reduce(

    (total, item) =>
      total + item.quantity,

    0

  );


  /* =========================================================
     SUBTOTAL
  ========================================================= */

  const subtotal = cart.reduce(

    (total, item) =>

      total +
      Number(item.price) *
      item.quantity,

    0

  );


  /* =========================================================
     ORDER PLACED
  ========================================================= */

  const handleOrderPlaced = (order) => {

    setCart([]);

    setCartOpen(false);

    if (order) {

      setOrders((currentOrders) => [
        ...currentOrders,
        order
      ]);

    }

    setPage("orders");

  };


  /* =========================================================
     GO HOME
  ========================================================= */

  const goHome = () => {

    setPage("home");

  };


  /* =========================================================
     GO RESTAURANTS
  ========================================================= */

  const goRestaurants = () => {

    setPage("restaurants");

  };


  /* =========================================================
     RENDER
  ========================================================= */

  return (

    <div className="app">


      {/* =====================================================
          NAVBAR
      ===================================================== */}

      <header className="navbar">


        <button
          className="logo"
          onClick={goHome}
        >

          🍔 Foodie

        </button>


        <nav>


          <button
            onClick={goHome}
          >
            Home
          </button>


          <button
            onClick={goRestaurants}
          >
            Restaurants
          </button>


          <button
            onClick={() => setPage("orders")}
          >
            Orders
          </button>


        </nav>


        <div className="nav-actions">


          <button
            className="cart-nav-button"
            onClick={() => setCartOpen(true)}
          >

            <ShoppingCart size={21} />

            <span>
              {totalItems}
            </span>

          </button>


          <button
            className="profile-button"
            onClick={() => setPage("profile")}
          >

            <User size={21} />

          </button>


        </div>


      </header>


      {/* =====================================================
          HOME
      ===================================================== */}

      {page === "home" && (

        <Home
          restaurants={restaurants}
          loading={restaurantsLoading}
          error={restaurantsError}
          onRestaurantClick={openRestaurant}
          onViewRestaurants={goRestaurants}
        />

      )}


      {/* =====================================================
          RESTAURANTS
      ===================================================== */}

      {page === "restaurants" && (

        <RestaurantList
          restaurants={restaurants}
          loading={restaurantsLoading}
          error={restaurantsError}
          onRestaurantClick={openRestaurant}
        />

      )}


      {/* =====================================================
          RESTAURANT MENU
      ===================================================== */}

      {page === "restaurant" && selectedRestaurant && (

        <Restaurant
          restaurant={selectedRestaurant}
          menu={menu}
          addToCart={addToCart}
          cart={cart}
          onCartOpen={() => setCartOpen(true)}
        />

      )}


      {/* =====================================================
          CHECKOUT
      ===================================================== */}

      {page === "checkout" && (

        <Checkout
          subtotal={subtotal}
          cart={cart}
          restaurant={selectedRestaurant}
          onBack={() => setPage("restaurant")}
          onOrderPlaced={handleOrderPlaced}
        />

      )}


      {/* =====================================================
          ORDERS
      ===================================================== */}

      {page === "orders" && (

        <Orders
          orders={orders}
          loading={ordersLoading}
          onHome={goHome}
        />

      )}


      {/* =====================================================
          PROFILE
      ===================================================== */}

      {page === "profile" && (

        <Profile />

      )}


      {/* =====================================================
          CART
      ===================================================== */}

      {cartOpen && (

        <Cart
          cart={cart}
          subtotal={subtotal}
          onClose={() => setCartOpen(false)}
          increaseQuantity={increaseQuantity}
          decreaseQuantity={decreaseQuantity}
          removeItem={removeItem}
          onCheckout={() => {

            if (cart.length === 0) {

              alert("Your cart is empty.");

              return;

            }

            setCartOpen(false);

            setPage("checkout");

          }}
        />

      )}


    </div>

  );

}


/* =========================================================
   HOME
========================================================= */

function Home({
  restaurants,
  loading,
  error,
  onRestaurantClick,
  onViewRestaurants
}) {

  const [search, setSearch] = useState("");


  const filteredRestaurants =
    restaurants.filter((restaurant) =>

      restaurant.name
        .toLowerCase()
        .includes(search.toLowerCase())

    );


  return (

    <main>


      {/* HERO */}

      <section className="hero">


        <div className="location">

          <MapPin size={18} />

          Vijayawada

        </div>


        <h1>

          Delicious food,
          <br />
          delivered to your door.

        </h1>


        <p>

          Discover the best restaurants
          and food around you.

        </p>


        <div className="search-box">

          <Search size={21} />

          <input
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            placeholder="Search for food or restaurants..."
          />

        </div>


      </section>


      {/* CATEGORIES */}

      <section className="section">


        <h2>
          What are you craving?
        </h2>


        <div className="categories">


          <button>
            🍕
            <span>Pizza</span>
          </button>


          <button>
            🍔
            <span>Burgers</span>
          </button>


          <button>
            🍛
            <span>Indian</span>
          </button>


          <button>
            🍜
            <span>Asian</span>
          </button>


          <button>
            🍰
            <span>Desserts</span>
          </button>


          <button>
            🥗
            <span>Healthy</span>
          </button>


        </div>


      </section>


      {/* POPULAR RESTAURANTS */}

      <section className="section">


        <div className="section-title">


          <div>

            <h2>
              Popular Restaurants
            </h2>

            <p>
              Top-rated restaurants near you
            </p>

          </div>


          <button
            className="view-all"
            onClick={onViewRestaurants}
          >

            View all

            <ChevronRight size={17} />

          </button>


        </div>


        {loading && (

          <p>
            Loading restaurants...
          </p>

        )}


        {error && (

          <p>
            {error}
          </p>

        )}


        {!loading &&
          !error &&
          filteredRestaurants.length === 0 && (

            <p>
              No restaurants found.
            </p>

          )}


        {!loading &&
          !error &&
          filteredRestaurants.length > 0 && (

            <div className="restaurant-grid">

              {filteredRestaurants
                .slice(0, 3)
                .map((restaurant) => (

                  <RestaurantCard
                    key={restaurant.id}
                    restaurant={restaurant}
                    onClick={() =>
                      onRestaurantClick(restaurant)
                    }
                  />

                ))}

            </div>

          )}


      </section>


    </main>

  );

}


/* =========================================================
   RESTAURANT LIST
========================================================= */

function RestaurantList({
  restaurants,
  loading,
  error,
  onRestaurantClick
}) {

  return (

    <main className="section restaurants-page">


      <div className="page-heading">

        <h1>
          Restaurants
        </h1>

        <p>
          Find your next favourite meal.
        </p>

      </div>


      {loading && (

        <div className="loading-message">

          <p>
            Loading restaurants...
          </p>

        </div>

      )}


      {error && (

        <div className="loading-message">

          <p>
            {error}
          </p>

        </div>

      )}


      {!loading &&
        !error &&
        restaurants.length === 0 && (

          <div className="loading-message">

            <p>
              No restaurants available.
            </p>

          </div>

        )}


      {!loading &&
        !error &&
        restaurants.length > 0 && (

          <div className="restaurant-grid">

            {restaurants.map((restaurant) => (

              <RestaurantCard
                key={restaurant.id}
                restaurant={restaurant}
                onClick={() =>
                  onRestaurantClick(restaurant)
                }
              />

            ))}

          </div>

        )}


    </main>

  );

}


/* =========================================================
   RESTAURANT CARD
========================================================= */

function RestaurantCard({
  restaurant,
  onClick
}) {

  return (

    <button
      className="restaurant-card"
      onClick={onClick}
    >


      <div className="restaurant-image">

        {restaurant.emoji}

      </div>


      <div className="restaurant-info">


        <h3>

          {restaurant.name}

        </h3>


        <p>

          {restaurant.category}

        </p>


        <div className="restaurant-meta">


          <span>

            ⭐ {restaurant.rating}

          </span>


          <span>
            •
          </span>


          <span>

            {restaurant.deliveryTime}

          </span>


        </div>


      </div>


    </button>

  );

}


/* =========================================================
   CART
========================================================= */

function Cart({
  cart,
  subtotal,
  onClose,
  increaseQuantity,
  decreaseQuantity,
  removeItem,
  onCheckout
}) {

  return (

    <div className="cart-overlay">


      <aside className="cart-sidebar">


        <div className="cart-header">


          <h2>
            Your Cart
          </h2>


          <button onClick={onClose}>

            <X />

          </button>


        </div>


        {cart.length === 0 ? (

          <div className="empty-cart">


            <div>
              🛒
            </div>


            <h3>
              Your cart is empty
            </h3>


            <p>
              Add something delicious.
            </p>


          </div>

        ) : (

          <>


            <div className="cart-items">


              {cart.map((item) => (

                <div
                  className="cart-item"
                  key={item.id}
                >


                  <div className="cart-item-image">

                    {item.emoji}

                  </div>


                  <div className="cart-item-content">


                    <h4>

                      {item.name}

                    </h4>


                    <strong>

                      ₹
                      {Number(item.price) *
                        item.quantity}

                    </strong>


                    <div className="quantity">


                      <button
                        onClick={() =>
                          decreaseQuantity(item.id)
                        }
                      >

                        <Minus size={15} />

                      </button>


                      <span>

                        {item.quantity}

                      </span>


                      <button
                        onClick={() =>
                          increaseQuantity(item.id)
                        }
                      >

                        <Plus size={15} />

                      </button>


                    </div>


                  </div>


                  <button
                    className="delete-button"
                    onClick={() =>
                      removeItem(item.id)
                    }
                  >

                    <Trash2 size={17} />

                  </button>


                </div>

              ))}


            </div>


            <div className="cart-footer">


              <div className="summary-row">

                <span>
                  Subtotal
                </span>

                <strong>
                  ₹{subtotal}
                </strong>

              </div>


              <div className="summary-row">

                <span>
                  Delivery
                </span>

                <strong>
                  ₹40
                </strong>

              </div>


              <div className="summary-row total">

                <span>
                  Total
                </span>

                <strong>
                  ₹{subtotal + 40}
                </strong>

              </div>


              <button
                className="checkout-button"
                onClick={onCheckout}
              >

                Proceed to Checkout

              </button>


            </div>


          </>

        )}


      </aside>


    </div>

  );

}


/* =========================================================
   ORDERS
========================================================= */

function Orders({
  orders,
  loading,
  onHome
}) {


  if (loading) {

    return (

      <main className="orders-page">

        <PackageCheck size={65} />

        <h1>
          Loading orders...
        </h1>

        <p>
          Getting your orders from the database.
        </p>

      </main>

    );

  }


  if (orders.length === 0) {

    return (

      <main className="orders-page">

        <PackageCheck size={65} />

        <h1>
          No orders yet
        </h1>

        <p>
          Your orders will appear here.
        </p>

        <button onClick={onHome}>
          Browse Restaurants
        </button>

      </main>

    );

  }


  return (

    <main className="orders-page">


      <h1>
        My Orders
      </h1>


      <p>
        Your order history
      </p>


      <div className="orders-list">


        {orders
          .slice()
          .reverse()
          .map((order) => (

            <div
              className="order-card"
              key={order.id}
            >


              <div className="order-card-header">


                <div>

                  <h2>
                    Order #{order.id}
                  </h2>


                  <p>

                    {order.orderDate
                      ? new Date(
                          order.orderDate
                        ).toLocaleString()
                      : "Recent order"}

                  </p>

                </div>


                <span className="order-status">

                  {order.status}

                </span>


              </div>


              <div className="order-details">


                <div>

                  <span>
                    Total
                  </span>

                  <strong>
                    ₹{order.totalAmount}
                  </strong>

                </div>


                <div>

                  <span>
                    Payment
                  </span>

                  <strong>
                    {order.paymentMethod}
                  </strong>

                </div>


                <div>

                  <span>
                    Delivery Address
                  </span>

                  <strong>
                    {order.deliveryAddress}
                  </strong>

                </div>


              </div>


              <div className="order-progress">


                <div className="progress-step active">

                  <CheckCircle size={20} />

                  <span>
                    Placed
                  </span>

                </div>


                <div className="progress-line" />


                <div className="progress-step">

                  <Clock size={20} />

                  <span>
                    Preparing
                  </span>

                </div>


                <div className="progress-line" />


                <div className="progress-step">

                  <Bike size={20} />

                  <span>
                    On the Way
                  </span>

                </div>


                <div className="progress-line" />


                <div className="progress-step">

                  <PackageCheck size={20} />

                  <span>
                    Delivered
                  </span>

                </div>


              </div>


            </div>

          ))}


      </div>


    </main>

  );

}


/* =========================================================
   PROFILE
========================================================= */

function Profile() {

  return (

    <main className="profile-page">


      <div className="profile-avatar">
        👤
      </div>


      <h1>
        My Profile
      </h1>


      <p>
        Foodie customer
      </p>


      <div className="profile-card">


        <div>

          <span>
            Name
          </span>

          <strong>
            Foodie User
          </strong>

        </div>


        <div>

          <span>
            Location
          </span>

          <strong>
            Vijayawada
          </strong>

        </div>


        <div>

          <span>
            Favourite cuisine
          </span>

          <strong>
            Indian
          </strong>

        </div>


      </div>


    </main>

  );

}


export default App;