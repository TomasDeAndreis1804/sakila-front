import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-4xl font-bold text-blue-400 mb-6">Bienvenido a MovieRentals</h1>
      <p className="text-lg text-gray-300 text-center max-w-xl mb-4">
        Administra tu experiencia de alquiler de películas de forma sencilla.
      </p>
      <nav className="flex space-x-6">
        <Link
          to="/rental"
          className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded shadow text-white"
        >
          Alquilar película
        </Link>
        <Link
          to="/history"
          className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded shadow text-white"
        >
          Historial de alquileres
        </Link>
      </nav>
    </div>
  );
};

export default Home;
