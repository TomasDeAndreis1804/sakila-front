import { useState } from "react";
import { Link } from "react-router-dom";

const RentalHistory = () => {
  const [history, setHistory] = useState([
    "Matrix",
    "Inception",
    "Interstellar",
  ]);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-blue-400 mb-4">Historial de Alquileres</h1>
      <ul className="list-disc list-inside text-gray-300 space-y-1 mb-6">
        {history.map((movie, index) => (
          <li key={index}>{movie}</li>
        ))}
      </ul>
      <Link
        to="/rental"
        className="px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded shadow text-white text-lg"
      >
        Alquilar otra película
      </Link>
    </div>
  );
};

export default RentalHistory;
