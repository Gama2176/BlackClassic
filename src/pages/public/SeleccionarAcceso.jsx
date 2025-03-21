import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { useNavigate } from 'react-router-dom';
import { getAccesos } from '../../utils/ApiMesas';
import { Users, Sofa, Crown } from 'lucide-react';

const icons = {
  "General": <div className="bg-blue-500 p-3 rounded-full flex items-center justify-center"><Users className="w-8 h-8 text-white" /></div>,
  "Balcon": <div className="bg-purple-500 p-3 rounded-full flex items-center justify-center"><Sofa className="w-8 h-8 text-white" /></div>,
  "VIP": <div className="bg-yellow-500 p-3 rounded-full flex items-center justify-center"><Crown className="w-8 h-8 text-white" /></div>
};

const SeleccionarAcceso = () => {
  const [accesos, setAccesos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAccesos = async () => {
      try {
        const datos = await getAccesos();
        const ordenAccesos = ["General", "Balcon", "VIP"];
        
        // Ordenar los accesos según el orden deseado
        const accesosOrdenados = datos.sort((a, b) => ordenAccesos.indexOf(a.nombre) - ordenAccesos.indexOf(b.nombre));

        setAccesos(accesosOrdenados);
      } catch (error) {
        console.error("Error al obtener los accesos", error);
      }
    };
    fetchAccesos();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="text-center mt-6 my-20">
        <h1 className="text-3xl font-bold">Selecciona tu Acceso</h1>
        <p className="text-gray-600">Elige la experiencia que mejor se adapte a ti</p>
      </div>
      <div className="flex justify-center gap-6 px-4 flex-wrap">
        {accesos.map((acceso) => (
          <div key={acceso.id} className="bg-white p-6 w-96 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-200 text-center mb-20 relative">
            <div className="absolute -top-7 left-1/2 transform -translate-x-1/2">
              {icons[acceso.nombre] || <Users className="w-10 h-10 text-gray-500" />}
            </div>
            <h2 className="text-xl font-semibold mt-5">Acceso {acceso.nombre}</h2>
            <p className="text-lg py-2 font-bold text-gray-800">${acceso.precio} MXN</p>
            <p className="text-gray-500 text-sm">{acceso.descripcion}</p>
            <button 
              onClick={() => navigate("/mesas", { state: { tipoAcceso: acceso.nombre } })}
              className="mt-6 bg-black text-white py-2 px-4 rounded-md w-full hover:bg-gray-800 transition-colors"
            >
              Seleccionar
            </button>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default SeleccionarAcceso;
