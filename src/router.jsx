import React from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./pages/common/Home";
import AlumnoLogin from "./pages/alumno/AlumnoLogin";
import TutorLogin from "./pages/tutor/TutorLogin";
import Register from "./components/common/Register";
import Clases from "./pages/alumno/Clases";
import Perfil from "./pages/common/Perfil";
import TutorDashboard from "./pages/tutor/TutorDashboard";
import ClasesTutor from "./pages/tutor/ClasesTutor";
import Horarios from "./pages/tutor/HorariosTutor";
import NuevoHorario from "./pages/tutor/NuevoHorario";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "ingresar/alumno", element: <AlumnoLogin /> },
      { path: "ingresar/tutor", element: <TutorLogin /> },
      { path: "register", element: <Register /> },
      { path: "clases", element: <Clases /> },
      { path: "perfil", element: <Perfil /> },
      { path: "dashboard/tutor", element: <TutorDashboard /> },
      { path: "solicitudes", element: <ClasesTutor /> },
      { path: "horarios", element: <Horarios /> },
      { path: "horarios/nuevo", element: <NuevoHorario /> },
    ],
  },
]);
