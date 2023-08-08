import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { MovieContext } from "../context/MovieContext";
import Fa from "../assets/icons/Fa";
import { toastWarnNotify } from "../helper/ToastNotify";


const IMG_API = "https://image.tmdb.org/t/p/w1280";
const defaultImage =
  "https://images.unsplash.com/photo-1581905764498-f1b60bae941a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=80" 
  
  
  const MovieCard = ({title,poster_path,overview,vote_average,id}) => {   
    
    const {currentUser} = useContext(AuthContext)
    const { addToFavorites, favorites } = useContext(MovieContext);  
    
    
    let navigate = useNavigate();
    const isFavorite = favorites.some((item) => item.id === id);
    
    const getVoteClass = (vote) => {
    if(vote>= 8) {
      return "green";
    } else if (vote >= 6) {
      return "orange";
    } else {
      return "red"
    }
   } 
   
   return (
    <div>
      <div className="movie" id="container"
        onClick={() => {
          navigate("details/" + id);
          !currentUser && toastWarnNotify("Please log in to see details");
        }}
      >
 <Fa
        className="absolute top-2 right-2 w-6 h-6 hover:scale-110 text-white"
        onClick={(e) => {
          e.stopPropagation();
          addToFavorites({ title, poster_path, overview, vote_average, id });
        }}
        isFavorite={isFavorite}
      />      
        <img
          loading="lazy"
          src={poster_path ? IMG_API + poster_path : defaultImage}
          alt="movie-card"
        />
        <div className="flex align-baseline justify-between p-1 text-white">
          <h5>{title}</h5>
          {currentUser && (
          <span className={`tag ${getVoteClass(vote_average)}`}>
            {vote_average.toFixed(1)}
          </span>
        )}
        </div>
        <div className="movie-over">
          <h2>Overview</h2>
          <p>{overview}</p>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;