import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Clases from '../Clases';

const mockLessons = [
  {
    id: 1,
    course_id: 123,
    tutor_id: 456,
    price: 10000,
    start_time: '2025-06-09T03:56:28.602574',
    description: 'Clase de prueba 1',
  },
  {
    id: 2,
    course_id: 321,
    tutor_id: 654,
    price: 20000,
    start_time: '2025-06-10T18:00:00.000000',
    description: 'Clase de prueba 2',
  },
];

describe('Clases (unit test)', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('renderiza correctamente una lista de clases con datos enriquecidos', () => {
    render(
      <MemoryRouter>
        <Clases
          initialLessons={mockLessons}
        />
      </MemoryRouter>
    );

    expect(screen.getByText('Clases disponibles')).toBeInTheDocument();
    expect(screen.getByText('Precio: $10000')).toBeInTheDocument();
    expect(screen.getByText('Precio: $20000')).toBeInTheDocument();

    const buttons = screen.getAllByText('Solicitar clase');
    expect(buttons).toHaveLength(2);
  });

  it('muestra el modal al hacer clic en "Solicitar clase"', async () => {
    render(
      <MemoryRouter>
        <Clases
          initialLessons={mockLessons}
        />
      </MemoryRouter>
    );

    fireEvent.click(screen.getAllByText('Solicitar clase')[0]);

    await waitFor(() => {
      expect(screen.getByText('Confirmar solicitud')).toBeInTheDocument();
    });

    expect(screen.getByText(/¿Estás seguro de que deseas solicitar/)).toBeInTheDocument();
    expect(screen.getByText('Cancelar')).toBeInTheDocument();
    expect(screen.getByText('Confirmar')).toBeInTheDocument();
  });

  it('muestra mensaje de carga si no hay initialLessons', () => {
    render(
      <MemoryRouter>
        <Clases />
      </MemoryRouter>
    );

    expect(screen.getByText('Cargando clases...')).toBeInTheDocument();
  });

  it('permite escribir en los filtros de curso y tutor', () => {
    render(
      <MemoryRouter>
        <Clases initialLessons={mockLessons} />
      </MemoryRouter>
    );

    const inputCurso = screen.getByPlaceholderText('Nombre de curso');
    const inputTutor = screen.getByPlaceholderText('Nombre del tutor');

    fireEvent.change(inputCurso, { target: { value: 'álgebra' } });
    fireEvent.change(inputTutor, { target: { value: 'Carlos' } });

    expect(inputCurso.value).toBe('álgebra');
    expect(inputTutor.value).toBe('Carlos');
  });
});
