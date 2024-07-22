import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { CarProvider } from "./context/CarProvider.jsx";
import { TokenProvider } from "./context/TokenProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <TokenProvider>
      <CarProvider>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </CarProvider>
    </TokenProvider>
  </BrowserRouter>
);
