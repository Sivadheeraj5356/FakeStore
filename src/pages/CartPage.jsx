import React, { useState } from "react";
import CartItem from "../components/CartItem";

const CartPage = ({ cart, setCart, removeFromCart, clearCart }) => {
  const [showPopup, setShowPopup] = useState(false);

  const updateCart = (id, quantity) => {
    console.log('Updating cart:', id, quantity);
    setCart(prevCart => 
      prevCart.map(item => 
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const handleCheckout = () => {
    clearCart();
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 4000);
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="cart-page">
      <h1>Your Cart</h1>
      {cart.length > 0 ? (
        <>
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
        </>
      ) : (
        <p>Your cart is empty.</p>
      )}
      {showPopup && <div className="popup">Order placed successfully!</div>}
    </div>
  );
};

export default CartPage;