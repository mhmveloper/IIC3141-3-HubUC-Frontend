import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Horarios() {
  const navigate = useNavigate();

  // Datos hardcodeados por ahora
  const horarios = [
    {
      id: 1,
      weekday: 'Lunes',
      start_hour: 10,
      end_hour: 12,
      valid_from: '2024-06-10',
      valid_until: '2024-07-01',
    },
    {
      id: 2,
      weekday: 'Miércoles',
      start_hour: 14,
      end_hour: 16,
      valid_from: '2024-06-10',
      valid_until: '2024-07-01',
    },
  ];

  return (
    <div className="min-h-screen bg-neutral-950 text-white p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Mis horarios disponibles</h1>
        <div className="flex gap-4">
          <button
            onClick={() => navigate('/horarios/nuevo')}
            className="bg-violet-600 hover:bg-violet-800 px-4 py-2 rounded duration-200"
          >
            + Crear nuevo horario
          </button>
          <button
            onClick={() => navigate('/solicitudes')}
            className="bg-neutral-700 hover:bg-neutral-800 px-4 py-2 rounded duration-200"
          >
            ← Volver a solicitudes
          </button>
        </div>
      </div>

      {horarios.length === 0 ? (
        <p className="text-neutral-400">No tienes horarios publicados.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {horarios.map((h) => (
            <div
              key={h.id}
              className="bg-neutral-800 p-4 rounded-lg border border-neutral-700"
            >
              <div className="font-semibold text-lg">
                {h.weekday} de {h.start_hour}:00 a {h.end_hour}:00
              </div>
              <div className="text-sm text-neutral-400">
                Vigente desde {h.valid_from} hasta {h.valid_until}
              </div>
              <div className="mt-2 flex gap-2">
                <button className="bg-violet-500 hover:bg-violet-700 px-3 py-1 rounded text-sm">
                  Editar
                </button>
                <button className="bg-red-600 hover:bg-red-800 px-3 py-1 rounded text-sm">
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
