import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Card from "../components/Card";
import axios from "axios";
import Message from "../components/Message";
import { manageFavorites } from "../commun/utils";

const LikePage = () => {
  const [listData, setListData] = useState([]);
  const apiKey = process.env.REACT_APP_TMDB_API_KEY;
  const [message, setMessage] = useState(null);

  const handleFavorites = (action, movie) => {
    manageFavorites(action, movie, setMessage);
  };

  useEffect(() => {
    let moviesId = window.localStorage.movies
      ? window.localStorage.movies.split(",")
      : [];
    for (let i = 0; i < moviesId.length; i++) {
      axios
        .get(
          `https://api.themoviedb.org/3/movie/${moviesId[i]}?api_key=${apiKey}&language=fr-FR`
        )
        .then((res) => setListData((listData) => [...listData, res.data]));
    }
  }, [apiKey]);

  return (
    <div className="user-list-page">
      <Header />
      <h2>
        Favorites <span>💘</span>
      </h2>
      <div className="result">
        {listData.length > 0 ? (
          listData.map((movie) => (
            <Card
              onClick={(action) => handleFavorites(action, movie)}
              movie={movie}
              key={movie.id}
            />
          ))
        ) : (
          <h2>You have no favorites</h2>
        )}
      </div>
      {message ? <Message content={message} /> : null}
    </div>
  );
};

export default LikePage;
