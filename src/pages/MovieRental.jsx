import { useState, useEffect } from "react";
import { useUser } from "../context/UserContext";
import { useRental } from "../hooks/useRental";
import MovieSelection from "../components/rental/MovieSelection";
import DateSelection from "../components/rental/DateSelection";
import RentalSummary from "../components/rental/RentalSummary";
import { useNavigate } from 'react-router-dom';
import { getAvailableMovies } from "../services/api";

const MovieRental = () => {
  const navigate = useNavigate();
  const { selectedUser } = useUser();
  const { submitRental, isSubmitting, error, success, reset } = useRental();
  const [isLoading, setIsLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [dates, setDates] = useState({
    rentalDate: "",
    returnDate: "",
  });
  const [apiError, setApiError] = useState(null);

  useEffect(() => {
    const fetchFilms = async () => {
      try {
        setIsLoading(true);
        setApiError(null);
        const data = await getAvailableMovies();
        if (!Array.isArray(data)) {
          throw new Error("La API no devolvió un array de películas");
        }
        setMovies(data);
      } catch (err) {
        console.error("Error loading films:", err);
        setApiError(err.response?.data?.message || "No se pudieron cargar las películas.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchFilms();
  }, []);

  const handleDateChange = (field, value) => {
    setDates((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedMovie || !dates.rentalDate || !dates.returnDate) return;

    const rentalData = {
      rental_date: new Date(dates.rentalDate).toISOString(),
      customer_id: selectedUser.customer_id,
      return_date: new Date(dates.returnDate).toISOString(),
      film_id: selectedMovie.film_id,
    };

    try {
      await submitRental(rentalData);
    } catch (err) {
      console.error("Error submitting rental:", err);
    }
  };

  if (!selectedUser || !selectedUser.customer_id) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-950 text-white px-4">
        <h2 className="text-2xl font-semibold mb-4">Por favor selecciona un usuario</h2>
        <button
          onClick={() => navigate('/')}
          className="px-6 py-2 bg-indigo-500 rounded-md hover:bg-indigo-600 transition-colors"
        >
          Seleccionar Usuario
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white py-12 px-4">
      <div className="max-w-5xl mx-auto bg-gray-900 shadow-2xl rounded-2xl overflow-hidden">
        {/* Encabezado */}
        <div className="bg-gradient-to-r from-indigo-700 to-indigo-500 px-6 py-5 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="bg-indigo-300 text-indigo-800 font-bold h-12 w-12 rounded-full flex items-center justify-center text-xl">
              {selectedUser.first_name?.charAt(0) || "U"}
            </div>
            <div>
              <h2 className="text-xl font-semibold">Renta de Película</h2>
              <p className="text-sm">{selectedUser.first_name} {selectedUser.last_name}</p>
            </div>
          </div>
          <button
            onClick={() => navigate("/rentals")}
            className="text-sm bg-white text-indigo-600 font-semibold px-4 py-2 rounded-md hover:bg-gray-100 transition"
          >
            Ver mis rentas
          </button>
        </div>

        {/* Contenido */}
        <div className="p-6 space-y-6">
          {apiError && (
            <div className="bg-red-600/20 text-red-300 border border-red-500 rounded-md p-4">
              {apiError}
            </div>
          )}

          {success ? (
            <div className="bg-green-600/20 border border-green-500 text-green-300 rounded-lg p-6 text-center">
              <h3 className="text-xl font-semibold mb-2">¡Renta exitosa!</h3>
              <p>{selectedMovie.title} ha sido rentada por {selectedUser.first_name}.</p>
              <button
                onClick={reset}
                className="mt-4 px-4 py-2 bg-indigo-500 hover:bg-indigo-600 rounded-md transition"
              >
                Hacer otra renta
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {isLoading ? (
                <div className="space-y-4">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="h-24 bg-gray-700 rounded-md animate-pulse" />
                  ))}
                </div>
              ) : (
                <MovieSelection
                  movies={movies}
                  selectedMovie={selectedMovie}
                  onSelectMovie={setSelectedMovie}
                />
              )}

              <DateSelection
                rentalDate={dates.rentalDate}
                returnDate={dates.returnDate}
                onDateChange={handleDateChange}
              />

              {selectedMovie && (
                <RentalSummary
                  movie={selectedMovie}
                  rentalDate={dates.rentalDate}
                  returnDate={dates.returnDate}
                  rentalRate={selectedMovie.rental_rate}
                />
              )}

              {error && <div className="text-red-400 text-sm">{error}</div>}

              <button
                type="submit"
                disabled={!selectedMovie || !dates.rentalDate || !dates.returnDate || isSubmitting}
                className={`w-full py-3 px-4 text-sm font-medium rounded-md transition-colors ${
                  (!selectedMovie || !dates.rentalDate || !dates.returnDate || isSubmitting)
                    ? "bg-indigo-800 opacity-50 cursor-not-allowed"
                    : "bg-indigo-600 hover:bg-indigo-700"
                }`}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin mr-2 h-5 w-5 text-white" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                    </svg>
                    Procesando...
                  </span>
                ) : (
                  "Confirmar Renta"
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieRental;
