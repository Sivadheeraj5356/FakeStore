import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchProductById } from "../services/api";

const ProductDetailPage = ({ addToCart }) => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const data = await fetchProductById(id);
        setProduct(data);
      } catch (err) {
        console.error("Failed to fetch product details:", err);
      }
    };

    loadProduct();
  }, [id]);

  if (!product) return <p>Loading...</p>;

  return (
    <div className="product-detail">
      <div className="product-detail-container">
        <img src={product.image} alt={product.title} className="product-detail-image" />
        <div className="product-detail-info">
          <h1>{product.title}</h1>
          <p className="product-detail-category">{product.category}</p>
          <p className="product-detail-description">{product.description}</p>
          <p className="product-detail-price">${product.price.toFixed(2)}</p>
          <button onClick={() => addToCart(product)} className="add-to-cart-button">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;