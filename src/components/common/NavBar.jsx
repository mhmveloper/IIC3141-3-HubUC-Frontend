import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';

export default function NavBar() {
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
    <div className="bg-neutral-950 text-white p-8">
      <div>Loading...</div>
    </div>
    );
  }

  return (
    <div className="bg-neutral-950 text-white p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">HubUC</h1>
        <div className="flex gap-4">
          <button
            onClick={() => navigate('/perfil')}
            className="bg-violet-600 hover:bg-violet-800 px-3 py-1 rounded duration-200"
          >
            Ver perfil
          </button>
          <button
            onClick={() => handleLogout()}
            className="bg-violet-50 text-violet-600 hover:bg-red-400 hover:text-violet-50 px-4 py-2 rounded duration-200"
          >
            Cerrar sesión
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <div className="bg-neutral-800 p-4 rounded-lg border border-neutral-700 flex justify-between items-center">
          <div>
            <div className="text-lg font-semibold">{userData.name}</div>
            <div className="text-sm text-neutral-400">{userData.email}</div>
          </div>
          <div className="text-sm text-neutral-400">{userData.role}</div>
        </div>

        <div className="flex gap-4">
          {<Link
            to="/clases"
            className="bg-violet-600 hover:bg-violet-800 px-4 py-2 rounded duration-200 flex-1 text-center"
          >
            Clases
          </Link>}
          {userData.role === "tutor" ? <Link
            to="/solicitudes"
            className="bg-violet-600 hover:bg-violet-800 px-4 py-2 rounded duration-200 flex-1 text-center"
          >
            Solicitudes
          </Link> : <></>}
        </div>
      </div>
    </div>
  )
};