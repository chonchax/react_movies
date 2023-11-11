import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Card from "../components/Card";
import axios from "axios";
import Message from "../components/Message";

const LikePage = () => {
  const [listData, setListData] = useState([]);
  const apiKey = process.env.REACT_APP_TMDB_API_KEY;
  const [message, setMessage] = useState(null);

  const handleStorageAction = (action, movie) => {
    if (action === "add") {
      let storage = window.localStorage.movies
        ? window.localStorage.movies.split(",")
        : [];
      if (!storage.includes(movie.id.toString())) {
        storage.push(movie.id);
        window.localStorage.movies = storage;
        setMessage("Favorites successfully added");
        setTimeout(() => {
          setMessage(null);
        }, 2000);
      }
    } else if (action === "remove") {
      let storage = window.localStorage.movies
        ? window.localStorage.movies.split(",")
        : [];

      if (storage.includes(movie.id.toString())) {
        storage.splice(storage.indexOf(movie.id.toString()), 1);
        window.localStorage.movies = storage;
        setMessage("Favorites successfully removed");
        setTimeout(() => {
          setMessage(null);
        }, 2000);
      }
    }
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
              onClick={(action) => handleStorageAction(action, movie)}
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
