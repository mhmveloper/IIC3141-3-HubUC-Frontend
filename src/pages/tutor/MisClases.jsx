import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';

export default function MisClases() {
  const navigate = useNavigate();
  const [clases, setClases] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem('user'));

  const [filters, setFilters] = useState({
    course_id: '',
  });

  const fetchClases = async () => {
    setLoading(true);
    try {
      const { course_id } = filters;
      const query = new URLSearchParams({
        ...(course_id && { course_id: parseInt(course_id).toString() }),
        tutor_id: user.id.toString(),
        order_by: 'created_at',
        order: 'desc',
        page: '1',
        page_size: '10',
      });
      const token = localStorage.getItem('token');
      const res = await api.get(`/private-lessons/search?${query.toString()}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setClases(Array.isArray(res.data) ? res.data : res.data.items || []);

    } catch (err) {
      console.error('Error al obtener clases:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClases();
  }, []);

  const handleChange = (e) => {
    setFilters((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSearch = () => {
    fetchClases();
  };

  const handleEliminar = async (id) => {
    const confirmar = confirm('¿Estás seguro de eliminar esta clase?');
    if (!confirmar) return;

    try {
      const token = localStorage.getItem('token');
      await api.delete(`/private-lessons/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setClases((prev) => prev.filter((c) => c.id !== id));
    } catch (err) {
      console.error('Error al eliminar clase:', err);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white p-8">


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
        <button
          onClick={handleSearch}
          className="bg-violet-600 hover:bg-violet-800 px-4 py-2 rounded text-sm"
        >
          Buscar
        </button>
      </div>

      {loading ? (
        <p className="text-neutral-400">Cargando clases...</p>
      ) : clases.length === 0 ? (
        <p className="text-neutral-400">No has publicado ninguna clase aún.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {clases.map((c) => (
            <div
              key={c.id}
              className="bg-neutral-800 p-4 rounded-lg border border-neutral-700"
            >
              <h2 className="text-lg font-semibold">{c.subject}</h2>
              <p className="text-sm text-neutral-300 mb-1">{c.description}</p>
              <p className="text-sm text-neutral-400">
                Modalidad: {c.modality} | Precio: ${c.price.toLocaleString()}
              </p>

              <div className="mt-3 flex gap-2">
                <button
                  onClick={() => navigate(`/clases/${c.id}/editar`)}
                  className="bg-violet-500 hover:bg-violet-700 px-3 py-1 rounded text-sm"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleEliminar(c.id)}
                  className="bg-red-600 hover:bg-red-800 px-3 py-1 rounded text-sm"
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <button
        onClick={() => navigate('/perfil')}
        className="mt-8 bg-neutral-700 hover:bg-neutral-800 px-4 py-2 rounded"
      >
        ← Volver a perfil
      </button>
    </div>
  );
}
