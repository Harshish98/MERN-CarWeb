import { Route, Routes } from "react-router-dom";
import "./App.css";
import AddCar from "./components/AddCar";
import AllCars from "./components/AllCars";
import { CarCard } from "./components/CarCard";
import CarCarousel from "./components/CarCarousel";
import { CarDetails } from "./components/CarDetails";
import { CarsPage } from "./components/CarsPage";
import { Footer } from "./components/Footer";
import { HeroSection } from "./components/HeroSection";
import { Navbar } from "./components/Navbar";
import { Home } from "./pages/home/Home";
import { Admin } from "./pages/admin/Admin";
import { AuthForm } from "./pages/form/AuthForm";
import { ProtectedRoute } from "./components/ProtectedRoute";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cars" element={<CarsPage />} />
        <Route path="/car/:id" element={<CarDetails />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute roleRequired="admin">
              <Admin />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<AuthForm page="login" />} />
        <Route path="/signup" element={<AuthForm page="signup" />} />
        <Route
          path="/forgot-password"
          element={<AuthForm page="forgot-password" />}
        />
        <Route
          path="/reset-password"
          element={<AuthForm page="reset-password" />}
        />
        <Route />
      </Routes>
      {/* <AddCar/> */}
      {/* <AllCars/> */}
      {/* <CarCard/> */}
      {/* <Navbar/> */}
      {/* <HeroSection/> */}
      {/* <CarsPage/> */}
      {/* <CarDetails/> */}
      {/* <CarCarousel/> */}
      <Footer />
    </>
  );
}

export default App;
