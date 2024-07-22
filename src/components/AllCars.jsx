import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { CarCard } from "./CarCard";
import { CarContext } from "../context/CarProvider";

const AllCars = () => {
  const { cars, fetchCars } = useContext(CarContext);

  useEffect(() => {
    fetchCars();
  }, []);
  return (
    <div>
      <h2 className="text-3xl">Cars</h2>
      {cars?.map((car, index) => {
        return <CarCard car={car} index={index} />;
      })}
    </div>
  );
};

export default AllCars;
