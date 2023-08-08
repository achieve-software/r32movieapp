import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
export const MovieContext = createContext();

const API_KEY = "90060517ce2cf29a4077c6c03a513ec9";

const FEATURED_API = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}`;

const MovieContextProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("favorites")) || []
  );

  useEffect(() => {
    getMovies(FEATURED_API);
  }, []);

  const getMovies = (API) => {
    setLoading(true);
    axios
      .get(API)
      .then((res) => setMovies(res.data.results))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };

  const addToFavorites = (movie) => {
    let isFavorite = favorites.some((item) => item.id === movie.id);
    if (isFavorite) {
      let newFavorites = favorites.filter((item) => item.id !== movie.id);
      setFavorites(newFavorites);
      localStorage.setItem("favorites", JSON.stringify(newFavorites));
    } else {
      let newFavorites = [...favorites, movie];
      setFavorites(newFavorites);
      localStorage.setItem("favorites", JSON.stringify(newFavorites));
    }
  };
  const values = { movies, getMovies, loading, addToFavorites, favorites };
  return (
    <MovieContext.Provider value={values}>{children}</MovieContext.Provider>
  );
};

export default MovieContextProvider;
