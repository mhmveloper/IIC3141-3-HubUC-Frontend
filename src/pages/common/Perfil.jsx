import React from "react";
import { useNavigate } from "react-router-dom";

export default function Perfil() {
  const navigate = useNavigate();

  // Simulación de datos: normalmente estos vendrían del contexto global o localStorage
  const user = JSON.parse(localStorage.getItem("user")); // Asegúrate de guardar esto al hacer login

  return (
    <div className="min-h-screen bg-neutral-950 text-white p-8">
      <h1 className="text-2xl font-bold mb-4">Mi Perfil</h1>

      <p className="mb-2">Nombre: {user?.name || "[placeholder]"}</p>
      <p className="mb-2">Correo: {user?.email || "[placeholder]"}</p>
      <p className="mb-4">Rol: {user?.role || "[placeholder]"}</p>

      <div className="flex flex-wrap gap-4">
        <button
          onClick={() => navigate("/clases")}
          className="bg-neutral-700 hover:bg-neutral-800 px-4 py-2 rounded duration-200"
        >
          ← Volver al panel principal
        </button>
      </div>
    </div>
  );
}
