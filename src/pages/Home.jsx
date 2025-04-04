import UserList from "../components/UserList";

const Home = () => {
  return (
    <div className="flex flex-col items-center px-4">
      {/* Encabezado */}
      <div className="text-center max-w-2xl mb-10">
        <div className="flex justify-center mb-4">
          <div className="bg-indigo-600 p-3 rounded-lg shadow-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 text-white"
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

        <h1 className="text-4xl sm:text-5xl font-extrabold text-indigo-100 mb-4">
          CineVerse
        </h1>

        <p className="text-lg text-indigo-200 leading-relaxed">
          Explora nuestro catálogo de películas y series. Inicia sesión para personalizar tus recomendaciones, seguir tus favoritas y disfrutar del mejor cine desde casa.
        </p>
      </div>

      {/* Tarjeta de selección de usuario */}
      <div className="w-full max-w-md bg-indigo-900 shadow-2xl rounded-lg overflow-hidden">
        <div className="bg-violet-600 px-6 py-4">
          <h2 className="text-xl font-semibold text-white text-center">
            Selecciona tu perfil para continuar
          </h2>
        </div>

        <div className="p-6">
          <UserList />
        </div>
      </div>

      {/* Footer */}
      <div className="mt-12 text-center">
        <p className="text-sm text-indigo-300">
          © {new Date().getFullYear()} CineVerse. Todos los derechos reservados.
        </p>
      </div>
    </div>
  );
};

export default Home;
