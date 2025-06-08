import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Clases from '../Clases';

describe('Clases (unit test)', () => {
  const mockLessons = [
    {
      id: 1,
      course_id: 123,
      tutor_id: 456,
      price: 10000,
      start_time: '2025-06-09T03:56:28.602574',
    },
    {
      id: 2,
      course_id: 321,
      tutor_id: 654,
      price: 20000,
      start_time: '2025-06-10T18:00:00.000000',
    },
  ];

  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('renderiza correctamente una lista de clases con initialLessons', () => {
    render(
      <MemoryRouter>
        <Clases initialLessons={mockLessons} />
      </MemoryRouter>
    );

    expect(screen.getByText('Clases disponibles')).toBeInTheDocument();
    expect(screen.getByText('Curso ID: 123')).toBeInTheDocument();
    expect(screen.getByText('Tutor ID: 456')).toBeInTheDocument();
    expect(screen.getByText('Precio: $10000')).toBeInTheDocument();

    expect(screen.getByText('Curso ID: 321')).toBeInTheDocument();
    expect(screen.getByText('Tutor ID: 654')).toBeInTheDocument();
    expect(screen.getByText('Precio: $20000')).toBeInTheDocument();

    const buttons = screen.getAllByText('Solicitar clase');
    expect(buttons).toHaveLength(2);
  });

  it('llama a console.log al hacer click en "Solicitar clase"', () => {
    const consoleSpy = vi.spyOn(console, 'log');
    render(
      <MemoryRouter>
        <Clases initialLessons={mockLessons} />
      </MemoryRouter>
    );

    fireEvent.click(screen.getAllByText('Solicitar clase')[0]);

    expect(consoleSpy).toHaveBeenCalledWith('Clase privada 1 solicitada');
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

    const inputCurso = screen.getByPlaceholderText('ID Curso');
    const inputTutor = screen.getByPlaceholderText('ID Tutor');

    fireEvent.change(inputCurso, { target: { value: '99' } });
    fireEvent.change(inputTutor, { target: { value: '88' } });

    expect(inputCurso.value).toBe('99');
    expect(inputTutor.value).toBe('88');
  });
});
