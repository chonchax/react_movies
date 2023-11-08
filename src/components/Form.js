import axios from "axios";
import React, { useEffect } from "react";
import Card from "./Card";

const Form = () => {
  const apiKey = process.env.REACT_APP_TMDB_API_KEY;
  const [moviesData, setMoviesData] = React.useState([]);

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=nuit&language=fr-FR`
      )
      .then((res) => setMoviesData(res.data.results));
  }, [apiKey]);

  return (
    <div className="form-component">
      <div className="form-container">
        <form>
          <input
            type="text"
            placeholder="Enter Movie Title"
            id="search-input"
          />
          <input type="submit" value="Search" />
        </form>
        <div className="btn-sort-container">
          <div className="btn-sort" id="goodToBad">
            Top<span>➝</span>
          </div>

          <div className="btn-sort" id="badToGood">
            Flop<span>➝</span>
          </div>
        </div>
      </div>
      <div className="result">
        {moviesData.slice(0, 12).map((movie) => (
          <Card movie={movie} key={movie.id} />
        ))}
      </div>
    </div>
  );
};

export default Form;
