import React from "react";
import { CalenderIcon } from "../icons/card-icons/CalenderIcon";
import { WheelIcon } from "../icons/card-icons/WheelIcon";
import { FuelIcon } from "../icons/card-icons/FuelIcon";
import { SellerIcon } from "../icons/card-icons/SellerIcon";
import { Link } from "react-router-dom";
import { StarsIcon } from "../icons/cars-page-icons/StarsIcon";

export const CarCard = ({
  car,
  index,
  showEditButtons,
  handleDelete,
  handleEdit,
  list,
}) => {
  return (
    <>
      <div
        key={index}
        className={`${list ? "w-full" : "w-[362px]"}  ${
          showEditButtons || list ? "h-fit" : "h-[471px]"
        }  border border-[#12232E] p-4 text-white mb-5 rounded`}
      >
        <div className={`${list ? "flex items-center justify-between" : null}`}>
          <Link to={`/car/${car._id}`}>
            <img
              className={`h-[189px] ${
                list ? "w-[322px]" : "w-full"
              }  rounded mb-3`}
              src={`https://mern-carweb-server.onrender.com/images/${car.images[0]}`}
            />
          </Link>
          <p className="text-xl font-semibold capitalize">{car.carName}</p>
          {showEditButtons ? (
            <div className="space-x-5 mt-2">
              <button
                onClick={() => handleEdit(car)}
                className="bg-blue-1 rounded py-1 px-3"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(car._id)}
                className="bg-red-500 rounded py-1 px-3"
              >
                Delete
              </button>
            </div>
          ) : (
            <>
              <div className="mt-7 space-y-3">
                <p className="text-2xl text-blue-1 font-bold">${car.price}</p>
                <p>Florida, USA</p>
                <div className="border-b border-[#989898] grid grid-cols-3 gap-y-4 pb-3">
                  <p className="flex items-center gap-1">
                    <CalenderIcon />
                    {car.year}
                  </p>
                  <p className="flex items-center gap-1 col-span-2">
                    <WheelIcon />
                    {car.driveTrain}
                  </p>
                  <p className="flex items-center gap-1">
                    <FuelIcon />
                    {car.fuelType}
                  </p>
                  <p className="flex items-center gap-1 col-span-2">
                    <SellerIcon />
                    View seller details
                  </p>
                </div>
              </div>
              <div className={`${list ? "hidden" : "flex"} items-center gap-2`}>
                <StarsIcon />
                <p className="font-bold py-1">12 reviews</p>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};
