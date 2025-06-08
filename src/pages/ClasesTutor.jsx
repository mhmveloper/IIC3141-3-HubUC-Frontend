import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

export default function ClasesTutor() {
  const navigate = useNavigate();

  const [solicitudes, setSolicitudes] = useState([
	{ id: 1, asignatura: 'Matemáticas I', estudiante: 'Carlos Pérez' },
	{ id: 2, asignatura: 'Física II', estudiante: 'Ana Soto' },
  ]);

  const handleAceptar = (id) => {
	console.log(`Solicitud ${id} aceptada`);
  };

  const handleRechazar = (id) => {
	console.log(`Solicitud ${id} rechazada`);
  };

  const handleLogout = () => {
	localStorage.removeItem('token');
	navigate('/');
  };

	const handleDataCharge = async () => {
		const token = localStorage.getItem('token');
		console.log("Token", token)
		if (token) {
			const response = await api.get('/reservations/tutor', {
				headers: {
					Authorization: `Bearer ${token}`
				}
			})
			console.log("Data", response.data)
			/*
			const data = response.data
			data.forEach((element) => {
				api.get(`/private-lessons/${element.private_lesson_id}`, {
					headers: {
						Authorization: `Bearer ${token}`
					}
				}).then((response) => {
					element.clase = response.data.id
				})
			});
			*/

			setSolicitudes(response.data)
		}
	}

	useEffect(() => {
		handleDataCharge()
	}, [])

  return (
	<div className="bg-neutral-950 min-h-screen text-white p-8">
	  <div className="flex justify-between items-center mb-6">
		<h1 className="text-2xl font-bold">Solicitudes de clase</h1>
		<div className="flex gap-4">
		  <button
			onClick={() => navigate('/perfil')}
			className="bg-violet-600 hover:bg-violet-800 px-3 py-1 rounded duration-200"
		  >
			Ver perfil
		  </button>
		  <button
			onClick={handleLogout}
			className="bg-violet-50 text-violet-600 hover:bg-red-400 hover:text-violet-50 px-4 py-2 rounded duration-200"
		  >
			Cerrar sesión
		  </button>
		</div>
	  </div>

	  <div className="flex flex-col gap-4">
		{solicitudes.map((s) => (
		  <div
			key={s.id}
			className="bg-neutral-800 p-4 rounded-lg border border-neutral-700 flex justify-between items-center"
		  >
			<div>
			  <div className="text-lg font-semibold">{`Solicitud (ID ${s.id})`}</div>
			  <div className="text-sm text-neutral-400">
				Solicitada por: {`Estudiante (ID ${s.student_id})`}
			  </div>
			</div>

			<div className="flex gap-2">
			  <button
				onClick={() => handleAceptar(s.id)}
				className="bg-violet-600 hover:bg-violet-800 px-3 py-1 rounded duration-200"
			  >
				Aceptar
			  </button>
			  <button
				onClick={() => handleRechazar(s.id)}
				className="bg-violet-50 text-violet-600 hover:bg-red-400 hover:text-violet-50 px-4 py-2 rounded duration-200"
			  >
				Rechazar
			  </button>
			</div>
		  </div>
		))}
	  </div>
	</div>
  );
}
