import React, { useContext, useEffect, useState } from "react";
import { CarContext } from "../context/CarProvider";
import {
  Slider,
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
  OutlinedInput,
  TextField,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";

const styles = {
  select: {
    width: "100%",
    backgroundColor: "#1E293B",
    // padding: "12px 16px",
    borderRadius: "4px",
    color: "#ffffff",
  },
  menu: {
    backgroundColor: "#1E293B",
    color: "#ffffff",
  },
};

export const FilterPane = () => {
  const [priceRange, setPriceRange] = useState([10000, 150000]);
  const { cars, fetchCars, setSearch, search } = useContext(CarContext);
  const [models, setModels] = useState([]);
  const [modelName, setModelName] = useState([]);
  const [brands, setBrands] = useState([]);
  const [year, setYear] = useState([]);
  const [bodyType, setBodyType] = useState("");
  const [transmission, setTransmission] = useState("");
  const [fuelType, setFuelType] = useState("");
  const [driveTrain, setDriveTrain] = useState("");
  const [seats, setSeats] = useState("");
  const [exteriorColor, setExteriorColor] = useState("");
  const [searchKeyword, setSearchKeyword] = useState(search.query || "");

  useEffect(() => {
    if (brands.length > 0) {
      const fetchModels = async () => {
        try {
          const response = await axios.get(
            "https://mern-carweb-server.onrender.com/models",
            {
              params: {
                brands: brands.join(","),
              },
            }
          );
          setModels(response.data);
          console.log("Fetched Models:", response.data);
        } catch (error) {
          console.log(error);
        }
      };
      fetchModels();
    } else {
      setModels([]);
    }
  }, [brands]);

  const handleBrandChange = (event) => {
    const { value } = event.target;
    setBrands(typeof value === "string" ? value.split(",") : value);
  };

  const handleYearChange = (event) => {
    const { value } = event.target;
    setYear(typeof value === "string" ? value.split(",") : value);
  };

  const handleModelChange = (event) => {
    const { value } = event.target;
    setModelName(typeof value === "string" ? value.split(",") : value);
  };

  const handleApplyFilters = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        "https://mern-carweb-server.onrender.com/search",
        {
          params: {
            keyword: searchKeyword,
            brand: brands,
            model: modelName,
            minPrice: priceRange[0],
            maxPrice: priceRange[1],
            year: year,
            bodyType: bodyType,
            transmission: transmission,
            fuelType: fuelType,
            driveTrain: driveTrain,
            seats: seats,
            exteriorColor: exteriorColor,
          },
        }
      );
      console.log("Search Results:", response.data);
      setSearch({ query: searchKeyword, result: response.data });
    } catch (error) {
      console.log(error);
    }
  };

  const handleResetFilters = () => {
    fetchCars();
    setSearch({ query: "", result: [] });
    setPriceRange([10000, 150000]);
    setBrands([]);
    setModels([]);
    setYear([]);
    setBodyType("");
    setTransmission("");
    setFuelType("");
    setDriveTrain("");
    setSeats("");
    setExteriorColor("");
  };

  return (
    <>
      <div className="xl:w-96 h-fit bg-primary rounded p-4 text-white">
        <div className="mb-5 border-b text-xl p-2">Filter</div>
        <div className="space-y-4">
          <div>
            <TextField
              placeholder="Search"
              variant="outlined"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon className="text-white" />
                  </InputAdornment>
                ),
                style: {
                  backgroundColor: "#1E293B",
                  borderRadius: "8px",
                  color: "white",
                  // padding: "12px 16px",
                },
              }}
              fullWidth
            />
          </div>
          <div>
            <Select
              multiple
              displayEmpty
              value={year}
              onChange={handleYearChange}
              input={<OutlinedInput />}
              renderValue={(selected) =>
                selected.length === 0 ? "Year" : selected.join(", ")
              }
              MenuProps={{
                PaperProps: {
                  style: styles.menu,
                },
              }}
              style={styles.select}
            >
              {Array.from(new Set(cars.map((car) => car.year)))
                .sort()
                .map((val) => (
                  <MenuItem key={val} value={val}>
                    <Checkbox checked={year.indexOf(val) > -1} />
                    <ListItemText primary={val} />
                  </MenuItem>
                ))}
            </Select>
          </div>
          <div>
            <Select
              multiple
              displayEmpty
              value={brands}
              onChange={handleBrandChange}
              input={<OutlinedInput />}
              renderValue={(selected) =>
                selected.length === 0 ? "Brand" : selected.join(", ")
              }
              MenuProps={{
                PaperProps: {
                  style: styles.menu,
                },
              }}
              style={styles.select}
            >
              {Array.from(new Set(cars.map((car) => car.brand))).map((val) => (
                <MenuItem key={val} value={val}>
                  <Checkbox checked={brands.indexOf(val) > -1} />
                  <ListItemText primary={val} />
                </MenuItem>
              ))}
            </Select>
          </div>
          <div>
            <Select
              multiple
              displayEmpty
              value={modelName}
              onChange={handleModelChange}
              input={<OutlinedInput />}
              renderValue={(selected) =>
                selected.length === 0 ? "Model" : selected.join(", ")
              }
              MenuProps={{
                PaperProps: {
                  style: styles.menu,
                },
              }}
              style={styles.select}
            >
              {models.map((val) => (
                <MenuItem key={val} value={val}>
                  <Checkbox checked={modelName.indexOf(val) > -1} />
                  <ListItemText primary={val} />
                </MenuItem>
              ))}
            </Select>
          </div>
          <div>
            <Select
              value={bodyType}
              onChange={(e) => setBodyType(e.target.value)}
              displayEmpty
              input={<OutlinedInput />}
              renderValue={(selected) =>
                selected.length === 0 ? "Body Type" : selected
              }
              MenuProps={{
                PaperProps: {
                  style: styles.menu,
                },
              }}
              style={styles.select}
            >
              <MenuItem value="">
                <em>Body Type</em>
              </MenuItem>
              {Array.from(new Set(cars.map((car) => car.bodyType))).map(
                (val) => (
                  <MenuItem key={val} value={val}>
                    {val}
                  </MenuItem>
                )
              )}
            </Select>
          </div>
          <div>
            <Select
              value={transmission}
              onChange={(e) => setTransmission(e.target.value)}
              displayEmpty
              input={<OutlinedInput />}
              renderValue={(selected) =>
                selected.length === 0 ? "Transmission" : selected
              }
              MenuProps={{
                PaperProps: {
                  style: styles.menu,
                },
              }}
              style={styles.select}
            >
              <MenuItem value="">
                <em>Transmission</em>
              </MenuItem>
              {Array.from(new Set(cars.map((car) => car.transmission))).map(
                (val) => (
                  <MenuItem key={val} value={val}>
                    {val}
                  </MenuItem>
                )
              )}
            </Select>
          </div>
          <div>
            <Select
              value={fuelType}
              onChange={(e) => setFuelType(e.target.value)}
              displayEmpty
              input={<OutlinedInput />}
              renderValue={(selected) =>
                selected.length === 0 ? "Fuel Type" : selected
              }
              MenuProps={{
                PaperProps: {
                  style: styles.menu,
                },
              }}
              style={styles.select}
            >
              <MenuItem value="">
                <em>Fuel Type</em>
              </MenuItem>
              {Array.from(new Set(cars.map((car) => car.fuelType))).map(
                (val) => (
                  <MenuItem key={val} value={val}>
                    {val}
                  </MenuItem>
                )
              )}
            </Select>
          </div>
          <div>
            <Select
              value={driveTrain}
              onChange={(e) => setDriveTrain(e.target.value)}
              displayEmpty
              input={<OutlinedInput />}
              renderValue={(selected) =>
                selected.length === 0 ? "Drivetrain" : selected
              }
              MenuProps={{
                PaperProps: {
                  style: styles.menu,
                },
              }}
              style={styles.select}
            >
              <MenuItem value="">
                <em>Drivetrain</em>
              </MenuItem>
              {Array.from(new Set(cars.map((car) => car.driveTrain))).map(
                (val) => (
                  <MenuItem key={val} value={val}>
                    {val}
                  </MenuItem>
                )
              )}
            </Select>
          </div>
          <div>
            <Select
              value={seats}
              onChange={(e) => setSeats(e.target.value)}
              displayEmpty
              input={<OutlinedInput />}
              renderValue={(selected) =>
                selected.length === 0 ? "Seats" : selected
              }
              MenuProps={{
                PaperProps: {
                  style: styles.menu,
                },
              }}
              style={styles.select}
            >
              <MenuItem value="">
                <em>Seats</em>
              </MenuItem>
              {Array.from(new Set(cars.map((car) => car.seats))).map((val) => (
                <MenuItem key={val} value={val}>
                  {val}
                </MenuItem>
              ))}
            </Select>
          </div>
          <div className="">
            <Select
              value={exteriorColor}
              onChange={(e) => setExteriorColor(e.target.value)}
              displayEmpty
              input={<OutlinedInput />}
              renderValue={(selected) =>
                selected.length === 0 ? "Exterior Color" : selected
              }
              MenuProps={{
                PaperProps: {
                  style: styles.menu,
                },
              }}
              style={styles.select}
            >
              <MenuItem value="">
                <em>Exterior Color</em>
              </MenuItem>
              {Array.from(new Set(cars.map((car) => car.exteriorColor))).map(
                (val) => (
                  <MenuItem key={val} value={val}>
                    {val}
                  </MenuItem>
                )
              )}
            </Select>
          </div>
          <div className="px-3 pt-6">
            <Slider
              getAriaLabel={() => "Price range"}
              value={priceRange}
              min={10000}
              max={150000}
              step={5000}
              onChange={(event, newValue) => {
                setPriceRange(newValue);
              }}
              valueLabelDisplay="on"
              getAriaValueText={(value) => `$${value}`}
              sx={{
                "& .MuiSlider-thumb": {
                  color: "#4DA8DA",
                },
                "& .MuiSlider-track": {
                  color: "#4DA8DA",
                },
                "& .MuiSlider-rail": {
                  color: "#152836",
                },
                "& .MuiSlider-valueLabel": {
                  backgroundColor: "transparent",
                  color: "#007CC7",
                },
              }}
            />
          </div>
          <div className="space-y-4">
            <button
              className="bg-blue-1 w-full text-white px-4 py-3 rounded"
              onClick={handleApplyFilters}
            >
              Apply Filters
            </button>
            <button
              className="w-full border border-blue-1 text-blue-1 px-4 py-3 rounded"
              onClick={handleResetFilters}
            >
              Reset Filters
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
