import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "@/services/productService";

const ProductDetails = () => {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getProductById(id);

        setProduct(response.data.product);
      } catch (error) {
        console.error(error);

        setError(
          error.response?.data?.message || "Failed to load product"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

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
    </div>
  );
};

export default ProductDetails;