export const manageFavorites = (action, movie, setMessage) => {
  let storage = window.localStorage.movies
    ? window.localStorage.movies.split(",")
    : [];

  if (action === "add") {
    if (!storage.includes(movie.id.toString())) {
      storage.push(movie.id);
      window.localStorage.movies = storage;
      setMessage("Favorites successfully added");
      setTimeout(() => {
        setMessage(null);
      }, 2000);
    } else {
      setMessage("Movie already in favorites");
      setTimeout(() => {
        setMessage(null);
      }, 2000);
    }
  } else if (action === "remove") {
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
