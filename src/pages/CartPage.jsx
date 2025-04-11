import React, { useState } from "react";
import CartItem from "../components/CartItem";

const CartPage = ({ cart, updateCart, removeFromCart, clearCart }) => {
  const [showPopup, setShowPopup] = useState(false);

  const handleCheckout = () => {
    clearCart();
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 4000);
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="cart-page">
      <h1>Your Cart</h1>
      {cart.map((item) => (
        <CartItem
          key={item.id}
          item={item}
          updateCart={updateCart}
          removeFromCart={removeFromCart}
        />
      ))}
      <h2>Total: ${totalPrice.toFixed(2)}</h2>
      <button onClick={handleCheckout}>Checkout</button>
      {showPopup && <div className="popup">Order placed successfully!</div>}
    </div>
  );
};

export default CartPage;