import React, { useContext, useEffect, useState } from "react";
import { FilterPane } from "./FilterPane";
import { ListViewIcon } from "../icons/cars-page-icons/ListViewIcon";
import { GridViewIcon } from "../icons/cars-page-icons/GridViewIcon";
import { CarCard } from "./CarCard";
import { CarContext } from "../context/CarProvider";

export const CarsPage = () => {
  const [list, setList] = useState(false);
  const [grid, setGrid] = useState(true);
  const { search, cars, fetchCars } = useContext(CarContext);
  const [displayedCars, setDisplayedCars] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = Math.ceil(cars.length / 2);

  const handleListToggle = () => {
    setList(!list);
    setGrid(!grid);
  };

  const handleGridToggle = () => {
    setGrid(!grid);
    setList(!list);
  };

  useEffect(() => {
    fetchCars();
  }, []);

  useEffect(() => {
    if (search.result && search.result.length > 0) {
      setDisplayedCars(search.result);
    } else {
      setDisplayedCars(cars);
    }
  }, [search.result, cars]);

  const showSearchResults = search.result && search.result.length > 0;

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastCar = currentPage * itemsPerPage;
  const indexOfFirstCar = indexOfLastCar - itemsPerPage;
  const currentCars = displayedCars.slice(indexOfFirstCar, indexOfLastCar);

  const totalPages = Math.ceil(displayedCars.length / itemsPerPage);

  return (
    <div className="flex gap-12 w-max mx-auto py-20">
      <FilterPane />
      <div className="text-white w-[761px]">
        <div className="flex justify-between items-center mb-10">
          <p className="text-3xl">
            {showSearchResults ? `${search.result.length} results` : "All Cars"}
          </p>
          <div className="flex justify-between items-center space-x-9">
            <select className="bg-blue-2 h-9 w-60 px-4 rounded">
              <option>Sort By</option>
            </select>
            <div className="flex items-center space-x-4">
              <button onClick={handleListToggle}>
                <ListViewIcon active={list} />
              </button>
              <button onClick={handleGridToggle}>
                <GridViewIcon active={grid} />
              </button>
            </div>
          </div>
        </div>
        <div>
          <div className={grid ? "grid gap-9 grid-cols-2" : "flex flex-col"}>
            {currentCars.map((car, index) => (
              <CarCard car={car} key={index} list={list} />
            ))}
          </div>
        </div>
        <div className="flex justify-center mt-10">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={`px-3 py-1 mx-1 border border-blue-1 ${
                currentPage === index + 1 ? "bg-blue-500" : "bg-transparent"
              } rounded`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
