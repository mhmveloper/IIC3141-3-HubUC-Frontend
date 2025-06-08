import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../services/api';

export default function Clases({ initialLessons = null }) {
  const navigate = useNavigate();
  const [lessons, setLessons] = useState(initialLessons || []);
  const [loading, setLoading] = useState(initialLessons ? false : true);
  const [filters, setFilters] = useState({
    course_id: '',
    tutor_id: '',
  });

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const handleSolicitarClase = (id) => {
    console.log(`Clase privada ${id} solicitada`);
  };

  const handleChange = (e) => {
    setFilters((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  useEffect(() => {
    if (initialLessons) return;
    fetchAllLessons();
  }, [initialLessons]);

  const fetchAllLessons = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/private-lessons');
      setLessons(response.data);
    } catch (error) {
      console.error('Error cargando todas las clases:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    setLoading(true);
    try {
      const { course_id, tutor_id } = filters;

      if (!course_id && !tutor_id) {
        fetchAllLessons();
        return;
      }

      const query = new URLSearchParams({
        ...(course_id && { course_id: parseInt(course_id).toString() }),
        ...(tutor_id && { tutor_id: parseInt(tutor_id).toString() }),
        page: '1',
        page_size: '100',
      });

      const response = await axios.get(`/private-lessons/search?${query.toString()}`);
      setLessons(response.data.results);
    } catch (error) {
      console.error('Error filtrando clases privadas:', error);
    } finally {
      setLoading(false);
    }
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

      {/* Filtros */}
      <div className="bg-neutral-900 p-4 rounded-lg mb-6 flex flex-wrap gap-4">
        <input
          name="course_id"
          type="number"
          placeholder="ID Curso"
          className="bg-neutral-800 text-white px-3 py-2 rounded"
          value={filters.course_id}
          onChange={handleChange}
        />
        <input
          name="tutor_id"
          type="number"
          placeholder="ID Tutor"
          className="bg-neutral-800 text-white px-3 py-2 rounded"
          value={filters.tutor_id}
          onChange={handleChange}
        />
        <button
          onClick={handleSearch}
          className="bg-violet-600 hover:bg-violet-800 px-4 py-2 rounded text-sm"
        >
          Buscar
        </button>
      </div>

      {/* Resultado */}
      {loading ? (
        <p className="text-center text-neutral-400">Cargando clases...</p>
      ) : (
        <div className="flex flex-col gap-4">
          {lessons.length === 0 ? (
            <p className="text-center text-neutral-400">No se encontraron clases.</p>
          ) : (
            lessons.map((lesson) => (
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
            ))
          )}
        </div>
      )}
    </div>
  );
}
