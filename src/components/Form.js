import axios from "axios";
import React, { useEffect, useState } from "react";
import Card from "./Card";
import Message from "./Message";
import { manageFavorites } from "../commun/utils";

const Form = () => {
  const apiKey = process.env.REACT_APP_TMDB_API_KEY;
  const [moviesData, setMoviesData] = useState([]);
  const [search, setSearch] = useState("batman");
  const [sortGoodBad, setSortGoodBad] = useState("");
  const [message, setMessage] = useState(null);

  const handleFavorites = (action, movie) => {
    manageFavorites(action, movie, setMessage);
  };

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${search}&language=fr-FR`
      )
      .then((res) => setMoviesData(res.data.results));
  }, [apiKey, search]);

  return (
    <div className="form-component">
      <div className="form-container">
        <form>
          <input
            type="text"
            placeholder="Enter Movie Title"
            id="search-input"
            onChange={(e) => setSearch(e.target.value)}
          />
          <input type="submit" value="Search" />
        </form>
        <div className="btn-sort-container">
          <div
            className="btn-sort"
            id="goodToBad"
            onClick={() => setSortGoodBad("goodToBad")}
          >
            Top<span>➝</span>
          </div>

          <div
            className="btn-sort"
            id="badToGood"
            onClick={() => setSortGoodBad("badToGood")}
          >
            Flop<span>➝</span>
          </div>
        </div>
      </div>
      <div className="result">
        {moviesData
          .slice(0, 16)
          .sort((a, b) => {
            if (sortGoodBad === "goodToBad") {
              return b.vote_average - a.vote_average;
            } else if (sortGoodBad === "badToGood") {
              return a.vote_average - b.vote_average;
            }
            return null;
          })
          .map((movie) => (
            <Card
              onClick={(action) => handleFavorites(action, movie)}
              movie={movie}
              key={movie.id}
            />
          ))}
      </div>
      {message && <Message content={message} />}
    </div>
  );
};

export default Form;
