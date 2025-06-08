// src/pages/tests/MisClases.test.jsx
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import MisClases from '../MisClases';
import { MemoryRouter } from 'react-router-dom';
import api from '../../../services/api';

vi.mock('../../../services/api');
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('MisClases', () => {
  beforeEach(() => {
    localStorage.setItem('user', JSON.stringify({ id: 10 }));
    localStorage.setItem('token', 'mock-token');
  });

  afterEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it('muestra clases cargadas correctamente', async () => {
    api.get.mockResolvedValueOnce({
      data: [
        {
          id: 1,
          subject: 'Álgebra',
          description: 'Ecuaciones y matrices',
          modality: 'online',
          price: 10000,
        },
      ],
    });

    render(
      <MemoryRouter>
        <MisClases />
      </MemoryRouter>
    );

    expect(screen.getByText(/Cargando clases/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('Álgebra')).toBeInTheDocument();
      expect(screen.getByText(/Ecuaciones y matrices/)).toBeInTheDocument();
    });
  });

  it('muestra mensaje cuando no hay clases', async () => {
    api.get.mockResolvedValueOnce({ data: [] });

    render(
      <MemoryRouter>
        <MisClases />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(
        screen.getByText(/No has publicado ninguna clase/i)
      ).toBeInTheDocument();
    });
  });

  it('permite aplicar filtro y ejecutar búsqueda', async () => {
    api.get.mockResolvedValue({ data: [] });

    render(
      <MemoryRouter>
        <MisClases />
      </MemoryRouter>
    );

    const input = screen.getByPlaceholderText('ID Curso');
    fireEvent.change(input, { target: { value: '3' } });

    const buscarBtn = screen.getByText('Buscar');
    fireEvent.click(buscarBtn);

    await waitFor(() => {
      expect(api.get).toHaveBeenCalledWith(
        expect.stringContaining('course_id=3'),
        expect.anything()
      );
    });
  });

  it('permite navegar al editar una clase', async () => {
    api.get.mockResolvedValueOnce({
      data: [
        {
          id: 1,
          subject: 'Física',
          description: 'Clases de dinámica',
          modality: 'presencial',
          price: 12000,
        },
      ],
    });

    render(
      <MemoryRouter>
        <MisClases />
      </MemoryRouter>
    );

    const botonEditar = await screen.findByText('Editar');
    fireEvent.click(botonEditar);

    expect(mockNavigate).toHaveBeenCalledWith('/clases/1/editar');
  });

  it('permite eliminar una clase con confirmación', async () => {
    vi.spyOn(window, 'confirm').mockReturnValueOnce(true);

    api.get.mockResolvedValueOnce({
      data: [
        {
          id: 2,
          subject: 'Química',
          description: 'Reacciones y estequiometría',
          modality: 'online',
          price: 14000,
        },
      ],
    });

    api.delete.mockResolvedValueOnce({});

    render(
      <MemoryRouter>
        <MisClases />
      </MemoryRouter>
    );

    const botonEliminar = await screen.findByText('Eliminar');
    fireEvent.click(botonEliminar);

    await waitFor(() => {
      expect(api.delete).toHaveBeenCalledWith(
        '/private-lessons/2',
        expect.anything()
      );
    });
  });
});
