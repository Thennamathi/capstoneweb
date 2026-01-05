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
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];

    if (storedCart.length > 0) {
      const total = storedCart.reduce(
        (sum, item) => sum + item.price * item.qty,
        0
      );

      // 🔑 EXPOSE TO WINDOW (CRITICAL)
      window.cartId = "CART_" + Date.now();
      window.currency = "INR";
      window.cartTotal = total;
      window.productListItems = storedCart.map((item) => ({
        SKU: item.id,
        name: item.name,
        quantity: item.qty,
        priceTotal: item.price * item.qty,
        productCategories: [{ categoryName: item.category }],
      }));

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
