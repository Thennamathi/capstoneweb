import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "../styles/header.css";

export default function Header() {
  const navigate = useNavigate();
  const [cartCount, setCartCount] = useState(0);

  const updateCartCount = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartCount(cart.length);
  };

  useEffect(() => {
    updateCartCount();
    window.addEventListener("cartUpdated", updateCartCount);
    return () => window.removeEventListener("cartUpdated", updateCartCount);
  }, []);

  // ✅ LOGIN — IDENTITY STITCHING ONLY
  const login = () => {
    const crmId = "CUST_10001"; // simulate CRM login

    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("customerId", crmId);

    // 🔥 CRITICAL: Send CRMID to AEP for identity stitching
    if (window.alloy) {
      window.alloy("sendEvent", {
        xdm: {
          identityMap: {
            crmid: [
              {
                id: crmId,
                primary: true,
              },
            ],
          },
        },
      });
    }

    alert("Logged in");
  };

  const logout = () => {
    localStorage.clear();
    updateCartCount();
    alert("Logged out");
  };

  return (
    <header className="site-header">
      {/* Left: Brand */}
      <div className="header-brand">
        <Link to="/">FashionStore</Link>
      </div>

      {/* Center: Navigation */}
      <nav className="header-nav">
        <Link to="/products">Products</Link>
      </nav>

      {/* Right: Actions */}
      <div className="header-actions">
        <button className="cart-btn" onClick={() => navigate("/cart")}>
          Cart <span>({cartCount})</span>
        </button>

        <button className="secondary-btn" onClick={login}>
          Login
        </button>

        <button className="secondary-btn" onClick={logout}>
          Logout
        </button>
      </div>
    </header>
  );
}
