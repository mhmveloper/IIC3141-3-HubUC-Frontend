import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/common/NavBar';
import api from '../services/api';

export default function Clases() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [clasesData, setClasesData] = useState([
    {
      id: 1,
      name: "Matematicas",
      description: "Clase de matematicas"
    },
    {
      id: 2,
      name: "Programacion",
      description: "Clase de programacion"
    },
    {
      id: 3,
      name: "Fisica",
      description: "Clase de fisica"
    }
  ])

  const handleDataCharge = async () => {
    try {
      const token = localStorage.getItem('token');

      const response = await api.get("/courses", {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      const promises = response.data.map((clase) => 
        api.get(`/private-lessons/by-course/${clase.id}`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        }).then(privateLessons => {
          clase.lessonsAvailable = privateLessons.data ? privateLessons.data.length : 0;
          return clase;
        })
      );

      await Promise.all(promises);
      setClasesData(response.data);

    } catch (error) {
      console.error('Error al obtener las clases:', error);
    } finally {
    }

  } 

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const handleSolicitarClase = (id) => {
    console.log(`Clase ${id} solicitada`);
  };

  useEffect(() => {
    handleDataCharge();
  }, [])

  useEffect(() => {
    console.log(clasesData);
    setLoading(false);
  }, [clasesData])

  if (loading) {
    return (
    <div className="min-h-screen bg-neutral-950 text-white p-8">
      <div>Loading...</div>
    </div>
    );
  }

  return (
    !loading ? 
    <div className="bg-neutral-950 min-h-screen text-white p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Clases disponibles</h1>
        <div className="flex gap-4">
          <button
            onClick={() => navigate('/perfil')}
            className="bg-violet-600 hover:bg-violet-800 px-4 py-2 rounded duration-200"
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
        {clasesData.map((claseData) => (
          <div
            key={claseData.id}
            className="bg-neutral-800 p-4 rounded-lg border border-neutral-700 hover:bg-neutral-700 transition-all duration-200 flex justify-between items-center"
            onClick={() => console.log(`Debería desplegar, y luego buscar las ofertas de private_lesson para la clase de ID: ${claseData.id}`)}
          >
            <div>
              <div className="text-lg font-semibold">{`${claseData.name}`}</div>
              <div className="text-sm text-neutral-400">{`${claseData.description}`}</div>
              <div className="text-sm text-neutral-400">{`${claseData.lessonsAvailable} ofertas de tutores para esta clase`}</div>
            </div>

            <button
              onClick={() => handleSolicitarClase(claseData.id)}
              className="bg-violet-600 hover:bg-violet-800 px-4 py-2 text-sm rounded"
            >
              Solicitar clase
            </button>
          </div>
        ))}
      </div>
    </div>: <></>)
}
