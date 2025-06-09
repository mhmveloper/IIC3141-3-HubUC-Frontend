import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import AlumnoDashboard from "../AlumnoDashboard";
import { MemoryRouter } from "react-router-dom";
import api from "../../../services/api";

// Mock del módulo API
vi.mock("../../../services/api");

// Mock del componente Horario (si no es crítico testearlo aquí)
vi.mock("../../../components/common/Horario", () => ({
  default: () => <div data-testid="horario-mock">[Horario]</div>,
}));

describe("AlumnoDashboard", () => {
  beforeEach(() => {
    localStorage.setItem("token", "mock-token");
  });

  afterEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it("muestra estado de carga inicialmente", async () => {
    api.get.mockResolvedValueOnce({ data: [] });

    render(
      <MemoryRouter>
        <AlumnoDashboard />
      </MemoryRouter>
    );

    expect(screen.getByText(/Cargando solicitudes/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText(/No hay solicitudes aún/i)).toBeInTheDocument();
    });
  });

  it("muestra cantidad de solicitudes pendientes", async () => {
    const mockSolicitudes = [
      { id: 1, status: "pending" },
      { id: 2, status: "approved" },
      { id: 3, status: "pending" },
    ];
    api.get.mockResolvedValueOnce({ data: mockSolicitudes });

    render(
      <MemoryRouter>
        <AlumnoDashboard />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText("2")).toBeInTheDocument(); // 2 pendientes
      expect(screen.getByText(/Ver solicitudes/i)).toBeInTheDocument();
    });
  });

  it("muestra el resumen con clases hoy y próxima clase", async () => {
    api.get.mockResolvedValueOnce({ data: [] });

    render(
      <MemoryRouter>
        <AlumnoDashboard />
      </MemoryRouter>
    );

    expect(screen.getByText(/Clases de hoy/i)).toBeInTheDocument();
    expect(screen.getByText("1")).toBeInTheDocument(); // resumen.clasesHoy
    expect(screen.getByText(/Álgebra Lineal - 12:20 hrs/i)).toBeInTheDocument();
  });

  it("muestra el componente Horario", async () => {
    api.get.mockResolvedValueOnce({ data: [] });

    render(
      <MemoryRouter>
        <AlumnoDashboard />
      </MemoryRouter>
    );

    expect(screen.getByTestId("horario-mock")).toBeInTheDocument();
  });
});
