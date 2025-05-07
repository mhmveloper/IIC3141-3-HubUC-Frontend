import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="flex flex-col items-center gap-6 bg-sky-50">
        <h1 className="text-3xl font-bold">
            Bienvenido a Teacher
            <span className="text-blue-600">UC</span>
        </h1>
        <p className="text-center max-w-md">
            Conecta estudiantes con tutores de forma rápida y segura.
        </p>

        <div className="flex flex-col items-center gap-6 mt-8 w-full max-w-xs">
            <Link
            to="/ingresar/alumno"
            >
            Ingresar como Alumno
            </Link>


            <Link
            to="/ingresar/tutor"
            >
            Ingresar como Tutor
            </Link>
        </div>
        <h1 className="text-3xl font-bold underline text-indigo-700">
          Hello world!
        </h1>

    </div>

  );
}
