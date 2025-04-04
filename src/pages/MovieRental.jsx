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
  const [dates, setDates] = useState({ rentalDate: "", returnDate: "" });
  const [apiError, setApiError] = useState(null);

  useEffect(() => {
    const fetchFilms = async () => {
      try {
        setIsLoading(true);
        setApiError(null);
        const data = await getAvailableMovies();
        if (!Array.isArray(data)) {
          throw new Error("No se encontraron películas disponibles.");
        }
        setMovies(data);
      } catch (err) {
        console.error("Error al cargar películas:", err);
        setApiError("Hubo un problema al obtener las películas. Intenta de nuevo más tarde.");
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
      console.error("Error al procesar la renta:", err);
    }
  };

  if (!selectedUser || !selectedUser.customer_id) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold text-gray-800">Selecciona un usuario para continuar</h2>
        <button
          onClick={() => navigate('/')}
          className="mt-4 px-5 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700"
        >
          Elegir Usuario
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="bg-blue-500 px-6 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-700 font-bold text-xl">
              {selectedUser.first_name?.charAt(0) || "U"}
            </div>
            <div className="ml-4">
              <h2 className="text-xl font-semibold text-white">Rentar una Película</h2>
              <p className="text-blue-200">{selectedUser.first_name} {selectedUser.last_name}</p>
            </div>
          </div>
          <button
            onClick={() => navigate("/rentals")}
            className="px-4 py-2 bg-white text-blue-600 rounded-md hover:bg-blue-100"
          >
            Mis Rentas
          </button>
        </div>

        <div className="p-6">
          {apiError && (
            <div className="bg-red-50 border-l-4 border-red-600 p-4 mb-6 text-red-700">
              {apiError}
            </div>
          )}

          {success ? (
            <div className="bg-green-50 border border-green-300 rounded-lg p-6 text-center">
              <h3 className="text-lg font-semibold text-green-800">¡Renta realizada con éxito!</h3>
              <p className="text-green-600">Has alquilado <strong>{selectedMovie.title}</strong>.</p>
              <button
                onClick={reset}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700"
              >
                Rentar otra película
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {isLoading ? (
                <div className="space-y-4">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="h-24 bg-gray-100 rounded-lg animate-pulse"></div>
                  ))}
                </div>
              ) : (
                <MovieSelection movies={movies} selectedMovie={selectedMovie} onSelectMovie={setSelectedMovie} />
              )}
              <DateSelection rentalDate={dates.rentalDate} returnDate={dates.returnDate} onDateChange={handleDateChange} />
              {selectedMovie && <RentalSummary movie={selectedMovie} rentalDate={dates.rentalDate} returnDate={dates.returnDate} rentalRate={selectedMovie.rental_rate} />}
              {error && <div className="text-red-600 text-sm mt-2">{error}</div>}
              <button
                type="submit"
                disabled={!selectedMovie || !dates.rentalDate || !dates.returnDate || isSubmitting}
                className="w-full py-3 bg-blue-500 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Procesando..." : "Confirmar Renta"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieRental;
