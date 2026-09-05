import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCart } from "@/services/cartService";
import { createOrder } from "@/services/orderService";

const Checkout = () => {
  const navigate = useNavigate();

  const [cart, setCart] = useState(null);

  const [loading, setLoading] = useState(true);
  const [placingOrder, setPlacingOrder] = useState(false);

  const [error, setError] = useState("");

  const [shippingAddress, setShippingAddress] = useState({
    fullName: "",
    phone: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("COD");

  useEffect(() => {
    const fetchCart = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getCart();

        setCart(response.data.cart);
      } catch (error) {
        console.error(error);

        setError(
          error.response?.data?.message ||
            "Failed to load cart",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setShippingAddress((currentAddress) => ({
      ...currentAddress,
      [name]: value,
    }));
  };

  const handlePlaceOrder = async (event) => {
    event.preventDefault();

    try {
      setPlacingOrder(true);
      setError("");

      const orderData = {
        shippingAddress,
        paymentMethod,
      };

      const response = await createOrder(orderData);

      const order = response.data.data;

      console.log("Order created:", order);

      navigate("/orders");
    } catch (error) {
      console.error(error);

      setError(
        error.response?.data?.message ||
          "Failed to place order",
      );
    } finally {
      setPlacingOrder(false);
    }
  };

  if (loading) {
    return <div>Loading checkout...</div>;
  }

  if (error && !cart) {
    return <div>{error}</div>;
  }

  if (!cart || cart.items.length === 0) {
    return <div>Your cart is empty.</div>;
  }

  return (
    <div>
      <h1>Checkout</h1>

      {error && <p>{error}</p>}

      <form onSubmit={handlePlaceOrder}>
        <h2>Shipping Address</h2>

        <div>
          <label>Full Name</label>
          <input
          className="border-2"
            type="text"
            name="fullName"
            value={shippingAddress.fullName}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Phone</label>
          <input
          className="border-2"
            type="text"
            name="phone"
            value={shippingAddress.phone}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Address Line 1</label>
          <input
          className="border-2"
            type="text"
            name="addressLine1"
            value={shippingAddress.addressLine1}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Address Line 2</label>
          <input
          className="border-2"
            type="text"
            name="addressLine2"
            value={shippingAddress.addressLine2}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>City</label>
          <input
          className="border-2"
            type="text"
            name="city"
            value={shippingAddress.city}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>State</label>
          <input
          className="border-2"
            type="text"
            name="state"
            value={shippingAddress.state}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Pincode</label>
          <input
          className="border-2"
            type="text"
            name="pincode"
            value={shippingAddress.pincode}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Country</label>
          <input
          className="border-2"
            type="text"
            name="country"
            value={shippingAddress.country}
            onChange={handleChange}
          />
        </div>

        <h2>Payment Method</h2>

        <label className="m-2">
          <input
          className="border-2"
            type="radio"
            name="paymentMethod"
            value="COD"
            checked={paymentMethod === "COD"}
            onChange={(event) =>
              setPaymentMethod(event.target.value)
            }
          />
          Cash on Delivery
        </label>

        <label className="m-2">
          <input
          
            type="radio"
            name="paymentMethod"
            value="Razorpay"
            checked={paymentMethod === "Razorpay"}
            onChange={(event) =>
              setPaymentMethod(event.target.value)
            }
          />
          Razorpay
        </label>

        <label className="m-2">
          <input
            type="radio"
            name="paymentMethod"
            value="Stripe"
            checked={paymentMethod === "Stripe"}
            onChange={(event) =>
              setPaymentMethod(event.target.value)
            }
          />
          Stripe
        </label>

        <h2>Order Summary</h2>

        <p>Total Items: {cart.totalItems}</p>

        <p>Total Price: ₹{cart.totalPrice}</p>

        <button
        className="border-2 hover:bg-blue-300"
          type="submit"
          disabled={placingOrder}
        >
          {placingOrder
            ? "Placing Order..."
            : "Place Order"}
        </button>
      </form>
    </div>
  );
};

export default Checkout;