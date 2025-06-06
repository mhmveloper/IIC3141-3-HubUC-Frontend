import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Perfil() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-neutral-950 text-white p-8">
      <h1 className="text-2xl font-bold mb-4">Mi Perfil</h1>

      <p className="mb-2">Nombre: [placeholder]</p>
      <p className="mb-2">Correo: [placeholder]</p>
      <p className="mb-4">Rol: [placeholder]</p>

      <div className="flex gap-4">
        <button
            onClick={() => navigate('/clases')}
            className="bg-violet-600 hover:bg-violet-800 px-4 py-2 rounded duration-200"
        >
            ← Volver a clases
        </button>

        <button
            onClick={() => navigate('/solicitudes')}
            className="bg-violet-600 hover:bg-violet-800 px-4 py-2 rounded duration-200"
        >
            ← Volver a solicitudes
        </button>
        </div>
    </div>
  );
}
