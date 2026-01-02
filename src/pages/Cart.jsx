import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/cart.css";

export default function Cart() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  const updateStorage = (updatedCart) => {
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const removeItem = (index) => {
    const updated = cart.filter((_, i) => i !== index);
    updateStorage(updated);
  };

  const updateQuantity = (index, delta) => {
    const updated = [...cart];
    updated[index].qty = Math.max(1, updated[index].qty + delta);
    updateStorage(updated);
  };

  if (cart.length === 0) {
    return (
      <div className="container">
        <h2 className="page-title">Your Cart</h2>
        <p>Your cart is empty.</p>
        <Link to="/products">Continue Shopping</Link>
      </div>
    );
  }

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div className="container">
      <h2 className="page-title">Your Cart</h2>

      <div className="cart-layout">
        {/* LEFT: ITEMS */}
        <div className="cart-items">
          {cart.map((item, index) => (
            <div key={index} className="cart-card">
              <div className="cart-info">
                <h4>{item.name}</h4>
                <p className="cart-category">{item.category}</p>

                {/* Quantity */}
                <div className="qty-controls">
                  <button onClick={() => updateQuantity(index, -1)}>−</button>
                  <span>{item.qty}</span>
                  <button onClick={() => updateQuantity(index, 1)}>+</button>
                </div>
              </div>

              <div className="cart-actions">
                <span className="cart-price">₹{item.price * item.qty}</span>

                <button
                  className="remove-btn"
                  onClick={() => removeItem(index)}
                >
                  ✕
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* RIGHT: SUMMARY */}
        <div className="cart-summary">
          <h3>Order Summary</h3>

          <div className="summary-row">
            <span>Items</span>
            <span>{cart.length}</span>
          </div>

          <div className="summary-row total">
            <span>Total</span>
            <span>₹{total}</span>
          </div>

          <Link to="/checkout">
            <button className="checkout-btn">Proceed to Checkout</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
