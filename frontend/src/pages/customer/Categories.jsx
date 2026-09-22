import React, { useEffect, useState } from "react";
import { getCategories } from "@/services/categoryService";
import { Link } from "react-router-dom";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getCategories();

        setCategories(response.data.categories);
      } catch (error) {
        console.error(error);

        setError(
          error.response?.data?.message ||
            "Failed to load categories"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return <div>Loading categories...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (categories.length === 0) {
    return <div>No categories found.</div>;
  }

  return (
    <div>
      <h1>Categories</h1>

      <div>
        {categories.map((category) => (
          <Link
            key={category._id}
            to={`/products?category=${category._id}`}
          >
            <div>
              {category.image && (
                <img
                  src={category.image}
                  alt={category.name}
                  width="200"
                />
              )}

              <h2>{category.name}</h2>

              {category.description && (
                <p>{category.description}</p>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Categories;