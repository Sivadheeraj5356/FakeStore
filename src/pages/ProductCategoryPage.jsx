import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchProductsByCategory } from "../services/api";
import ProductCard from "../components/ProductCard";

const ProductCategoryPage = ({ addToCart }) => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProductsByCategory(category);
        setProducts(data);
      } catch (err) {
        console.error("Failed to fetch products by category:", err);
      }
    };

    loadProducts();
  }, [category]);

  return (
    <div className="category-page">
      <h1>Category: {category}</h1>
      <div className="product-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} addToCart={addToCart} />
        ))}
      </div>
    </div>
  );
};

export default ProductCategoryPage;