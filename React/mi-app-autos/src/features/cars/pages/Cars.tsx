import CardCarList from "../components/CardCarList";
import "./Cars.css";
import cars from "../../../../public/data/cars.json";
import { useState } from "react";
import SearchBar from "../../shared/components/SearchBar";
import Pagination from "../../shared/components/Pagination";

const Cars = () => {
  const [search, setSearch] = useState("");
  const handleSearchChange = (value: string) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const filteredCars = cars.filter((car) =>
    car.name.toLowerCase().includes(search.toLowerCase()),
  );

  const [currentPage, setCurrentPage] = useState(1);
  const carsPerPage = 6;
  const indexOfLastCar = currentPage * carsPerPage;
  const indexOfFirstCar = indexOfLastCar - carsPerPage;
  const currentCars = filteredCars.slice(indexOfFirstCar, indexOfLastCar);
  const totalPages = Math.ceil(filteredCars.length / carsPerPage);

  return (
    <section className="container cars-page">
      <header className="cars-page__header">
        <div>
          <p className="eyebrow">Catálogo</p>
          <h1>Todos los autos</h1>
        </div>
        <SearchBar search={search} onSearchChange={handleSearchChange} />
      </header>

      <p className="cars-page__count">
        {filteredCars.length} {filteredCars.length === 1 ? "auto" : "autos"}
      </p>

      {filteredCars.length > 0 ? (
        <>
          <CardCarList cars={currentCars} />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPrevious={() => setCurrentPage((page) => Math.max(1, page - 1))}
            onNext={() =>
              setCurrentPage((page) =>
                Math.max(1, Math.min(totalPages, page + 1)),
              )
            }
          />
        </>
      ) : (
        <p className="cars-page__empty" role="status">
          No encontramos autos con ese nombre. Prueba con otra búsqueda.
        </p>
      )}
    </section>
  );
};

export default Cars;
