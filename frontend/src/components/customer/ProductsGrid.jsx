import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { getProducts } from "@/services/productService";
import ProductCardSkeleton from "./ProductCardSkeleton";
import { getCategories } from "@/services/categoryService";
import toast from "react-hot-toast";
import { Button } from "../ui/button";

const ProductsGrid = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [search, setSearch] = useState("");
const [debouncedSearch, setDebouncedSearch] = useState("");

const [categories, setCategories] = useState([]);
const [selectedCategory, setSelectedCategory] = useState("");

const [minPrice, setMinPrice] = useState("");
const [maxPrice, setMaxPrice] = useState("");

const [appliedMinPrice, setAppliedMinPrice] = useState("");
const [appliedMaxPrice, setAppliedMaxPrice] = useState("");

const [selectedRating, setSelectedRating] = useState("");

const [inStockOnly, setInStockOnly] = useState(false);

const [sort, setSort] = useState("");

const handleApplyPrice = () => {
  if (
    minPrice &&
    maxPrice &&
    Number(minPrice) > Number(maxPrice)
  ) {
    toast.error("Minimum price cannot be greater than maximum price");
    return;
  }

  setAppliedMinPrice(minPrice);
  setAppliedMaxPrice(maxPrice);
  setCurrentPage(1);
};

useEffect(() => {
  const fetchCategories = async () => {
    try {
      const response = await getCategories();
      
      setCategories(response.data.categories);
    } catch (error) {
      console.error("Failed to load categories", error);
    }
  };

  fetchCategories();
}, []);

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

  ...(selectedCategory && {
    category: selectedCategory,
  }),

  ...(appliedMinPrice && {
    minPrice: appliedMinPrice,
  }),

  ...(appliedMaxPrice && {
    maxPrice: appliedMaxPrice,
  }),
  ...(selectedRating && {
  rating: selectedRating,
}),
...(inStockOnly && {
  inStock: "true",
}),
...(sort && {
  sort: sort,
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
}, [
  currentPage,
  debouncedSearch,
  selectedCategory,
  appliedMinPrice,
  appliedMaxPrice,
  selectedRating,
  inStockOnly,
  sort,
]);

  
  
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

  <select
    value={selectedCategory}
    onChange={(e) => {
      setSelectedCategory(e.target.value);
      setCurrentPage(1);
    }}
  >
    <option value="">All Categories</option>

    {categories.map((category) => (
      <option
        key={category._id}
        value={category._id}
      >
        {category.name}
      </option>
    ))}
  </select>
</div>

          {/* Price */}
          <div className="flex flex-col gap-2">
  <label>Price</label>

  <div className="flex gap-2">
    <input
      type="number"
      placeholder="Min"
      value={minPrice}
      onChange={(e) => setMinPrice(e.target.value)}
    />

    <input
      type="number"
      placeholder="Max"
      value={maxPrice}
      onChange={(e) => setMaxPrice(e.target.value)}
    />
  </div>

  <button
    type="button"
    onClick={handleApplyPrice}
    className="border-2 hover:bg-black hover:text-white transition-all duration-300"
  >
    Apply
  </button>
</div>

          {/* Rating */}
          <div className="flex flex-col gap-2">
  <label>Rating</label>

  <select
    value={selectedRating}
    onChange={(e) => {
      setSelectedRating(e.target.value);
      setCurrentPage(1);
    }}
  >
    <option value="">All Ratings</option>
    <option value="4">4★ & above</option>
    <option value="3">3★ & above</option>
    <option value="2">2★ & above</option>
    <option value="1">1★ & above</option>
  </select>
</div>

          {/* Stock */}
          <div className="flex items-center gap-2">
  <input
    type="checkbox"
    id="in-stock"
    checked={inStockOnly}
    onChange={(e) => {
      setInStockOnly(e.target.checked);
      setCurrentPage(1);
    }}
  />

  <label htmlFor="in-stock">
    In Stock Only
  </label>
</div>

          {/* Sort */}
          <div className="flex flex-col gap-2">
  <label>Sort By</label>

  <select
    value={sort}
    onChange={(e) => {
      setSort(e.target.value);
      setCurrentPage(1);
    }}
  >
    <option value="">Default</option>
    <option value="price_asc">Price: Low to High</option>
    <option value="price_desc">Price: High to Low</option>
    <option value="rating">Highest Rated</option>
    <option value="newest">Newest</option>
  </select>
</div>

        </div>

        {/* Product Grid */}
        <div>

          {/* Loading State */}
          {loading && (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {Array.from({ length:  6 }).map((_, index) => (
      <ProductCardSkeleton key={index} />
    ))}
  </div>
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