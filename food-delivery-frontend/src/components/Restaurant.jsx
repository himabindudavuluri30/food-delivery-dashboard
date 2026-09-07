
import { ShoppingCart, Plus } from "lucide-react";

function Restaurant({
  restaurant,
  menu,
  addToCart,
  cart,
  onCartOpen
}) {
  const totalItems = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <main className="restaurant-page">

      {/* BACK BUTTON */}

      <button
        className="back-button"
        onClick={() => window.history.back()}
      >
        ← Back
      </button>


      {/* CART BUTTON */}

      <button
        className="cart-nav-button"
        onClick={onCartOpen}
      >
        <ShoppingCart size={20} />
        <span>{totalItems}</span>
      </button>


      {/* RESTAURANT HEADER */}

      <section className="restaurant-banner">

        <div className="banner-emoji">
          {restaurant?.emoji || "🍕"}
        </div>

        <div>

          <h1>
            {restaurant?.name || "Restaurant"}
          </h1>

          <p>
            {restaurant?.category || "Food"}
          </p>

          <span>
            ⭐ {restaurant?.rating || "4.5"} •{" "}
            {restaurant?.deliveryTime || "20-30 min"}
          </span>

        </div>

      </section>


      {/* MENU HEADING */}

      <div className="menu-heading">

        <h2>
          Popular Menu
        </h2>

        <p>
          Choose your favourite dishes
        </p>

      </div>


      {/* MENU */}

      <div className="food-grid">

        {menu.length === 0 ? (

          <p>
            Loading menu...
          </p>

        ) : (

          menu.map((item) => (

            <div
              className="food-card"
              key={item.id}
            >

              <div className="food-image">
                {item.emoji}
              </div>


              <div className="food-details">

                <h3>
                  {item.name}
                </h3>

                <p>
                  {item.description}
                </p>


                <div className="food-bottom">

                  <strong>
                    ₹{item.price}
                  </strong>


                  <button
                    onClick={() => addToCart(item)}
                  >
                    <Plus size={16} />
                    Add
                  </button>

                </div>

              </div>

            </div>

          ))

        )}

      </div>

    </main>
  );
}

export default Restaurant;

