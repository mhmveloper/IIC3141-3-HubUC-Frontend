import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ClasesTutor from '../ClasesTutor';

describe('ClasesTutor', () => {
  beforeEach(() => {
    vi.spyOn(console, 'log').mockImplementation(() => {});
    vi.spyOn(Storage.prototype, 'removeItem').mockImplementation(() => {});
  });

  it('renderiza el título y botones de navegación', () => {
    render(<ClasesTutor />, { wrapper: MemoryRouter });

    expect(screen.getByText(/Solicitudes de clase/i)).toBeInTheDocument();
    expect(screen.getByText(/Ver perfil/i)).toBeInTheDocument();
    expect(screen.getByText(/Cerrar sesión/i)).toBeInTheDocument();
  });

  it('muestra las solicitudes de clases con botones de acción', () => {
    render(<ClasesTutor />, { wrapper: MemoryRouter });

    expect(screen.getByText(/Matemáticas I/i)).toBeInTheDocument();
    expect(screen.getByText(/Física II/i)).toBeInTheDocument();

    expect(screen.getAllByText(/Aceptar/i).length).toBe(2);
    expect(screen.getAllByText(/Rechazar/i).length).toBe(2);
  });

  it('permite aceptar o rechazar una solicitud', () => {
    render(<ClasesTutor />, { wrapper: MemoryRouter });

    fireEvent.click(screen.getAllByText(/Aceptar/i)[0]);
    expect(console.log).toHaveBeenCalledWith('Solicitud 1 aceptada');

    fireEvent.click(screen.getAllByText(/Rechazar/i)[1]);
    expect(console.log).toHaveBeenCalledWith('Solicitud 2 rechazada');
  });
});
