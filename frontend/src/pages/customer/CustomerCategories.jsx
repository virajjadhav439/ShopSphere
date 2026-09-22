import React, { useEffect, useState } from "react";
import { getCategories } from "@/services/categoryService";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const CustomerCategories = () => {
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
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-muted-foreground">
          Loading categories...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (categories.length === 0) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-muted-foreground">
          No categories found.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-6 py-10 md:px-10 lg:px-16">
      
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-bold">
          Categories
        </h1>

        <p className="mt-2 text-muted-foreground">
          Explore products by category
        </p>
      </div>

      {/* Category Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <Link
            key={category._id}
            to={`/products?category=${category._id}`}
          >
            <Card className="group overflow-hidden h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              
              {/* Image */}
              <div className="relative overflow-hidden bg-muted">
                {category.image ? (
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-52 object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-52 flex items-center justify-center">
                    <span className="text-muted-foreground">
                      No Image
                    </span>
                  </div>
                )}
              </div>

              {/* Content */}
              <CardContent className="p-5">
                <div className="flex items-center justify-between gap-4">
                  
                  <div>
                    <h2 className="text-xl font-semibold">
                      {category.name}
                    </h2>

                    {category.description && (
                      <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                        {category.description}
                      </p>
                    )}
                  </div>

                  <div className="shrink-0 rounded-full border p-2 transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                    <ArrowRight size={18} />
                  </div>

                </div>
              </CardContent>

            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CustomerCategories;