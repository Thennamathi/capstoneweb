import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { products } from "../data/products";
import "../styles/pdp.css";

export default function Product() {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);

  useEffect(() => {
    if (product && window.alloy) {
      // Analytics globals (fine to keep)
      window.productName = product.name;
      window.productSku = product.id;
      window.productPrice = product.price;
      window.productCategory = product.category;

      // Optional analytics event
      window.dispatchEvent(new CustomEvent("productView"));

      // ✅ ONLY page view — no Target personalization here
      window.alloy("sendEvent", {
        xdm: {
          eventType: "web.webPageDetails.pageViews",
          web: {
            webPageDetails: {
              name: "Product Detail",
              URL: window.location.href,
            },
          },
        },
      });
    }
  }, [product]);

  if (!product) return <p>Product not found</p>;

  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push({ ...product, qty: 1 });
    localStorage.setItem("cart", JSON.stringify(cart));
    window.dispatchEvent(new Event("cartUpdated"));
    alert("Added to cart");
  };

  return (
    <div className="container pdp-layout page-b" data-page="page-b">
      <div className="pdp-image">
        <img src={product.image} alt={product.name} />
      </div>

      <div className="pdp-details">
        <h2>{product.name}</h2>
        <p>{product.category}</p>
        <p className="price">₹{product.price}</p>

        <button onClick={addToCart}>Add to Cart</button>
      </div>
    </div>
  );
}
