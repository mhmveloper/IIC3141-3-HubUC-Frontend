// src/pages/tests/Horarios.test.jsx
import { describe, it, vi, expect, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import Horarios from '../HorariosTutor';
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

describe('Horarios', () => {
  beforeEach(() => {
    localStorage.setItem('user', JSON.stringify({ id: 99 }));
    localStorage.setItem('token', 'test-token');
  });

  afterEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it('muestra mensaje mientras se cargan los horarios', () => {
    render(
      <MemoryRouter>
        <Horarios />
      </MemoryRouter>
    );
    expect(screen.getByText(/Cargando horarios/i)).toBeInTheDocument();
  });

  it('muestra mensaje si no hay horarios', async () => {
    api.get.mockResolvedValueOnce({ data: [] });

    render(
      <MemoryRouter>
        <Horarios />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(
        screen.getByText(/No tienes horarios publicados/i)
      ).toBeInTheDocument();
    });
  });

  it('muestra horarios correctamente', async () => {
    api.get.mockResolvedValueOnce({
      data: [
        {
          id: 1,
          weekday: 'Tuesday',
          start_hour: 9,
          end_hour: 12,
          valid_from: '2025-06-10T00:00:00Z',
          valid_until: '2025-07-01T00:00:00Z',
        },
      ],
    });

    render(
      <MemoryRouter>
        <Horarios />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/Martes de 9:00 a 12:00/)).toBeInTheDocument();
      expect(screen.getByText(/Vigente desde/)).toBeInTheDocument();
    });
  });

  it('navega correctamente al crear nuevo horario', async () => {
    api.get.mockResolvedValueOnce({ data: [] });

    render(
      <MemoryRouter>
        <Horarios />
      </MemoryRouter>
    );

    const btn = await screen.findByText('+ Crear nuevo horario');
    fireEvent.click(btn);
    expect(mockNavigate).toHaveBeenCalledWith('/horarios/nuevo');
  });

  it('navega correctamente a solicitudes', async () => {
    api.get.mockResolvedValueOnce({ data: [] });

    render(
      <MemoryRouter>
        <Horarios />
      </MemoryRouter>
    );

    const btn = await screen.findByText(/volver a solicitudes/i);
    fireEvent.click(btn);
    expect(mockNavigate).toHaveBeenCalledWith('/solicitudes');
  });
});
