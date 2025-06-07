import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Clases from '../Clases';

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => vi.fn(),
  };
});

describe('Clases', () => {
  it('muestra el título y botones de perfil/cerrar sesión', () => {
    render(<Clases />, { wrapper: MemoryRouter });

    expect(screen.getByText('Clases disponibles')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /ver perfil/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /cerrar sesión/i })).toBeInTheDocument();
  });

  it('muestra todas las clases de ejemplo', () => {
    render(<Clases />, { wrapper: MemoryRouter });

    expect(screen.getAllByText(/asignatura/i)).toHaveLength(3);
    expect(screen.getAllByText(/profesor ejemplo/i)).toHaveLength(3);
    expect(screen.getAllByRole('button', { name: /solicitar clase/i })).toHaveLength(3);
  });

  it('al hacer clic en solicitar clase muestra un console.log (mockeado)', () => {
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    render(<Clases />, { wrapper: MemoryRouter });

    const botones = screen.getAllByRole('button', { name: /solicitar clase/i });
    fireEvent.click(botones[1]); // click en Asignatura 2

    expect(logSpy).toHaveBeenCalledWith('Clase 2 solicitada');

    logSpy.mockRestore();
  });
});