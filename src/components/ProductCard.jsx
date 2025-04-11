import React from "react";

const ProductCard = ({ product, onClick, addToCart }) => {
  return (
    <div className="product-card" onClick={onClick}>
      <img src={product.image} alt={product.title} />
      <h3>{product.title}</h3>
      <p>${product.price.toFixed(2)}</p>
      <button onClick={(e) => {
        e.stopPropagation(); // Prevent navigation on button click
        addToCart(product);
      }}>
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;