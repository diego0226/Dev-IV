import { Link } from "react-router-dom";
import "./NotFound.css";

const NotFound = () => {
  return (
    <section className="not-found" aria-labelledby="not-found-title">
      <span aria-hidden="true">404</span>

      <p>Error 404 · Fuera de ruta</p>

      <h1 id="not-found-title">Esta página no existe</h1>

      <p>
        La dirección puede haber cambiado o estar escrita incorrectamente.
        Retoma el camino y descubre tu próximo auto.
      </p>

      <div className="not-found__actions">
        <Link to="/">Volver al inicio</Link>

        <Link to="/cars">
          Explorar colección <span aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  );
};

export default NotFound;
