import React, { useEffect, useState } from "react";
import api from "../../services/api";

export default function AlumnoSolicitudes() {
  const [solicitudes, setSolicitudes] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleEliminar = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await api.delete(`/reservations/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // Opcional: actualiza la lista de solicitudes tras rechazar
      setSolicitudes((prev) => prev.filter((s) => s.id !== id));
    } catch (error) {
      console.error(`Error al eliminar solicitud ${id}:`, error);
    }
  };

  useEffect(() => {
    const fetchSolicitudes = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await api.get("/reservations/student", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setSolicitudes(res.data);
      } catch (error) {
        console.error("Error al obtener solicitudes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSolicitudes();
  }, []);

  return (
    <div className="bg-neutral-950 min-h-screen text-white p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Solicitudes de clase</h1>
      </div>

      {loading ? (
        <p className="mt-6 text-neutral-300">Cargando solicitudes...</p>
      ) : solicitudes.length === 0 ? (
        <p className="mt-6 text-neutral-400">No hay solicitudes aún.</p>
      ) : (
        <div className="flex flex-col gap-4 mt-6">
          {solicitudes.map((s) => (
            <div
              key={s.id}
              className="bg-neutral-800 p-4 rounded-lg border border-neutral-700 flex justify-between items-center"
            >
              <div>
                <div className="text-lg font-semibold">
                  ID Clase: {s.private_lesson_id}
                </div>
                <div className="text-sm text-neutral-400">
                  ID Estudiante: {s.student_id}
                </div>
                <div className="text-sm text-neutral-500">
                  Estado: {s.status}
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => handleEliminar(s.id)}
                  className="bg-violet-50 text-violet-600 hover:bg-red-400 hover:text-violet-50 px-4 py-2 rounded duration-200"
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
