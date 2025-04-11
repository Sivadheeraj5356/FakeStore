import React from "react";

const CartItem = ({ item, updateCart, removeFromCart }) => {
  const handleIncrement = () => {
    const newQuantity = item.quantity + 1;
    console.log('Incrementing:', item.id, 'to', newQuantity);
    updateCart(item.id, newQuantity);
  };

  const handleDecrement = () => {
    if (item.quantity > 1) {
      const newQuantity = item.quantity - 1;
      console.log('Decrementing:', item.id, 'to', newQuantity);
      updateCart(item.id, newQuantity);
    }
  };

  return (
    <div className="cart-item">
      <img src={item.image} alt={item.title} />
      <div>
        <h3>{item.title}</h3>
        <p>Price: ${item.price.toFixed(2)}</p>
        <p>Total: ${(item.price * item.quantity).toFixed(2)}</p>
        <div className="quantity-controls">
          <button 
            type="button" 
            onClick={handleDecrement}
            disabled={item.quantity <= 1}
          >
            -
          </button>
          <span>{item.quantity}</span>
          <button 
            type="button" 
            onClick={handleIncrement}
          >
            +
          </button>
          <button 
            type="button" 
            onClick={() => removeFromCart(item.id)}
            style={{ marginLeft: '10px' }}
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;