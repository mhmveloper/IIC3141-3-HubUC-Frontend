import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Horario from "../Horario";

describe("Horario", () => {
  beforeEach(() => {
    render(<Horario />);
  });

  it("renderiza tabla con días y horas", () => {
    // verifica header días
    expect(screen.getByText("Lunes")).toBeInTheDocument();
    expect(screen.getByText("Martes")).toBeInTheDocument();
    expect(screen.getByText("Domingo")).toBeInTheDocument();

    // verifica horas
    expect(screen.getByText("08:20")).toBeInTheDocument();
    expect(screen.getByText("20:10")).toBeInTheDocument();

    // verifica que bloque sin clase muestre '-'
    expect(screen.getAllByText("-").length).toBeGreaterThan(0);
  });

  it("muestra todos los cursos, incluso si tienen el mismo nombre en diferentes horarios", () => {
    // Hay "Matemáticas" y "Álgebra Lineal" ambos en Lunes en distintos horarios
    const matematicasBloques = screen.getAllByText("Matemáticas");
    const algebraBloques = screen.getAllByText("Álgebra Lineal");

    expect(matematicasBloques.length).toBe(1);
    expect(algebraBloques.length).toBe(1);

    // Además hay "Cálculo I" y "Cálculo II" en diferentes días
    expect(screen.getByText("Cálculo I")).toBeInTheDocument();
    expect(screen.getByText("Cálculo II")).toBeInTheDocument();
  });

  it("abre modal con información correcta al hacer click en un bloque", () => {
    // Hacer click en el bloque "Matemáticas"
    const matematicas = screen.getByText("Matemáticas");
    fireEvent.click(matematicas);

    // Modal abierto con datos correctos
    expect(
      screen.getByRole("heading", { name: /matemáticas/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/hora: 08:20/i)).toBeInTheDocument();
    expect(screen.getByText(/día: lunes/i)).toBeInTheDocument();
    expect(screen.getByText(/duración: 2 bloque\(s\)/i)).toBeInTheDocument();
    expect(
      screen.getByText(/estudiante: nombre estudiante/i)
    ).toBeInTheDocument();
  });

  it("cierra el modal al hacer click en el botón cerrar", () => {
    // Abrir modal primero
    const matematicas = screen.getByText("Matemáticas");
    fireEvent.click(matematicas);

    const cerrarBtn = screen.getByRole("button", { name: /cerrar/i });
    fireEvent.click(cerrarBtn);

    // El modal debe desaparecer
    expect(
      screen.queryByRole("heading", { name: /matemáticas/i })
    ).not.toBeInTheDocument();
  });
});
