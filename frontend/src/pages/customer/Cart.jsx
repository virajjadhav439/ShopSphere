import React, { useEffect, useState } from "react";
import { clearCart, getCart, removeFromCart, updateCartQuantity } from "@/services/cartService";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();
  
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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
          error.response?.data?.message || "Failed to load cart"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  const handleQuantityChange = async (item, newQuantity) => {
  try {
    const response = await updateCartQuantity(
      item.product._id,
      newQuantity
    );

    setCart(response.data.cart);
  } catch (error) {
    console.error(error);
  }
};

const handleRemoveItem = async (productId) => {
  try {
    const response = await removeFromCart(productId);

    setCart(response.data.cart);
  } catch (error) {
    console.error(error);
  }
};

const handleClearCart = async () => {
  try {
    const response = await clearCart();

    setCart(response.data.cart);
  } catch (error) {
    console.error(error);
  }
};

  if (loading) {
    return <div>Loading cart...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!cart || cart.items.length === 0) {
    return <div>Your cart is empty.</div>;
  }

  return (
    <div>
      <h1>Cart</h1>

<button
  type="button"
  onClick={handleClearCart}
>
  Clear Cart
</button>

      {cart.items.map((item) => (
        <div key={item._id}>
          <h2>{item.product.name}</h2>

          <p>Price: ₹{item.product.currentPrice}</p>

          <div className="flex items-center gap-3">
  <span>Quantity:</span>

  <button
    type="button"
    onClick={() => handleQuantityChange(item, item.quantity - 1)}
    disabled={item.quantity === 1}
  >
    -
  </button>

  <span>{item.quantity}</span>

  <button
    type="button"
    onClick={() => handleQuantityChange(item, item.quantity + 1)}
    disabled={item.quantity >= item.product.stock}
  >
    +
  </button>
</div>

          <p>
            Subtotal: ₹{item.product.currentPrice * item.quantity}
          </p>
          <button
  type="button"
  onClick={() => handleRemoveItem(item.product._id)}
>
  Remove
</button>
        </div>
      ))}

      <h2>Total Items: {cart.totalItems}</h2>

      <h2>Total Price: ₹{cart.totalPrice}</h2>
      <button
  type="button"
  onClick={() => navigate("/checkout")}
>
  Proceed to Checkout
</button>

    </div>
  );
};

export default Cart;