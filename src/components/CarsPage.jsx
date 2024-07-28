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
  const [showFilters, setShowFilters] = useState(false);
  const [filterButton, setFilterButton] = useState(false);

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
    <div className="flex gap-5 xl:gap-12 w-max mx-auto py-20">
      <div
        className={`lg:hidden absolute top-0 left-0 h-full z-10 bg-secondary transition-transform duration-300 ${
          showFilters ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <FilterPane />
      </div>
      <div className="hidden lg:block">
        <FilterPane />
      </div>
      <div className="text-white xl:w-[761px]">
        <div className="flex justify-between items-center mb-10">
          <p className="text-2xl md:text-3xl">
            {showSearchResults ? `${search.result.length} results` : "All Cars"}
          </p>
          <div className="flex justify-between items-center space-x-5 xl:space-x-9">
            <select className="bg-blue-2 h-9 w-40 md:w-60 px-4 rounded">
              <option>Sort By</option>
            </select>
            <div className="flex items-center space-x-2 xl:space-x-4">
              <button
                className={`border border-[#4DA8DA] w-8 h-8 md:h-9 md:w-9 flex items-center justify-center rounded ${
                  filterButton ? "bg-[#4DA8DA]" : "bg-[#0B0C10]"
                } lg:hidden `}
                onClick={() => {
                  setShowFilters(!showFilters);
                  setFilterButton(!filterButton);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className={`size-6 ${
                    filterButton ? "text-[#0B0C10]" : "text-[#4DA8DA]"
                  }`}
                >
                  <path
                    fillRule="evenodd"
                    d="M3.792 2.938A49.069 49.069 0 0 1 12 2.25c2.797 0 5.54.236 8.209.688a1.857 1.857 0 0 1 1.541 1.836v1.044a3 3 0 0 1-.879 2.121l-6.182 6.182a1.5 1.5 0 0 0-.439 1.061v2.927a3 3 0 0 1-1.658 2.684l-1.757.878A.75.75 0 0 1 9.75 21v-5.818a1.5 1.5 0 0 0-.44-1.06L3.13 7.938a3 3 0 0 1-.879-2.121V4.774c0-.897.64-1.683 1.542-1.836Z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              <button className="hidden md:block" onClick={handleListToggle}>
                <ListViewIcon active={list} />
              </button>
              <button className="hidden md:block" onClick={handleGridToggle}>
                <GridViewIcon active={grid} />
              </button>
            </div>
          </div>
        </div>
        <div>
          <div
            className={
              grid ? "md:grid gap-4 xl:gap-9 grid-cols-2" : "flex flex-col"
            }
          >
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
