import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Clases() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const handleSolicitarClase = (id) => {
    console.log(`Clase ${id} solicitada`);
  };

  return (
    <div className="bg-neutral-950 min-h-screen text-white p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Clases disponibles</h1>
        <div className="flex gap-4">
          <button
            onClick={() => navigate('/perfil')}
            className="bg-violet-600 hover:bg-violet-800 px-4 py-2 rounded duration-200"
          >
            Ver perfil
          </button>
          <button
            onClick={handleLogout}
            className="bg-violet-50 text-violet-600 hover:bg-red-400 hover:text-violet-50 px-4 py-2 rounded duration-200"
          >
            Cerrar sesión
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {[1, 2, 3].map((id) => (
          <div
            key={id}
            className="bg-neutral-800 p-4 rounded-lg border border-neutral-700 hover:bg-neutral-700 transition-all duration-200 flex justify-between items-center"
          >
            <div>
              <div className="text-lg font-semibold">Asignatura {id}</div>
              <div className="text-sm text-neutral-400">Profesor Ejemplo</div>
            </div>

            <button
              onClick={() => handleSolicitarClase(id)}
              className="bg-violet-600 hover:bg-violet-800 px-4 py-2 text-sm rounded"
            >
              Solicitar clase
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
