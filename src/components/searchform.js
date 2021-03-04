import React, { useState } from "react";
import "./search.scss";
import axios from "axios";
import CardList from "./cardlist";
require("dotenv").config();
function SearchForm() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState("");
  const searchMovies = (e) => {
    e.preventDefault();
    axios
      .get(
        `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_BASE_URL_KEY}&language=en-US&query=${query}&page=1&include_adult=false`
      )
      .then((response) => {
        const data = response.data;
        if (data.results.length === 0) {
          setError("No Results found");
        } else {
          setError("");
          setMovies(data.results);
        }
      })
      .catch((error) => {
        const errorMsg = error.message;
        setError(errorMsg);
      });
  };

  return (
    <div className="wrapper">
      <h3>GET MOVIES</h3>
      <div className="form--wrapper">
        <form className="form" onSubmit={searchMovies}>
          <input
            className="input"
            type="text"
            name="query"
            placeholder="i.e. Jurassic Park"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button className="button" type="submit">
            Search
          </button>
        </form>
        {error !== "" ? <p>{error}</p> : null}
        <div className="card-list">
          {movies
            .filter((movie) => movie.poster_path)
            .slice(0, 8)
            .map((movie) => {
              return <CardList key={movie.id} movie={movie} />;
            })}
        </div>
      </div>
    </div>
  );
}

export default SearchForm;
