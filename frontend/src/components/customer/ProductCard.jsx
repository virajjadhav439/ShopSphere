import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Heart, Star, ShoppingCart } from "lucide-react";

import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { addToCart } from "@/services/cartService";
import { addToWishlist } from "@/services/wishlistService";
import toast from "react-hot-toast";

const ProductCard = ({ product }) => {
  const handleAddToCart = async () => {
  try {
    const response = await addToCart(product.id);

    toast.success(response.data.message || "Added to cart");
  } catch (error) {
    toast.error(
      error.response?.data?.message || "Failed to add to cart"
    );
  }
};

const handleAddToWishlist = async () => {
  try {
    const response = await addToWishlist(product.id);

    toast.success(response.data.message || "Added to wishlist");
  } catch (error) {
    toast.error(
      error.response?.data?.message || "Failed to add to wishlist"
    );
  }
};

  return (
    <Card className="overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:shadow-md">

      {/* Product Image */}
      <div className="relative overflow-hidden">
        <Link to={`/products/${product.id}`} >
  <img
    src={product.image}
    alt={product.name}
    className="w-full aspect-square object-cover transition-transform duration-300 hover:scale-105"
    />
    </Link>
{/* Wishlist */}
  <button
  type="button"
  onClick={handleAddToWishlist}
  className="absolute top-3 right-3 rounded-full bg-white p-2 shadow-sm transition hover:scale-105 hover:bg-gray-100"
>
  <Heart size={18} />
</button>
</div>

      {/* Product Information */}
      <Link to={`/products/${product.id}`} >
      <CardContent className="p-4">

        <h2 className="font-semibold text-lg">
          {product.name}
        </h2>

        <div className="flex items-center gap-1 mt-2">
          <Star
            size={16}
            className="fill-yellow-400 text-yellow-400"
          />

          <span className="text-sm">
            {product.rating}
          </span>

          <span className="text-sm text-muted-foreground">
            ({product.reviews})
          </span>
        </div>

        <p className="font-bold text-xl mt-3">
          ₹{product.price}
        </p>

      </CardContent>
</Link>
      {/* Add To Cart */}
      <CardFooter className="p-4 pt-0">
        <Button
  onClick={handleAddToCart}
  className="w-full"
>
  <ShoppingCart size={18} />
  Add to Cart
</Button>
      </CardFooter>

    </Card>
  );
};

export default ProductCard;