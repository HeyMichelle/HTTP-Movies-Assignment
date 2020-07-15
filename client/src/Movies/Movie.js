import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

import MovieCard from "./MovieCard";
import EditMovieForm from "../EditMovie/EditMovieForm";

function Movie({ addToSavedList }) {
  const [movie, setMovie] = useState(null);
  const params = useParams();

  const fetchMovie = (id) => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err.response));
  };

  const saveMovie = () => {
    addToSavedList(movie);
  };

  const deleteMovie = (id) => {
    axios
      .delete(`http://localhost:5000/api/movies/${id}`, movie)
      .then(response => {
        console.log('delete response', response)
      })
  }

  useEffect(() => {
    fetchMovie(params.id);
  }, [params.id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  return (
    console.log('Movie.js movie, params', movie, params),
    <div className="save-wrapper">
      <MovieCard movie={movie} />

      <div className="save-button" onClick={saveMovie}>
        Save
      </div>

      <div>
        <Link to={`/update-movie/${params.id}`}>Edit Movie</Link>
      </div>

      <div onClick={deleteMovie(params.id)}>
        Delete Movie
      </div>
    </div>
  );
}

export default Movie;