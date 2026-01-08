import { Link } from "react-router-dom";
import "../styles/home.css";

export default function Home() {
  return (
    <section className="home-hero" data-target-scope="home-hero">
      <div className="home-overlay"></div>

      <div className="home-content">
        <div>
          <h1>Discover Your Style</h1>
          <p>Premium fashion for modern lifestyles</p>

          <Link to="/products">
            <button className="home-cta">Explore Products</button>
          </Link>
        </div>
      </div>
    </section>
  );
}
