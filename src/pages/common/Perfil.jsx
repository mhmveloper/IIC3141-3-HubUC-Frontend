import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Placeholder contenedor Reviews
function Reviews() {
  return (
    <div className="w-full h-full min-h-[300px] bg-neutral-800 p-6 rounded-lg border border-neutral-700">
      <h3 className="text-lg font-semibold mb-2 text-white">Reviews</h3>
      <p className="text-gray-400">Aquí irán las reviews del tutor...</p>
    </div>
  );
}

export default function Perfil() {
  const navigate = useNavigate();

  // Simulación de datos: normalmente estos vendrían del contexto global o localStorage
  const user = JSON.parse(localStorage.getItem("user")); // Asegúrate de guardar esto al hacer login

  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState(user?.name || "[placeholder]");
  const [email, setEmail] = useState(user?.email || "[placeholder]");

  const roleNames = {
    tutor: "Tutor",
    student: "Alumno",
  };
  const displayRole = roleNames[user.role] || user.role || "[placeholder]";

  const handleSaveChanges = () => {
    // Llamada API
    console.log("Guardando", { name, email });
    setEditMode(false);
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Mi Perfil</h1>
        <button
          onClick={() => navigate("/dashboard/tutor")}
          className="bg-neutral-700 hover:bg-neutral-800 px-4 py-2 rounded duration-200"
        >
          ← Volver al panel principal
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="bg-neutral-800 pt-10 px-6 pb-6 rounded-lg border border-neutral-700 flex-1 max-h-[400px] flex flex-col relative">
          <span className="absolute top-4 right-4 bg-purple-600 text-white text-xs px-3 py-1 rounded-full font-semibold select-none z-10">
            {displayRole}
          </span>

          {/* Contenido principal con scroll si es necesario */}
          <div className="overflow-auto mb-4">
            <div className="mb-4">
              <label
                className="block text-base font-semibold text-white mb-1"
                htmlFor="name"
              >
                Nombre
              </label>
              {editMode ? (
                <input
                  id="name"
                  type="text"
                  className="bg-neutral-900 border border-neutral-600 rounded px-3 py-2 text-white w-full text-base"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Escribe tu nombre"
                />
              ) : (
                <p className="text-white text-lg">{name || "[placeholder]"}</p>
              )}
            </div>

            <div className="mb-4">
              <label
                className="block text-base font-semibold text-white mb-1"
                htmlFor="email"
              >
                Correo
              </label>
              {editMode ? (
                <input
                  id="email"
                  type="email"
                  className="bg-neutral-900 border border-neutral-600 rounded px-3 py-2 text-white w-full text-base"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Escribe tu correo"
                />
              ) : (
                <p className="text-gray-400 text-lg">
                  {email || "[placeholder]"}
                </p>
              )}
            </div>
          </div>

          {/* Botones abajo */}
          <div className="flex justify-end space-x-3 mt-auto">
            {editMode ? (
              <>
                <button
                  onClick={handleSaveChanges}
                  className="bg-violet-600 hover:bg-violet-800 px-3 py-1 rounded duration-200 inline-block"
                >
                  Guardar
                </button>
                <button
                  onClick={() => {
                    setName(user?.name || "");
                    setEmail(user?.email || "");
                    setEditMode(false);
                  }}
                  className="bg-neutral-700 hover:bg-neutral-800 px-4 py-2 rounded duration-200"
                >
                  Cancelar
                </button>
              </>
            ) : (
              <button
                onClick={() => setEditMode(true)}
                className="bg-violet-600 hover:bg-violet-800 px-3 py-1 rounded duration-200 inline-block"
              >
                Editar perfil
              </button>
            )}
          </div>
        </div>

        {user?.role === "tutor" && (
          <div className="flex-[4]">
            <Reviews />
          </div>
        )}
      </div>
    </div>
  );
}
