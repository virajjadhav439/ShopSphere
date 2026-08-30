import React from "react";
import ProductCard from "./ProductCard";

const ProductsGrid = () => {
  const dummyProducts = [
  {
    id: '6a4fc3e194cd0f715939b6d2',
    name: "Samsung Galaxy S25 Ultra 512GB",
    price: 119999,
    image: "https://placehold.co/600x600",
    rating: 4.5,
    reviews: 128,
  },
  {
    id: 2,
    name: "Mechanical Keyboard",
    price: 5499,
    image: "https://placehold.co/600x600",
    rating: 4.7,
    reviews: 94,
  },
  {
    id: 3,
    name: "Gaming Mouse",
    price: 1999,
    image: "https://placehold.co/600x600",
    rating: 4.3,
    reviews: 76,
  },
  {
    id: 4,
    name: "Smart Watch",
    price: 7999,
    image: "https://placehold.co/600x600",
    rating: 4.6,
    reviews: 215,
  },
  {
    id: 5,
    name: "USB-C Hub",
    price: 1499,
    image: "https://placehold.co/600x600",
    rating: 4.2,
    reviews: 51,
  },
  {
    id: 6,
    name: "Laptop Stand",
    price: 2499,
    image: "https://placehold.co/600x600",
    rating: 4.4,
    reviews: 63,
  },
];
  return (
    <>
      {/* Products Page */}
      <div>

        {/* Products Header */}
        <div>
          <h1>Products</h1>
          <p>Explore our products</p>
        </div>

        {/* Search Box */}
        <div>
          <input
            type="text"
            placeholder="Search products..."
          />
        </div>

        {/* Filters */}
        <div>

          {/* Category */}
          <div>
            <label>Category</label>
            {/* Select will come here */}
          </div>

          {/* Price */}
          <div>
            <label>Price</label>
            {/* Min / Max price will come here */}
          </div>

          {/* Rating */}
          <div>
            <label>Rating</label>
            {/* Rating select will come here */}
          </div>

          {/* Stock */}
          <div>
            <label>Availability</label>
            {/* In-stock filter */}
          </div>

          {/* Sort */}
          <div>
            <label>Sort</label>
            {/* Sort select */}
          </div>

        </div>

        {/* Product Grid */}
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
  {dummyProducts.map((product) => (
    <ProductCard
      key={product.id}
      product={product}
    />
  ))}
</div>
        </div>

        {/* Pagination */}
        <div>
          {/* Pagination controls */}
        </div>

      </div>
    </>
  );
};

export default ProductsGrid;    