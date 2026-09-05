import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "@/services/productService";
import { getCart, addToCart, updateCartQuantity } from "@/services/cartService";

const ProductDetails = () => {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [cartItem, setCartItem] = useState(null);

  const [quantity, setQuantity] = useState(1);
  const [cartLoading, setCartLoading] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getProductById(id);

        setProduct(response.data.product);

        const cartResponse = await getCart();

        const existingItem = cartResponse.data.cart.items.find(
          (item) => item.product._id === id,
        );

        setCartItem(existingItem || null);
      } catch (error) {
        console.error(error);

        setError(error.response?.data?.message || "Failed to load product");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  useEffect(() => {
    if (cartItem) {
      setQuantity(cartItem.quantity);
    }
  }, [cartItem]);

  const handleAddToCart = async () => {
    try {
      setCartLoading(true);

      // Product is not in cart
      if (!cartItem) {
        const response = await addToCart(product._id);

        const updatedCart = response.data.cart;

        const updatedItem = updatedCart.items.find(
          (item) => item.product._id === product._id,
        );

        setCartItem(updatedItem || null);
        return;
      }

      // Product is already in cart
      if (quantity !== cartItem.quantity) {
        const response = await updateCartQuantity(product._id, quantity);

        const updatedCart = response.data.cart;

        const updatedItem = updatedCart.items.find(
          (item) => item.product._id === product._id,
        );

        setCartItem(updatedItem || null);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setCartLoading(false);
    }
  };

  if (loading) {
    return <div>Loading product...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div>
      <h1>{product.name}</h1>

      <p>{product.description}</p>

      <p>₹{product.currentPrice}</p>

      <p>Stock: {product.stock}</p>

      {cartItem && (
  <div>
    <p>Quantity</p>

    <div className="flex items-center gap-3">
      <button
        type="button"
        onClick={() => {
          setQuantity((currentQuantity) =>
            Math.max(1, currentQuantity - 1),
          );
        }}
        disabled={quantity === 1 || cartLoading}
      >
        -
      </button>

      <span>{quantity}</span>

      <button
        type="button"
        onClick={() => {
          setQuantity((currentQuantity) =>
            Math.min(product.stock, currentQuantity + 1),
          );
        }}
        disabled={quantity >= product.stock || cartLoading}
      >
        +
      </button>
    </div>
  </div>
)}

      <button type="button" onClick={handleAddToCart} disabled={cartLoading}>
        {cartLoading ? "Updating..." : cartItem ? "Update Cart" : "Add to Cart"}
      </button>

      {cartItem && <p>Already in Cart: {cartItem.quantity}</p>}
    </div>
  );
};

export default ProductDetails;
