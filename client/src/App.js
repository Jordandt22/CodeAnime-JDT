import React from "react";

// React Router
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Components
import Home from "./components/pages/Home/Home";
import NavBar from "./components/layout/Nav/Navbar";
import ErrorAlert from "./components/layout/Alerts/ErrorAlert";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />

        <Routes>
          <Route exact path="/" element={<Home />} />

          {/* Not Found */}
          {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>

        {/* Alerts */}
        <ErrorAlert />
      </BrowserRouter>
    </div>
  );
}

export default App;
