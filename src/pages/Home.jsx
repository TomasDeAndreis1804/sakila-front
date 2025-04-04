import UserList from "../components/UserList";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-700 flex flex-col items-center justify-start py-12 px-4 sm:px-6 lg:px-8">
      {/* Encabezado con logo y descripción */}
      <div className="text-center max-w-2xl mb-10">
        <div className="flex justify-center mb-4">
          <div className="bg-yellow-500 p-3 rounded-lg shadow-md">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-12 w-12 text-black" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" 
              />
            </svg>
          </div>
        </div>
        
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">
          Sakila Movie Hub
        </h1>
        
        <p className="text-lg text-gray-300 leading-relaxed">
          Accede a tu perfil y descubre un mundo de películas al alcance de un clic. 
          Disfruta de los últimos estrenos y clásicos inolvidables.
        </p>
      </div>
      
      {/* Tarjeta de selección de usuario */}
      <div className="w-full max-w-md bg-gray-800 shadow-2xl rounded-lg overflow-hidden">
        <div className="bg-yellow-500 px-6 py-4">
          <h2 className="text-xl font-semibold text-gray-900 text-center">
            Elige tu perfil
          </h2>
        </div>
        
        <div className="p-6">
          <UserList />
        </div>
      </div>
      
      {/* Footer */}
      <div className="mt-12 text-center">
        <p className="text-sm text-gray-400">
          © {new Date().getFullYear()} Sakila Movie Hub. Todos los derechos reservados.
        </p>
      </div>
    </div>
  );
};

export default Home;
