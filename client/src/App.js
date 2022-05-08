import React from "react";

// React Router
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Components
import Home from "./components/pages/Home/Home";
import NavBar from "./components/layout/Nav/Navbar";
import ErrorAlert from "./components/layout/Alerts/ErrorAlert";
import Footer from "./components/layout/Footer/Footer";
import Search from "./components/pages/Search/Search";
import Recent from "./components/pages/Recent/Recent";
import Popular from "./components/pages/Popular/Popular";
import Ongoing from "./components/pages/Ongoing/Ongoing";
import NewSeason from "./components/pages/NewSeason/NewSeason";
import GenreAnime from "./components/pages/GenreAnime/GenreAnime";
import Genres from "./components/pages/Genres/Genres";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />

        <Routes>
          <Route exact path="/" element={<Home />} />

          {/* Anime */}
          <Route exact path="/search/:query" element={<Search />} />
          <Route exact path="/recent" element={<Recent />} />
          <Route exact path="/popular" element={<Popular />} />
          <Route exact path="/ongoing" element={<Ongoing />} />
          <Route exact path="/new-season" element={<NewSeason />} />
          <Route exact path="/genre/:genre" element={<GenreAnime />} />
          <Route exact path="/genres" element={<Genres />} />

          {/* Not Found */}
          {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>

        {/* Alerts */}
        <ErrorAlert />

        {/* Footer */}
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
