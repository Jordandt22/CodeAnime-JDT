import React from "react";

// React Router
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Context
import ContextProvider from "./context/Context.provider";

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
import ComingSoon from "./components/pages/ComingSoon/ComingSoon";
import NotFound from "./components/pages/NotFound/NotFound";
import Anime from "./components/pages/Anime/Anime";
import Watch from "./components/pages/Watch/Watch";
import MyAnime from "./components/pages/MyAnime/MyAnime";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ContextProvider>
          <NavBar />

          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/about" element={<ComingSoon />} />

            {/* Anime Browse */}
            <Route exact path="/search/:query" element={<Search />} />
            <Route exact path="/recent" element={<Recent />} />
            <Route exact path="/popular" element={<Popular />} />
            <Route exact path="/ongoing" element={<Ongoing />} />
            <Route exact path="/new-season" element={<NewSeason />} />
            <Route exact path="/genre/:genre" element={<GenreAnime />} />
            <Route exact path="/genres" element={<Genres />} />

            {/* Anime Information */}
            <Route exact path="/anime/:animeSlug" element={<Anime />} />
            <Route exact path="/watch/:animeSlug/:epSlug" element={<Watch />} />

            {/* User */}
            <Route exact path="/myanime" element={<MyAnime />} />

            {/* Not Found */}
            <Route path="*" element={<NotFound />} />
          </Routes>

          {/* Alerts */}
          <ErrorAlert />

          {/* Footer */}
          <Footer />
        </ContextProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
