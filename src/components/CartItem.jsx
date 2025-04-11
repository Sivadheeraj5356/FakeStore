import React from "react";

const CartItem = ({ item, updateCart, removeFromCart }) => {
  return (
    <div className="cart-item">
      <img src={item.image} alt={item.title} />
      <div>
        <h3>{item.title}</h3>
        <p>${item.price}</p>
        <input
          type="number"
          value={item.quantity}
          onChange={(e) => updateCart(item.id, e.target.value)}
          min="1"
        />
        <button onClick={() => removeFromCart(item.id)}>Remove</button>
      </div>
    </div>
  );
};

export default CartItem;