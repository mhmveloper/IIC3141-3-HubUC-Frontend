import React from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import AlumnoLogin from "./pages/AlumnoLogin";
import TutorLogin from "./pages/TutorLogin";
import Register from './pages/Register';

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // layout principal con <Outlet />
    children: [
      { index: true, element: <Home /> },
      { path: "ingresar/alumno", element: <AlumnoLogin /> },
      { path: "ingresar/tutor", element: <TutorLogin /> },
      { path: "register", element: <Register /> },
    ],
  },
]);
