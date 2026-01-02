import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  return (
    <div className="product-card">
      {/* Image */}
      <div className="product-image-wrapper">
        <img src={product.image} alt={product.name} />
      </div>

      {/* Content */}
      <div className="product-info">
        <h4 className="product-name">{product.name}</h4>
        <p className="product-price">₹{product.price}</p>

        <Link to={`/product/${product.id}`}>
          <button className="view-btn">View Details</button>
        </Link>
      </div>
    </div>
  );
}
