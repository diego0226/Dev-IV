import { Link } from "react-router-dom";
import type { Car } from "../types/Cars";
import "./CardCar.css";

interface CardCarProps {
  car: Car;
}

const CardCar = ({car}:CardCarProps) => {
  return (
    <article className="car-card">
      <div className="car-card__media">
        <img src={car.image} alt={`Ilustración de ${car.name}`} />

        <span>{car.type}</span>
        <span aria-hidden="true">♡</span>
      </div>

      <div className="car-card__content">
        <p>{car.location}</p>
        <h3>{car.name}</h3>

        <div className="car-card__specs">
          <span>{car.year}</span>

          <span>{car.mileage.toLocaleString("es-CR")} km</span>

          <span>{car.seats} pasajeros</span>
        </div>

        <div className="car-card__footer">
          <strong>USD {car.price.toLocaleString("es-CR")}</strong>

          <Link to={`/cars/${car.id}`}>Ver detalle →</Link>
        </div>
      </div>
    </article>
  );
};

export default CardCar;
