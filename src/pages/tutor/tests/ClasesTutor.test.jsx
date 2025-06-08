import { describe, it, vi, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import React from 'react';

// 1. Mock de navigate
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

// 2. Mock de PublicarClase
vi.mock('../../../components/tutor/PublicarClase', () => ({
  default: () => <div>PublicarClaseMock</div>,
}));

// 3. Mock de la API
const mockGet = vi.fn();
const mockPut = vi.fn();
vi.mock('../../../services/api', () => ({
  default: {
    get: mockGet,
    put: mockPut,
  },
}));

// 4. Antes de cada test
beforeEach(() => {
  mockNavigate.mockReset();
  mockGet.mockReset();
  mockPut.mockReset();
  localStorage.setItem('token', 'mock-token');
});

describe('ClasesTutor', () => {
  it('muestra las solicitudes cargadas', async () => {
    mockGet.mockResolvedValueOnce({
      data: [
        { id: 5, student_id: 6, private_lesson_id: 10, status: 'pending' },
      ],
    });

    const { default: ClasesTutor } = await import('../ClasesTutor');
    render(<ClasesTutor />);

    await waitFor(async () => {
      const coincidencias = await screen.findAllByText((_, el) =>
        el?.textContent?.includes('ID Clase: 10')
      );
      expect(coincidencias.length).toBeGreaterThan(0);
    });
  });

  it('permite aceptar una solicitud', async () => {
    mockGet.mockResolvedValueOnce({
      data: [
        { id: 5, student_id: 6, private_lesson_id: 10, status: 'pending' },
      ],
    });

    const { default: ClasesTutor } = await import('../ClasesTutor');
    render(<ClasesTutor />);

    const btn = await screen.findByText('Aceptar');
    fireEvent.click(btn);

    await waitFor(() =>
      expect(mockPut).toHaveBeenCalledWith(
        '/reservations/5',
        { status: 'accepted' },
        { headers: { Authorization: 'Bearer mock-token' } }
      )
    );
  });

  it('permite rechazar una solicitud', async () => {
    mockGet.mockResolvedValueOnce({
      data: [
        { id: 5, student_id: 6, private_lesson_id: 10, status: 'pending' },
      ],
    });

    const { default: ClasesTutor } = await import('../ClasesTutor');
    render(<ClasesTutor />);

    const btn = await screen.findByText('Rechazar');
    fireEvent.click(btn);

    await waitFor(() =>
      expect(mockPut).toHaveBeenCalledWith(
        '/reservations/5',
        { status: 'rejected' },
        { headers: { Authorization: 'Bearer mock-token' } }
      )
    );
  });
});
