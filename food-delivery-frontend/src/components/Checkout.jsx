import { useState } from "react";

import {
  MapPin,
  CreditCard,
  Smartphone,
  Banknote
} from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL;

function Checkout({
  subtotal,
  cart,
  restaurant,
  onBack,
  onOrderPlaced
}) {

  const [address, setAddress] = useState("");

  const [payment, setPayment] =
    useState("card");

  const [loading, setLoading] =
    useState(false);


  const placeOrder = async () => {

    if (!address.trim()) {
      alert("Please enter your delivery address.");
      return;
    }

    if (!cart || cart.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    if (!restaurant) {
      alert("Please select a restaurant.");
      return;
    }

    setLoading(true);

    try {

      /*
       * STEP 1
       * CREATE USER
       */

      const userResponse = await fetch(
        `${API_URL}/api/users`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify({
            name: "Foodie User",
            email: `foodie${Date.now()}@example.com`,
            phone: "9999999999",
            address: address
          })
        }
      );

      if (!userResponse.ok) {
        throw new Error("Failed to create user");
      }

      const user =
        await userResponse.json();


      /*
       * STEP 2
       * CREATE ORDER
       */

      const totalAmount =
        Number(subtotal) + 40;

      const orderResponse = await fetch(
        `${API_URL}/api/orders`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify({
            userId: user.id,

            restaurantId:
              restaurant.id,

            totalAmount:
              totalAmount,

            deliveryAddress:
              address,

            paymentMethod:
              payment,

            status:
              "PLACED"
          })
        }
      );

      if (!orderResponse.ok) {
        throw new Error("Failed to create order");
      }

      const order =
        await orderResponse.json();


      /*
       * STEP 3
       * CREATE ORDER ITEMS
       */

      for (const item of cart) {

        const orderItemResponse =
          await fetch(
            `${API_URL}/api/order-items`,
            {
              method: "POST",

              headers: {
                "Content-Type":
                  "application/json"
              },

              body: JSON.stringify({

                orderId:
                  order.id,

                menuItemId:
                  item.id,

                quantity:
                  item.quantity,

                price:
                  Number(item.price)

              })
            }
          );

        if (!orderItemResponse.ok) {
          throw new Error(
            "Failed to create order item"
          );
        }
      }


      /*
       * EVERYTHING SUCCESSFUL
       */

      alert(
        "Order placed successfully!"
      );

      onOrderPlaced(order);

    } catch (error) {

      console.error(
        "Order error:",
        error
      );

      alert(
        "Something went wrong while placing the order."
      );

    } finally {

      setLoading(false);

    }
  };


  return (
    <main className="checkout-page">

      <button
        className="back-button"
        onClick={onBack}
      >
        ← Back to cart
      </button>


      <h1>
        Checkout
      </h1>


      <div className="checkout-layout">

        <div>


          {/* DELIVERY ADDRESS */}

          <div className="checkout-card">

            <h2>

              <MapPin size={21} />

              Delivery Address

            </h2>


            <textarea
              value={address}
              onChange={(e) =>
                setAddress(e.target.value)
              }
              placeholder="Enter your complete delivery address"
            />


            <div className="address-buttons">

              <button
                onClick={() =>
                  setAddress(
                    "Home, Vijayawada, Andhra Pradesh"
                  )
                }
              >
                Home
              </button>


              <button
                onClick={() =>
                  setAddress(
                    "Work, Vijayawada, Andhra Pradesh"
                  )
                }
              >
                Work
              </button>


              <button
                onClick={() =>
                  setAddress(
                    "Other, Vijayawada, Andhra Pradesh"
                  )
                }
              >
                Other
              </button>

            </div>

          </div>


          {/* PAYMENT */}

          <div className="checkout-card">

            <h2>

              <CreditCard size={21} />

              Payment Method

            </h2>


            <label className="payment-option">

              <input
                type="radio"
                value="card"
                checked={payment === "card"}
                onChange={(e) =>
                  setPayment(e.target.value)
                }
              />

              <CreditCard size={20} />

              <span>

                <strong>
                  Credit / Debit Card
                </strong>

                <small>
                  Visa, Mastercard, RuPay
                </small>

              </span>

            </label>


            <label className="payment-option">

              <input
                type="radio"
                value="upi"
                checked={payment === "upi"}
                onChange={(e) =>
                  setPayment(e.target.value)
                }
              />

              <Smartphone size={20} />

              <span>

                <strong>
                  UPI
                </strong>

                <small>
                  Google Pay, PhonePe, Paytm
                </small>

              </span>

            </label>


            <label className="payment-option">

              <input
                type="radio"
                value="cash"
                checked={payment === "cash"}
                onChange={(e) =>
                  setPayment(e.target.value)
                }
              />

              <Banknote size={20} />

              <span>

                <strong>
                  Cash on Delivery
                </strong>

                <small>
                  Pay when your food arrives
                </small>

              </span>

            </label>

          </div>

        </div>


        {/* ORDER SUMMARY */}

        <div className="checkout-summary">

          <h2>
            Order Summary
          </h2>


          <div className="summary-row">

            <span>
              Food total
            </span>

            <strong>
              ₹{subtotal}
            </strong>

          </div>


          <div className="summary-row">

            <span>
              Delivery fee
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
              ₹{Number(subtotal) + 40}
            </strong>

          </div>


          <button
            className="place-order-button"
            onClick={placeOrder}
            disabled={loading}
          >

            {loading
              ? "Placing Order..."
              : "Place Order"}

          </button>

        </div>

      </div>

    </main>
  );
}

export default Checkout;