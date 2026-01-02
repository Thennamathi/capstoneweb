import { products } from "../data/products";
import ProductCard from "../components/ProductCard";
import "../styles/products.css";

export default function Products() {
  return (
    <div className="container">
      <h2 className="page-title">All Products</h2>

      <div className="product-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
