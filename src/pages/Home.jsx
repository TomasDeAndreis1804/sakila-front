import UserList from "../components/UserList";

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col justify-between py-8 px-4 sm:px-10">
      {/* Header */}
      <header className="flex items-center justify-between max-w-6xl mx-auto mb-10">
        <div className="flex items-center space-x-4">
          <div className="bg-indigo-500 p-2 rounded-md shadow-lg">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-10 w-10 text-white" 
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
          <div>
            <h1 className="text-2xl font-bold">Sakila Movie Rentals</h1>
            <p className="text-sm text-gray-300">Accede a miles de películas al instante</p>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex flex-col md:flex-row items-center justify-center gap-10 max-w-6xl mx-auto">
        {/* Descripción */}
        <section className="md:w-1/2 text-center md:text-left space-y-4">
          <h2 className="text-3xl font-semibold">¡Bienvenido!</h2>
          <p className="text-lg text-gray-300">
            Selecciona tu perfil de usuario para comenzar a explorar nuestro catálogo 
            de películas. Disfruta de alquileres instantáneos y descubre los últimos 
            éxitos cinematográficos.
          </p>
        </section>

        {/* Tarjeta de selección de usuario */}
        <section className="w-full md:w-1/2 bg-gray-800 rounded-xl shadow-xl">
          <div className="bg-indigo-600 px-6 py-4 rounded-t-xl">
            <h2 className="text-lg font-medium text-white">
              Selecciona tu usuario
            </h2>
          </div>
          <div className="p-6">
            <UserList />
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-12 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Sakila Movies. Todos los derechos reservados.
      </footer>
    </div>
  );
};

export default Home;
