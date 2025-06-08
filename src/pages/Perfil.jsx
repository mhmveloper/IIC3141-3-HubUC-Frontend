import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

export default function Perfil() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const [userData, setUserData] = useState({
    name: 'Nombre del Usuario',
    email: 'XXXXXXXXXXXXXXXXXX',
    role: 'Estudiante',
  });

  const handleUserDataImport = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    } else {
      const response = await api.get("/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUserData(response.data);
    }
    setLoading(false);
  }

  useEffect(() => {
    handleUserDataImport();
  }, [])

  if (loading) {
    return (
    <div className="min-h-screen bg-neutral-950 text-white p-8">
      <div>Loading...</div>
    </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-white p-8">
      <h1 className="text-2xl font-bold mb-4">Mi Perfil</h1>

      <p className="mb-2">{`Nombre: ${userData.name}`}</p>
      <p className="mb-2">{`Email: ${userData.email}`}</p>
      <p className="mb-4">{`Rol: ${userData.role}`}</p>

      <div className="flex gap-4">
        <button
            onClick={() => navigate('/clases')}
            className="bg-violet-600 hover:bg-violet-800 px-4 py-2 rounded duration-200"
        >
            ← Volver a clases
        </button>

        <button
            onClick={() => navigate('/solicitudes')}
            className="bg-violet-600 hover:bg-violet-800 px-4 py-2 rounded duration-200"
        >
            ← Volver a solicitudes
        </button>
        </div>
    </div>
  );
}
