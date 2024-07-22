import React, { useContext, useState, useEffect } from "react";
import {
  Slider,
  TextField,
  Select,
  MenuItem,
  InputAdornment,
  OutlinedInput,
  Checkbox,
  ListItemText,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CarContext } from "../context/CarProvider";

const styles = {
  select: {
    width: "100%",
    backgroundColor: "#1E293B",
    borderRadius: "4px",
    color: "#ffffff",
  },
  menu: {
    backgroundColor: "#1E293B",
    color: "#ffffff",
  },
};

export const HeroFilterSection = () => {
  const [priceRange, setPriceRange] = useState([10000, 150000]);
  const [modelName, setModelName] = useState([]);
  const [brands, setBrands] = useState([]);
  const [models, setModels] = useState([]);
  const { search, setSearch, cars, fetchCars } = useContext(CarContext);
  const [searchKeyword, setSearchKeyword] = useState(search.query || "");
  const navigate = useNavigate();

  useEffect(() => {
    fetchCars();
  }, []);

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

  const handleModelChange = (event) => {
    const { value } = event.target;
    setModelName(typeof value === "string" ? value.split(",") : value);
  };

  const handleSearch = async (e) => {
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
          },
        }
      );
      console.log("Search Results:", response.data);
      setSearch({ query: searchKeyword, result: response.data });
      navigate("/cars");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-3/4 mx-auto bg-primary p-5 border border-blue-1 text-white absolute -bottom-20 left-48 space-y-4">
      <div className="flex justify-between">
        <div className="w-[476px]">
          <TextField
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            variant="outlined"
            placeholder="Search..."
            InputProps={{
              type: "search",
              style: {
                color: "white",
              },
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon className="text-white" />
                </InputAdornment>
              ),
            }}
            style={styles.select}
          />
        </div>
        <div className="w-[234px]">
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
                <ListItemText primary={val} className="capitalize" />
              </MenuItem>
            ))}
          </Select>
        </div>
        <div className="w-[234px]">
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
      </div>
      <div className="flex justify-between items-center">
        <div className="w-[355px]">
          <TextField
            variant="outlined"
            placeholder="Enter location"
            InputProps={{
              style: {
                color: "white",
              },
              startAdornment: (
                <InputAdornment position="start">
                  <LocationOnIcon className="text-white" />
                </InputAdornment>
              ),
            }}
            style={styles.select}
          />
        </div>
        <div className="w-[427px] flex gap-4">
          <p className="text-lg">Price Range</p>
          <div className="w-[264px]">
            <Slider
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              valueLabelDisplay="on"
              min={10000}
              max={150000}
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
        </div>
        <button
          onClick={handleSearch}
          className="bg-blue-1 h-12 w-40 rounded font-semibold"
        >
          Search
        </button>
      </div>
    </div>
  );
};
