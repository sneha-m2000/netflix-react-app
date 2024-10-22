import axios from 'axios';
import React, { useEffect, useState } from 'react';
import requests from '../Requests';

const Main = () => {
  const [movies, setMovies] = useState([]);

  // Select a random movie
  const movie = movies[Math.floor(Math.random() * movies.length)];

  useEffect(() => {
    // Fetch popular movies from the API
    axios.get(requests.requestPopular).then((response) => {
      setMovies(response.data.results);
    });
  }, []);

  // Function to truncate the movie overview
  const truncateString = (str, num) => {
    return str?.length > num ? str.slice(0, num) + '...' : str;
  };

  return (
    <div className="relative w-full h-[600px] text-white">
      {/* Full background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent"></div>
      {/* Check if movie backdrop exists before displaying */}
      {movie?.backdrop_path && (
        <img
          className="w-full h-full object-cover" // Image styling
          src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
          alt={movie?.title}
        />
      )}
      {/* Content overlaying the image */}
      <div className="absolute inset-0 flex flex-col justify-center p-4 md:p-8">
        <h1 className="text-3xl md:text-5xl font-bold">{movie?.title}</h1>
        <div className="my-4">
          <button className="border bg-gray-300 text-black border-gray-300 py-2 px-5">
            Play
          </button>
          <button className="border text-white border-gray-300 py-2 px-5 ml-4">
            Watch Later
          </button>
        </div>
        <p className="text-gray-400 text-sm">Released: {movie?.release_date}</p>
        <p className="w-full md:max-w-[70%] lg:max-w-[50%] xl:max-w-[35%] text-gray-200">
          {truncateString(movie?.overview, 150)}
        </p>
      </div>
    </div>
  );
};

export default Main;
