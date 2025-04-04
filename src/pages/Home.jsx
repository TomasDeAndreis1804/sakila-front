import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white px-4 text-center">
      <h1 className="text-4xl font-bold text-blue-400 mb-6">Bienvenido a MovieRentals</h1>
      <p className="text-lg text-gray-300 max-w-xl mb-6">
        Administra tu experiencia de alquiler de películas de forma sencilla. Puedes alquilar películas nuevas o consultar tu historial.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          to="/rental"
          className="px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded shadow text-white text-lg transition"
        >
          Alquilar película
        </Link>
        <Link
          to="/history"
          className="px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded shadow text-white text-lg transition"
        >
          Historial de alquileres
        </Link>
      </div>
    </div>
  );
};

export default Home;
