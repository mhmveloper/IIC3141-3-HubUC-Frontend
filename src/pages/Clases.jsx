// src/components/Clases.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../services/api';

export default function Clases({ initialLessons = null }) {
  const navigate = useNavigate();
  const [lessons, setLessons] = useState(initialLessons || []);
  const [loading, setLoading] = useState(initialLessons ? false : true);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const handleSolicitarClase = (id) => {
    console.log(`Clase privada ${id} solicitada`);
  };

  useEffect(() => {
    if (initialLessons) return;

    const fetchPrivateLessons = async () => {
      try {
        const response = await axios.get('/private-lessons');
        setLessons(response.data);
      } catch (error) {
        console.error('Error cargando clases privadas:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPrivateLessons();
  }, [initialLessons]);

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

      {loading ? (
        <p className="text-center text-neutral-400">Cargando clases...</p>
      ) : (
        <div className="flex flex-col gap-4">
          {lessons.map((lesson) => (
            <div
              key={lesson.id}
              className="bg-neutral-800 p-4 rounded-lg border border-neutral-700 hover:bg-neutral-700 transition-all duration-200 flex justify-between items-center"
            >
              <div>
                <div className="text-lg font-semibold">Curso ID: {lesson.course_id}</div>
                <div className="text-sm text-neutral-400">Tutor ID: {lesson.tutor_id}</div>
                <div className="text-sm text-neutral-400">Precio: ${lesson.price}</div>
                <div className="text-sm text-neutral-400">
                  Fecha:{' '}
                  {new Date(lesson.start_time).toLocaleString('es-CL', {
                    dateStyle: 'medium',
                    timeStyle: 'short',
                    timeZone: 'America/Santiago',
                  })}
                </div>
              </div>

              <button
                onClick={() => handleSolicitarClase(lesson.id)}
                className="bg-violet-600 hover:bg-violet-800 px-4 py-2 text-sm rounded"
              >
                Solicitar clase
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
