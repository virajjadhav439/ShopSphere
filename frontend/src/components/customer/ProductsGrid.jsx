import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { getProducts } from "@/services/productService";

const ProductsGrid = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [search, setSearch] = useState("");
const [debouncedSearch, setDebouncedSearch] = useState("");

useEffect(() => {
  const timer = setTimeout(() => {
    setDebouncedSearch(search);
    setCurrentPage(1);
  }, 500);

  return () => clearTimeout(timer);
}, [search]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getProducts({
  page: currentPage,
  limit: 6,
  ...(debouncedSearch && {
    search: debouncedSearch,
  }),
});

        const data = response.data;

        const formattedProducts = data.products.map((product) => ({
          ...product,

          // Convert backend fields to ProductCard fields
          id: product._id,

          image:
            product.images?.find((image) => image.isPrimary)?.url ||
            product.images?.[0]?.url,

          rating: product.averageRating,

          reviews: product.reviewCount,

          price: product.currentPrice,
        }));

        setProducts(formattedProducts);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error(error);

        setError(
          error.response?.data?.message || "Failed to load products"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [currentPage, debouncedSearch]);

  
  
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
            value={search}
            onChange={(e) => setSearch(e.target.value)}
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
            {/* In-stock filter will come here */}
          </div>

          {/* Sort */}
          <div>
            <label>Sort</label>
            {/* Sort select will come here */}
          </div>

        </div>

        {/* Product Grid */}
        <div>

          {/* Loading State */}
          {loading && (
            <p>Loading products...</p>
          )}

          {/* Error State */}
          {!loading && error && (
            <p>{error}</p>
          )}

          {/* Empty State */}
          {!loading && !error && products.length === 0 && (
            <p>No products found.</p>
          )}

          {/* Products */}
          {!loading && !error && products.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                />
              ))}
            </div>
          )}

        </div>

        {/* Pagination */}
        {!loading && !error && totalPages > 1 && (
          <div className="flex items-center justify-center gap-4 mt-8">

            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((page) => page - 1)}
            >
              Previous
            </button>

            <span>
              Page {currentPage} of {totalPages}
            </span>

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((page) => page + 1)}
            >
              Next
            </button>

          </div>
        )}

      </div>
    </>
  );
};

export default ProductsGrid;