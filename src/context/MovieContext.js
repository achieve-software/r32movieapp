import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
export const MovieContext = createContext();
const API_KEY = "90060517ce2cf29a4077c6c03a513ec9";
const FEATURED_API = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}`;
const MovieContextProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);  useEffect(() => {
    getMovies(FEATURED_API);
  }, []);
  console.log(movies);  
  
  const getMovies = (API) => {
    axios
      .get(API)
      .then((res) => setMovies(res.data.results))
      .catch((err) => console.log(err));
  }; 
  
  const values = { movies, getMovies };  return (
    <MovieContext.Provider value={values}>{children}</MovieContext.Provider>
  );
};export default MovieContextProvider;