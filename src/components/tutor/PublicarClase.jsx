import React, { useState, useEffect } from 'react';
import api from '../../services/api';

export default function PublicarClase() {
  const [ramo, setRamo] = useState('');
  const [horarios, setHorarios] = useState([]);
  const [precio, setPrecio] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [expandido, setExpandido] = useState(false);
  const [ramosDisponibles, setRamosDisponibles] = useState([]);

  const horas = [
    '08:00', '09:00', '10:00', '11:00',
    '12:00', '13:00', '14:00', '15:00',
    '16:00', '17:00', '18:00', '19:00',
    '20:00',
  ];
  const dias = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];

  useEffect(() => {
    const fetchRamos = async () => {
      try {
        const res = await api.get('/courses');
        setRamosDisponibles(res.data);
      } catch {
        setRamosDisponibles([]);
      }
    };
    fetchRamos();
  }, []);

  const handleHorarioChange = (e) => {
    const { value, checked } = e.target;
    setHorarios((prev) =>
      checked ? [...prev, value] : prev.filter((h) => h !== value)
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/clases', {
        id_ramo: parseInt(ramo),
        horario: horarios,
        precio: parseFloat(precio),
      });
      setMensaje('✅ Clase publicada correctamente');
      setRamo('');
      setHorarios([]);
      setPrecio('');
    } catch {
      setMensaje('❌ Error al publicar la clase');
    }
  };

  return (
    <div className="mb-8">
      <button
        onClick={() => setExpandido(!expandido)}
        className="w-full text-left bg-neutral-900 text-white border border-violet-600 px-4 py-4 font-semibold rounded hover:bg-neutral-800 transition-colors"
      >
        {expandido ? '➖' : '➕'} Publicar nueva clase
      </button>


      {expandido && (
        <form
          onSubmit={handleSubmit}
          className="bg-neutral-800 p-6 rounded-xl mt-4"
        >
          <h2 className="text-lg font-semibold mb-4">Formulario de publicación</h2>

          <label className="block mb-2">Ramo/Curso</label>
          <select
            value={ramo}
            onChange={(e) => setRamo(e.target.value)}
            required
            className="mb-4 p-2 rounded w-full bg-neutral-900 text-white border border-neutral-600"
          >
            <option value="">Seleccione un ramo</option>
            {ramosDisponibles.map((r) => (
              <option key={r.id_ramo} value={r.id_ramo}>
                {r.nombre}
              </option>
            ))}
          </select>

          <label className="block mb-2">Horarios disponibles</label>
          <div className="overflow-auto mb-4 border border-neutral-700 rounded">
            <table className="w-full text-sm text-white">
              <thead className="bg-neutral-800">
                <tr>
                  <th className="p-2 text-left">Hora</th>
                  {dias.map((dia) => (
                    <th key={dia} className="p-2">{dia}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {horas.map((hora) => (
                  <tr key={hora} className="border-t border-neutral-700">
                    <td className="p-2 bg-neutral-800 font-medium">{hora}</td>
                    {dias.map((dia) => {
                      const valor = `${dia}-${hora}`;
                      return (
                        <td key={valor} className="p-2 text-center">
                          <input
                            type="checkbox"
                            value={valor}
                            checked={horarios.includes(valor)}
                            onChange={handleHorarioChange}
                            className="accent-violet-600"
                          />
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <label className="block mb-2">Precio por sesión</label>
          <input
            type="number"
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
            placeholder="$ CLP"
            className="mb-4 p-2 rounded w-full bg-neutral-900 text-white border border-neutral-600"
            required
          />

          <button
            type="submit"
            className="bg-violet-600 hover:bg-violet-700 px-4 py-2 rounded text-white"
          >
            Publicar clase
          </button>

          {mensaje && <p className="mt-4 text-sm">{mensaje}</p>}
        </form>
      )}
    </div>
  );
}
