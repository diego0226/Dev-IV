import { Link } from "react-router-dom";
import "./Hero.css";

const Hero = () => {
  return (
    <div className="hero">
      <section className="hero__surface">
        <div className="container hero__content">
          <p>Diego Motors · Costa Rica</p>

          <h1>El auto que mueve sus planes</h1>

          <p>
            Una colección de vehículos para explorar a su ritmo, comparar
            características y elegir su favorito.
          </p>

          <div className="hero__actions">
            <Link to="/cars">Explorar autos</Link>

            <Link to="/contact">Hablar con un asesor</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;
