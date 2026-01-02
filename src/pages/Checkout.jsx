import { useNavigate } from "react-router-dom";
import "../styles/checkout.css";

export default function Checkout() {
  const navigate = useNavigate();

  const placeOrder = () => {
    localStorage.removeItem("cart");
    navigate("/success");
  };

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
