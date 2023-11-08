import React from "react";

const Card = ({ movie }) => {
  console.log(movie);
  return (
    <div className="card">
      <img
        src={
          movie.poster_path
            ? "https://image.tmdb.org/t/p/original" + movie.poster_path
            : "./img/poster.jpg"
        }
        alt="movie poster"
      />
      <h2>{movie.title}</h2>
    </div>
  );
};

export default Card;
