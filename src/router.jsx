import React from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import AlumnoLogin from "./pages/AlumnoLogin";
import TutorLogin from "./pages/TutorLogin";
import Register from './components/common/Register';
import Clases from './pages/Clases';
import Perfil from './pages/Perfil';
import ClasesTutor from './pages/ClasesTutor';
import Horarios from './pages/HorariosTutor';
import NuevoHorario from './pages/NuevoHorario';

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "ingresar/alumno", element: <AlumnoLogin /> },
      { path: "ingresar/tutor", element: <TutorLogin /> },
      { path: "register", element: <Register /> },
      { path: 'clases', element: <Clases /> },
      { path: 'perfil', element: <Perfil /> },
      { path: 'solicitudes', element: <ClasesTutor /> },
      { path: 'horarios', element: <Horarios /> },
      { path: 'horarios/nuevo', element: <NuevoHorario /> },
    ],
  },
]);
