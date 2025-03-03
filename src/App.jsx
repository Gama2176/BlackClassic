import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [users, setUsers] = useState([]);

  // Lógica para traer los datos de la API
  const fetchData = async () => {
    try {
      const response = await axios.get("https://blackclassic-api.onrender.com/api/user/all");
      setUsers(response.data);
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Función para mostrar un "pill" (etiqueta) de estado con diferentes estilos
  const getEstadoPill = (estado) => {
    if (!estado) return null;

    const estadoLower = estado.toLowerCase();

    if (estadoLower === 'activo') {
      return (
        <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-700">
          Activo
        </span>
      );
    } else if (estadoLower === 'inactivo') {
      return (
        <span className="px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-700">
          Inactivo
        </span>
      );
    } else {
      return (
        <span className="px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-700">
          {estado}
        </span>
      );
    }
  };

  return (
    <div className="min-h-screen bg-white py-8 px-4">
      <div className="max-w-6xl mx-auto">
        
        {/* Encabezado principal */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900">
            Lista de Usuarios - API (Prueba)
          </h1>
          <p className="text-gray-500 mt-2">
            Información extraída de la API - BlackClassic
          </p>
          <h3>aqui edito giron</h3>
        </div>

        {/* usuarios */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {users.map((user) => (
            <div
              key={user.id}
              className="border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
            >
              {/* Encabezado */}
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-lg font-medium text-gray-800">
                  {user.nombre} {user.apellidopaterno}
                </h2>
                {/* Etiqueta de estado */}
                {getEstadoPill(user.estado)}
              </div>

              {/* Información adicional del usuario */}
              <p className="text-sm text-gray-500 mb-1">
                <strong>Correo:</strong> {user.correo}
              </p>
              <p className="text-sm text-gray-500 mb-1">
                <strong>Teléfono:</strong> {user.telefono}
              </p>
              <p className="text-sm text-gray-500 mb-1">
                <strong>Rol:</strong> {user.rol}
              </p>
              <p className="text-sm text-gray-500">
                <strong>ID:</strong> {user.id}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
