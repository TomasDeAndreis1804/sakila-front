import { useState } from "react";

const MovieRental = () => {
  const [movieName, setMovieName] = useState("");
  const [rentedMovies, setRentedMovies] = useState([]);

  const handleRent = () => {
    if (movieName.trim() !== "") {
      setRentedMovies([...rentedMovies, movieName]);
      setMovieName("");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-blue-400 mb-4">Alquiler de Películas</h1>

      <div className="flex mb-6 w-full max-w-md">
        <input
          type="text"
          placeholder="Nombre de la película"
          value={movieName}
          onChange={(e) => setMovieName(e.target.value)}
          className="flex-grow p-2 rounded-l bg-gray-800 text-white border border-gray-600 focus:outline-none"
        />
        <button
          onClick={handleRent}
          className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-r text-white font-semibold"
        >
          Alquilar
        </button>
      </div>

      <div className="w-full max-w-md">
        <h2 className="text-2xl font-semibold text-gray-300 mb-2">Películas alquiladas:</h2>
        <ul className="list-disc list-inside text-gray-200 space-y-1">
          {rentedMovies.map((movie, index) => (
            <li key={index}>{movie}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MovieRental;
