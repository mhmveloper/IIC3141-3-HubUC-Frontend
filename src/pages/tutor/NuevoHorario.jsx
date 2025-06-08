import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';

const WEEKDAYS = {
  Lunes: 'Monday',
  Martes: 'Tuesday',
  Miércoles: 'Wednesday',
  Jueves: 'Thursday',
  Viernes: 'Friday',
  Sábado: 'Saturday',
  Domingo: 'Sunday',
};

export default function CrearHorario() {
  const navigate = useNavigate();
  const [weekday, setWeekday] = useState('Lunes');
  const [start, setStart] = useState(8);
  const [end, setEnd] = useState(9);
  const [blocks, setBlocks] = useState([]);
  const [validFrom, setValidFrom] = useState('');
  const [validUntil, setValidUntil] = useState('');

  const handleAddBlock = () => {
    if (start >= end) {
      return alert('La hora de inicio debe ser menor que la de término');
    }
    setBlocks([
      ...blocks,
      { weekday, start_hour: start, end_hour: end },
    ]);
  };

  const handleRemoveBlock = (index) => {
    const newBlocks = [...blocks];
    newBlocks.splice(index, 1);
    setBlocks(newBlocks);
  };

  const handleSubmit = async (e) => {
    const toNaiveDateTime = (dateStr) => {
      return new Date(dateStr).toISOString().split('.')[0]; // Quita zona horaria y milisegundos
    };
    e.preventDefault();

    const valid_from_naive = toNaiveDateTime(validFrom);
    const valid_until_naive = toNaiveDateTime(validUntil);
    const token = localStorage.getItem('token');

    try {
      for (const block of blocks) {
        const payload = {
          weekday: WEEKDAYS[block.weekday],
          start_hour: block.start_hour,
          end_hour: block.end_hour,
          valid_from: valid_from_naive,
          valid_until: valid_until_naive,
        };

        console.log('Enviando:', payload);
        await api.post('/weekly-timeblocks', payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }

      navigate('/horarios');
    } catch (err) {
      console.error('Error al crear horarios:', err);
      alert('Ocurrió un error al crear los horarios.');
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white p-8">
      <h1 className="text-2xl font-bold mb-6">Crear horarios disponibles</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md">
        <label className="flex flex-col">
          Día de la semana:
          <select
            value={weekday}
            onChange={(e) => setWeekday(e.target.value)}
            className="bg-neutral-800 p-2 rounded mt-1"
          >
            {Object.keys(WEEKDAYS).map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col">
          Bloque horario:
          <div className="flex gap-2 mt-1">
            <select
              value={start}
              onChange={(e) => setStart(Number(e.target.value))}
              className="bg-neutral-800 p-2 rounded"
            >
              {Array.from({ length: 24 }, (_, i) => (
                <option key={i} value={i}>
                  {i}:00
                </option>
              ))}
            </select>
            <span className="self-center">a</span>
            <select
              value={end}
              onChange={(e) => setEnd(Number(e.target.value))}
              className="bg-neutral-800 p-2 rounded"
            >
              {Array.from({ length: 24 }, (_, i) => (
                <option key={i} value={i}>
                  {i}:00
                </option>
              ))}
            </select>
            <button
              type="button"
              onClick={handleAddBlock}
              className="bg-violet-600 hover:bg-violet-800 px-3 rounded"
            >
              + Agregar bloque
            </button>
          </div>
        </label>

        {blocks.length > 0 && (
          <div className="bg-neutral-900 p-3 rounded text-sm text-neutral-300">
            <p className="font-semibold mb-2">Bloques agregados:</p>
            <ul className="list-disc list-inside flex flex-col gap-1">
              {blocks.map((b, i) => (
                <li key={i} className="flex justify-between items-center">
                  <span>
                    {b.weekday}: {b.start_hour}:00 - {b.end_hour}:00
                  </span>
                  <button
                    type="button"
                    onClick={() => handleRemoveBlock(i)}
                    className="text-red-400 hover:text-red-600 text-xs ml-2"
                  >
                    ✕
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        <label className="flex flex-col">
          Vigente desde:
          <input
            type="date"
            value={validFrom}
            onChange={(e) => setValidFrom(e.target.value)}
            required
            className="bg-neutral-800 p-2 rounded mt-1"
          />
        </label>

        <label className="flex flex-col">
          Vigente hasta:
          <input
            type="date"
            value={validUntil}
            onChange={(e) => setValidUntil(e.target.value)}
            required
            className="bg-neutral-800 p-2 rounded mt-1"
          />
        </label>

        <div className="flex gap-4 mt-4">
          <button
            type="submit"
            className="bg-violet-600 hover:bg-violet-800 px-4 py-2 rounded"
          >
            Publicar horarios
          </button>
          <button
            type="button"
            onClick={() => navigate('/horarios')}
            className="bg-neutral-700 hover:bg-neutral-800 px-4 py-2 rounded"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}
