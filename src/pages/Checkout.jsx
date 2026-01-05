import { useNavigate } from "react-router-dom";
import "../styles/checkout.css";
import { useEffect } from "react";

export default function Checkout() {
  const navigate = useNavigate();

  const placeOrder = () => {
    localStorage.removeItem("cart");
    navigate("/success");
  };

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (cart.length > 0) {
      setTimeout(() => {
        window.dispatchEvent(new CustomEvent("checkoutBegin"));
      }, 0);
    }
  }, []);

  return (
    <div className="container">
      <h2 className="page-title">Checkout</h2>

      <div className="checkout-box">
        <p>Please confirm your order.</p>

        <button className="checkout-cta" onClick={placeOrder}>
          Place Order
        </button>
      </div>
    </div>
  );
}
