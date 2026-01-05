import { useEffect } from "react";
import "../styles/success.css";

export default function Success() {
  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    console.log(cart);
    if (cart.length > 0) {
      // Generate orderId once
      window.orderId = "ORDER_" + Date.now();
      window.currency = "INR";

      const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

      window.orderTotal = total;

      window.productListItems = cart.map((item) => ({
        SKU: item.id,
        name: item.name,
        quantity: item.qty,
        priceTotal: item.price * item.qty,
        productCategories: [{ categoryName: item.category }],
      }));

      setTimeout(() => {
        window.dispatchEvent(new CustomEvent("purchase"));
      }, 0);
      localStorage.removeItem("cart");
    }
  }, []);

  return (
    <div className="success-box">
      <h2>Order Confirmed 🎉</h2>
      <p>Your order has been placed successfully.</p>
    </div>
  );
}
