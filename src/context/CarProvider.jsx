import axios from "axios";
import React, { useState } from "react";

export const CarContext = React.createContext();

export const CarProvider = ({ children }) => {
  const [cars, setCars] = useState([]);
  const [specificCar, setSpecificCar] = useState([]);
  const [search, setSearch] = useState({ query: "", result: [] });

  const fetchCars = async () => {
    try {
      const response = await axios.get(
        "https://mern-carweb-server.onrender.com/get-cars"
      );
      setCars(response.data);
      console.log("Cars: ", response.data);
    } catch (error) {
      console.error("There was an error fetching the car data!", error);
    }
  };

  const fetchSpecificCar = async (id) => {
    try {
      const res = await axios.get(
        `https://mern-carweb-server.onrender.com/car/${id}`
      );
      setSpecificCar(res.data.car);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <CarContext.Provider
      value={{
        cars,
        fetchCars,
        search,
        setSearch,
        specificCar,
        fetchSpecificCar,
        setCars,
      }}
    >
      {children}
    </CarContext.Provider>
  );
};
