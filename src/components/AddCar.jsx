import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddCar = ({ car, setEditingCar }) => {
  const [carData, setCarData] = useState({
    carName: "",
    brand: "",
    model: "",
    price: "",
    description: "",
    condition: "Good",
    year: "",
    bodyType: "Sedan",
    seats: "",
    exteriorColor: "",
    fuelType: "Petrol",
    mileage: "",
    transmission: "Automatic",
    driveTrain: "Rear-wheel",
    power: "",
    length: "",
    width: "",
    height: "",
    cargoVolume: "",
    batteryCapacity: "",
    chargingTime: "",
    chargeSpeed: "",
    chargePort: "",
    tankCapacity: "",
    images: [],
    video: null,
    features: [],
  });
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCarData({
      ...carData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    if (e.target.name === "images") {
      setCarData({ ...carData, images: Array.from(e.target.files) });
    } else {
      setCarData({ ...carData, [e.target.name]: e.target.files[0] });
    }
  };

  const handleFeatureChange = (index, event) => {
    const newFeatures = carData.features.slice();
    newFeatures[index] = event.target.value;
    setCarData({ ...carData, features: newFeatures });
  };

  const addFeature = () => {
    setCarData({ ...carData, features: [...carData.features, ""] });
  };

  const removeFeature = (index) => {
    const newFeatures = carData.features.slice();
    newFeatures.splice(index, 1);
    setCarData({ ...carData, features: newFeatures });
  };

  useEffect(() => {
    if (car) {
      setCarData({
        carName: car.carName || "",
        brand: car.brand || "",
        model: car.model || "",
        price: car.price || "",
        description: car.description || "",
        condition: car.condition || "Good",
        year: car.year || "",
        bodyType: car.bodyType || "Sedan",
        seats: car.seats || "",
        exteriorColor: car.exteriorColor || "",
        fuelType: car.fuelType || "Petrol",
        mileage: car.mileage || "",
        transmission: car.transmission || "Automatic",
        driveTrain: car.driveTrain || "Rear-wheel",
        power: car.power || "",
        length: car.length || "",
        width: car.width || "",
        height: car.height || "",
        cargoVolume: car.cargoVolume || "",
        batteryCapacity: car.batteryCapacity || "",
        chargingTime: car.chargingTime || "",
        chargeSpeed: car.chargeSpeed || "",
        chargePort: car.chargePort || "",
        tankCapacity: car.tankCapacity || "",
        images: car.images || [],
        video: car.video || null,
        features: car.features || [],
      });
    }
  }, [car]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      console.log("Updating car with data:", carData);
      for (let key in carData) {
        if (key === "images") {
          carData[key].forEach((file) => {
            formData.append("images", file);
          });
        } else if (key === "features") {
          formData.append("features", JSON.stringify(carData.features));
        } else {
          formData.append(key, carData[key]);
        }
      }
      const response = await axios.put(
        `https://mern-carweb-server.onrender.com/edit-car/${car._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setEditingCar(null);
      console.log("Car updated successfully:", response.data);
      console.log("FormData:", formData);
    } catch (error) {
      console.error("There was an error updating the car!", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (let key in carData) {
      if (key === "images") {
        carData[key].forEach((file) => {
          formData.append("images", file);
        });
      } else if (key === "features") {
        formData.append("features", JSON.stringify(carData.features));
      } else {
        formData.append(key, carData[key]);
      }
    }

    try {
      await axios.post(
        "https://mern-carweb-server.onrender.com/add-car",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert("Car added successfully!");
    } catch (error) {
      console.error("There was an error adding the car!", error);
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl text-center font-semibold">
        {car ? "Edit Car" : "Add Car"}
      </h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block">Car Name</label>
          <input
            className="py-3 px-4 text-lg bg-blue-2 rounded w-full"
            name="carName"
            onChange={handleChange}
            value={carData.carName}
            required
          />
        </div>
        <div>
          <label className="block">Brand</label>
          <input
            className="py-3 px-4 text-lg bg-blue-2 rounded w-full"
            name="brand"
            onChange={handleChange}
            value={carData.brand}
            required
          />
        </div>
        <div>
          <label className="block">Model</label>
          <input
            className="py-3 px-4 text-lg bg-blue-2 rounded w-full"
            name="model"
            onChange={handleChange}
            value={carData.model}
            required
          />
        </div>
        <div>
          <label className="block">Price</label>
          <input
            className="py-3 px-4 text-lg bg-blue-2 rounded w-full"
            type="number"
            name="price"
            onChange={handleChange}
            value={carData.price}
            required
          />
        </div>
        <div>
          <label className="block">Description</label>
          <input
            className="py-3 px-4 text-lg bg-blue-2 rounded w-full"
            name="description"
            onChange={handleChange}
            value={carData.description}
            required
          />
        </div>
        <div>
          <label className="block">Condition</label>
          <select
            name="condition"
            onChange={handleChange}
            value={carData.condition}
            className="py-3 px-4 text-lg bg-blue-2 rounded w-full"
            required
          >
            <option value="Good">Good</option>
            <option value="Average">Average</option>
          </select>
        </div>
        <div>
          <label className="block">Year</label>
          <input
            className="py-3 px-4 text-lg bg-blue-2 rounded w-full"
            type="number"
            name="year"
            onChange={handleChange}
            value={carData.year}
            required
          />
        </div>
        <div>
          <label className="block">Body Type</label>
          <select
            name="bodyType"
            onChange={handleChange}
            value={carData.bodyType}
            className="py-3 px-4 text-lg bg-blue-2 rounded w-full"
            required
          >
            <option value="Sedan">Sedan</option>
            <option value="SUV">SUV</option>
            <option value="Hatchback">Hatchback</option>
            <option value="Truck">Truck</option>
          </select>
        </div>
        <div>
          <label className="block">Seats</label>
          <input
            className="py-3 px-4 text-lg bg-blue-2 rounded w-full"
            name="seats"
            onChange={handleChange}
            value={carData.seats}
            required
          />
        </div>
        <div>
          <label className="block">Exterior Color</label>
          <input
            className="py-3 px-4 text-lg bg-blue-2 rounded w-full"
            name="exteriorColor"
            onChange={handleChange}
            value={carData.exteriorColor}
            required
          />
        </div>
        <div>
          <label className="block">Fuel Type</label>
          <select
            name="fuelType"
            onChange={handleChange}
            value={carData.fuelType}
            className="py-3 px-4 text-lg bg-blue-2 rounded w-full"
            required
          >
            <option value="Petrol">Petrol</option>
            <option value="Diesel">Diesel</option>
            <option value="Electric">Electric</option>
            <option value="Hybrid">Hybrid</option>
          </select>
        </div>
        <div>
          <label className="block">Mileage</label>
          <input
            className="py-3 px-4 text-lg bg-blue-2 rounded w-full"
            name="mileage"
            onChange={handleChange}
            value={carData.mileage}
          />
        </div>
        <div>
          <label className="block">Transmission</label>
          <select
            name="transmission"
            onChange={handleChange}
            value={carData.transmission}
            className="py-3 px-4 text-lg bg-blue-2 rounded w-full"
            required
          >
            <option value="Automatic">Automatic</option>
            <option value="Manual">Manual</option>
          </select>
        </div>
        <div>
          <label className="block">Drive Train</label>
          <select
            name="driveTrain"
            onChange={handleChange}
            value={carData.driveTrain}
            className="py-3 px-4 text-lg bg-blue-2 rounded w-full"
            required
          >
            <option value="Rear-wheel">Rear-wheel</option>
            <option value="Front-wheel">Front-wheel</option>
            <option value="All-wheel">All-wheel</option>
          </select>
        </div>
        <div>
          <label className="block">Power</label>
          <input
            className="py-3 px-4 text-lg bg-blue-2 rounded w-full"
            name="power"
            onChange={handleChange}
            value={carData.power}
            required
          />
        </div>
        <div>
          <label className="block">Length</label>
          <input
            className="py-3 px-4 text-lg bg-blue-2 rounded w-full"
            type="number"
            name="length"
            onChange={handleChange}
            value={carData.length}
            required
          />
        </div>
        <div>
          <label className="block">Width</label>
          <input
            className="py-3 px-4 text-lg bg-blue-2 rounded w-full"
            type="number"
            name="width"
            onChange={handleChange}
            value={carData.width}
            required
          />
        </div>
        <div>
          <label className="block">Height</label>
          <input
            className="py-3 px-4 text-lg bg-blue-2 rounded w-full"
            type="number"
            name="height"
            onChange={handleChange}
            value={carData.height}
            required
          />
        </div>
        <div>
          <label className="block">Cargo Volume</label>
          <input
            className="py-3 px-4 text-lg bg-blue-2 rounded w-full"
            type="number"
            name="cargoVolume"
            onChange={handleChange}
            value={carData.cargoVolume}
          />
        </div>

        {carData.fuelType === "Electric" ? (
          <>
            <div>
              <label className="block">Battery Capacity</label>
              <input
                className="py-3 px-4 text-lg bg-blue-2 rounded w-full"
                type="number"
                name="batteryCapacity"
                onChange={handleChange}
                value={carData.batteryCapacity}
                required
              />
            </div>
            <div>
              <label className="block">Charging Time</label>
              <input
                className="py-3 px-4 text-lg bg-blue-2 rounded w-full"
                type="number"
                name="chargingTime"
                onChange={handleChange}
                value={carData.chargingTime}
                required
              />
            </div>
            <div>
              <label className="block">Charging Speed</label>
              <input
                className="py-3 px-4 text-lg bg-blue-2 rounded w-full"
                type="number"
                name="chargeSpeed"
                onChange={handleChange}
                value={carData.chargeSpeed}
                required
              />
            </div>
            <div>
              <label className="block">Charging Port</label>
              <input
                className="py-3 px-4 text-lg bg-blue-2 rounded w-full"
                type="number"
                name="chargePort"
                onChange={handleChange}
                value={carData.chargePort}
                required
              />
            </div>
          </>
        ) : (
          <div>
            <label className="block">Tank Capacity</label>
            <input
              className="py-3 px-4 text-lg bg-blue-2 rounded w-full"
              type="number"
              name="tankCapacity"
              onChange={handleChange}
              value={carData.tankCapacity}
              required
            />
          </div>
        )}
      </div>

      {/* Media */}
      <h2 className="text-xl font-semibold">Media</h2>
      <div className="space-y-4">
        <div>
          <label className="block">Images</label>
          <input
            className="py-3 px-4 text-lg bg-blue-2 rounded w-full"
            type="file"
            name="images"
            onChange={handleFileChange}
            multiple
            ref={fileInputRef}
          />
        </div>
        <div>
          <label className="block">Video</label>
          <input
            className="py-3 px-4 text-lg bg-blue-2 rounded w-full"
            type="file"
            name="video"
            onChange={handleFileChange}
            ref={fileInputRef}
          />
        </div>
      </div>

      {/* Features */}
      <h2 className="text-xl font-semibold">Features</h2>
      <div className="space-y-4">
        {carData.features.map((feature, index) => (
          <div key={index} className="flex items-center space-x-4">
            <input
              type="text"
              value={feature}
              onChange={(e) => handleFeatureChange(index, e)}
              className="py-3 px-4 text-lg bg-blue-2 rounded w-full"
            />
            <button
              type="button"
              onClick={() => removeFeature(index)}
              className="py-2 px-4 bg-red-500 text-white rounded"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addFeature}
          className="py-2 px-4 bg-green-500 text-white rounded"
        >
          Add Feature
        </button>
      </div>

      {/* Submit Button */}
      <div className="mt-6">
        <button
          onClick={car ? handleUpdate : handleSubmit}
          type="submit"
          className="py-3 px-6 bg-blue-500 text-white text-lg rounded"
        >
          {car ? "Update Car" : "Add Car"}
        </button>
      </div>
    </div>
  );
};

export default AddCar;
