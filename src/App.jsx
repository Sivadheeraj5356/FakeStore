import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import ProductsPage from "./pages/ProductsPage";
import ProductCategoryPage from "./pages/ProductCategoryPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import CartPage from "./pages/CartPage";
import Header from "./components/Header";

const App = () => {
  const [cart, setCart] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("token"));

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const updateCart = (id, quantity) => {
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const removeFromCart = (id) => {
    setCart(prevCart => prevCart.filter(item => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  useEffect(() => {
    setIsAuthenticated(!!localStorage.getItem("token"));
  }, []);

  return (
    <Router>
      {isAuthenticated && <Header cartCount={cart.length} setIsAuthenticated={setIsAuthenticated} />}
      <Routes>
        <Route
          path="/"
          element={isAuthenticated ? <Navigate to="/products" /> : <LoginPage setIsAuthenticated={setIsAuthenticated} />}
        />
        <Route
          path="/products"
          element={isAuthenticated ? <ProductsPage addToCart={addToCart} /> : <Navigate to="/" />}
        />
        <Route
          path="/products/category/:category"
          element={isAuthenticated ? <ProductCategoryPage addToCart={addToCart} /> : <Navigate to="/" />}
        />
        <Route
          path="/products/:id"
          element={isAuthenticated ? <ProductDetailPage addToCart={addToCart} /> : <Navigate to="/" />}
        />
        <Route
          path="/cart"
          element={
            isAuthenticated ? (
              <CartPage
                cart={cart}
                setCart={setCart}
                removeFromCart={removeFromCart}
                clearCart={clearCart}
              />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;