import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchProducts, fetchCategories, fetchProductsByCategory } from "../services/api";
import ProductCard from "../components/ProductCard";

const HomePage = ({ addToCart }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const { category } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = category && category !== "all"
          ? await fetchProductsByCategory(category)
          : await fetchProducts();
        setProducts(data);
      } catch (err) {
        console.error("Failed to fetch products:", err);
      }
    };

    const loadCategories = async () => {
      try {
        const data = await fetchCategories();
        setCategories(["all", ...data]);
      } catch (err) {
        console.error("Failed to fetch categories:", err);
      }
    };

    loadProducts();
    loadCategories();
  }, [category]);

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    navigate(selectedCategory === "all" ? "/home" : `/home/category/${selectedCategory}`);
  };

  return (
    <div className="home-page">
      <div className="filters">
        <select value={category || "all"} onChange={handleCategoryChange}>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="product-grid">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} addToCart={addToCart} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;