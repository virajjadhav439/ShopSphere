import React, { useEffect, useState } from "react";
import {
  getWishlist,
  removeFromWishlist,
} from "@/services/wishlistService";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getWishlist();

        setWishlist(response.data.wishlist);
      } catch (error) {
        console.error(error);

        setError(
          error.response?.data?.message ||
            "Failed to load wishlist"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchWishlist();
  }, []);

  const handleRemove = async (productId) => {
    try {
      const response = await removeFromWishlist(productId);

      setWishlist(response.data.wishlist);
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return <div>Loading wishlist...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!wishlist || wishlist.products.length === 0) {
    return <div>Your wishlist is empty.</div>;
  }

  return (
    <div>
      <h1>My Wishlist</h1>

      {wishlist.products.map((product) => (
        <div key={product._id}>
          <img
            src={
              product.images?.find(
                (image) => image.isPrimary
              )?.url ||
              product.images?.[0]?.url
            }
            alt={product.name}
            width="100"
          />

          <h2>{product.name}</h2>

          <p>
            ₹{product.currentPrice}
          </p>

          <button
            type="button"
            onClick={() => handleRemove(product._id)}
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  );
};

export default Wishlist;