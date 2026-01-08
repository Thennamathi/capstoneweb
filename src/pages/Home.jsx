import { Link } from "react-router-dom";
import "../styles/home.css";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    window.alloy("sendEvent", {
      xdm: {
        eventType: "web.webPageDetails.pageViews",
        web: {
          webPageDetails: {
            name: "Home",
            URL: window.location.href,
          },
        },
      },
      renderDecisions: true,
      decisionScopes: ["home-hero"],
    });
  }, []);
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
