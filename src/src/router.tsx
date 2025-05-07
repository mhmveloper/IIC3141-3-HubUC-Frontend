import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import AlumnoLogin from "./pages/AlumnoLogin";
import TutorLogin from "./pages/TutorLogin";


export const router = createBrowserRouter([
  { path: "/", element: <App />, children: [
      { index: true, element: <Home /> },
      { path: "ingresar/alumno", element: <AlumnoLogin /> },
      { path: "ingresar/tutor", element: <TutorLogin /> },
    //   { path: "tutors", element: <TutorList /> },
    //   { path: "tutors/:id", element: <TutorProfile /> },
    //   { path: "publicar", element: <NewPost /> },
  ]},
]);

// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// const queryClient = new QueryClient();
// root.render(
//   <QueryClientProvider client={queryClient}>
//     <RouterProvider router={router} />
//   </QueryClientProvider>
// );
