import CardCar from "./CardCar";
import type { Car } from "../types/Cars";
import "./CardCarList.css";

interface CardListProps {
  cars: Car[];
}

const CardCarList = ({cars}:CardListProps) => {
  return (
    <div className="car-card-list">
      {cars.map((car) => (
        <CardCar key={car.id} car={car} />
      ))}
    </div>
  );
};

export default CardCarList;
