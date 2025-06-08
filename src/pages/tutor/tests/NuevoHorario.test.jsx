import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import CrearHorario from '../NuevoHorario';
import { vi } from 'vitest';
import api from '../../../services/api';

vi.mock('../../../services/api', () => ({
  default: {
    post: vi.fn(),
  }
}));

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => vi.fn(),
  };
});

describe('CrearHorario', () => {
  beforeEach(() => {
    localStorage.setItem('token', 'fake-token');
  });

  it('renderiza título y campos', () => {
    render(<CrearHorario />, { wrapper: MemoryRouter });

    expect(screen.getByText('Crear horarios disponibles')).toBeInTheDocument();
    expect(screen.getByText('+ Agregar bloque')).toBeInTheDocument();
    expect(screen.getByText('Publicar horarios')).toBeInTheDocument();
  });

  it('permite agregar y eliminar bloques', async () => {
    render(<CrearHorario />, { wrapper: MemoryRouter });

    // Agregar bloque
    fireEvent.click(screen.getByText('+ Agregar bloque'));

    expect(await screen.findByText('Lunes: 8:00 - 9:00')).toBeInTheDocument();

    // Eliminarlo
    fireEvent.click(screen.getByText('✕'));
    await waitFor(() => {
      expect(screen.queryByText('Lunes: 8:00 - 9:00')).not.toBeInTheDocument();
    });
  });

  it('envía horarios al hacer submit', async () => {
    render(<CrearHorario />, { wrapper: MemoryRouter });

    fireEvent.change(screen.getByLabelText(/Vigente desde:/i), {
      target: { value: '2025-06-10' }
    });
    fireEvent.change(screen.getByLabelText(/Vigente hasta:/i), {
      target: { value: '2025-06-15' }
    });

    fireEvent.click(screen.getByText('+ Agregar bloque'));
    fireEvent.click(screen.getByText('Publicar horarios'));

    await waitFor(() => {
      expect(api.post).toHaveBeenCalledWith(
        '/weekly-timeblocks',
        expect.objectContaining({
          weekday: 'Monday',
          start_hour: 8,
          end_hour: 9,
          valid_from: '2025-06-10T00:00:00',
          valid_until: '2025-06-15T00:00:00',
        }),
        expect.anything()
      );
    });
  });
});
