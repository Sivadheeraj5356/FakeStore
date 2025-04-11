import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchProducts, fetchCategories } from "../services/api";
import ProductCard from "../components/ProductCard";

const ProductsPage = ({ addToCart }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts();
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
  }, []);

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setSelectedCategory(category);

    if (category === "all") {
      fetchProducts().then(setProducts).catch(console.error);
    } else {
      fetchProducts(`category/${category}`).then(setProducts).catch(console.error);
    }
  };

  return (
    <div className="products-page">
      <div className="filters">
        <select value={selectedCategory} onChange={handleCategoryChange}>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
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
          <ProductCard
            key={product.id}
            product={product}
            onClick={() => navigate(`/products/${product.id}`)}
            addToCart={addToCart}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;