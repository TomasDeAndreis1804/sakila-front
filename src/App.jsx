import { Link, Outlet } from "react-router-dom";

const App = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans">
      <nav className="bg-gray-800 p-4 shadow-lg flex justify-between items-center">
        <Link to="/" className="text-3xl font-extrabold text-blue-400 hover:text-blue-300">
          MovieRentals
        </Link>
      </nav>
      <div className="container mx-auto p-6 flex flex-col items-center">
        <Outlet />
      </div>
    </div>
  );
};

export default App;
