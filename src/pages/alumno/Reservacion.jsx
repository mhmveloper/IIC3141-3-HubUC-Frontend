import React from 'react';

export default function Reservacion({ lesson, onClose, onSubmit, courseCache }) {
  if (!lesson) return null;

  const course = courseCache?.[lesson.course_id];
  const courseName = course?.name || `Curso ID: ${lesson.course_id}`;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-neutral-900 text-white p-6 rounded-2xl w-full max-w-md border border-neutral-700 shadow-lg">
        <h2 className="text-xl font-bold mb-4 text-center">Confirmar solicitud</h2>
        
        <div className="mb-4">
          <p className="text-lg font-semibold">{courseName}</p>
          <p className="text-sm text-neutral-400">{lesson.description || 'Sin descripción'}</p>
        </div>

        <p className="text-sm text-neutral-300 mb-6">
          ¿Estás seguro de que deseas solicitar esta clase?
        </p>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-neutral-700 hover:bg-neutral-600 transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={() => onSubmit(lesson.id)}
            className="px-4 py-2 rounded bg-violet-600 hover:bg-violet-800 text-white transition-colors"
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
}
