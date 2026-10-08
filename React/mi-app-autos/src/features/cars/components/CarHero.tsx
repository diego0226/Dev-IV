import type { Car } from "../types/Cars";
import "./CarHero.css";

interface CarHeroProps {
  car: Car;
}

const CarHero = ({car}:CarHeroProps) => {
  return (
    <div className="car-hero">
      <img src={car.image} alt={`Ilustración de ${car.name}`} />
    </div>
  );
};

export default CarHero;
