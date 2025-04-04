import { useState } from "react";

const RentalHistory = () => {
  const [history, setHistory] = useState([
    "Matrix",
    "Inception",
    "Interstellar",
  ]);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-blue-400 mb-4">Historial de Alquileres</h1>
      <ul className="list-disc list-inside text-gray-300 space-y-1">
        {history.map((movie, index) => (
          <li key={index}>{movie}</li>
        ))}
      </ul>
    </div>
  );
};

export default RentalHistory;
