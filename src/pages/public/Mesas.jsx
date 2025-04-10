import React, { useState, useEffect } from 'react';
import { useSearchParams, useLocation, useNavigate } from 'react-router-dom';
import { getMesasByAcceso, getAccesos, createReservation } from '../../utils/ApiMesas';
import { Users, Clock, MapPin } from 'lucide-react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const Mesas = () => {
  const [searchParams] = useSearchParams();
  const [mesas, setMesas] = useState([]);
  const [accesos, setAccesos] = useState([]);
  const { state } = useLocation();
  const tipoAcceso = state?.tipoAcceso;
  const [selectedMesa, setSelectedMesa] = useState(null);
  const [reservationData, setReservationData] = useState({
    nombre: '',
    correo: '',
    telefono: '',
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchAccesos = async () => {
      try {
        const data = await getAccesos();
        setAccesos(data);
      } catch (error) {
        console.error('Error al obtener los accesos', error);
      }
    };
    fetchAccesos();
  }, []);

  useEffect(() => {
    const fetchMesas = async () => {
      try {
        const data = await getMesasByAcceso(tipoAcceso);
        setMesas(data);
      } catch (error) {
        console.error('Error al obtener las mesas', error);
      }
    };
    if (tipoAcceso) {
      fetchMesas();
    }
  }, [tipoAcceso]);

  const getNombreAcceso = (idacceso) => {
    const acceso = accesos.find((a) => a.id === idacceso);
    return acceso ? acceso.nombre : idacceso;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReservationData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleReservationSubmit = async (e) => {
    e.preventDefault();
    const body = {
      idmesa: selectedMesa.id,
      ...reservationData,
    };
    try {
      const result = await createReservation(body);
      console.log('Reserva creada', result);
      navigate(`/detalles-reserva/${result.id}`);
      setSelectedMesa(null);
      setReservationData({
        nombre: '',
        correo: '',
        telefono: '',
      });

      // Actualizar el estado de la mesa reservada a 'reservada'
      setMesas((prev) =>
        prev.map((m) =>
          m.id === selectedMesa.id ? { ...m, estado: 'reservada' } : m
        )
      );
    } catch (error) {
      console.error('Error al crear la reserva', error);
    }
  };

  const closeModal = () => {
    setSelectedMesa(null);
  };

  return (
    <div>
      <Navbar />
      <div className="p-20">
        <h1 className="text-3xl font-bold mb-2">Selecciona tu Mesa</h1>
        <p className="text-gray-500 mb-6">Encuentra la mesa perfecta para tu experiencia</p>

        <div className="mb-4 flex gap-2">
          <button className="px-4 py-2 rounded-md bg-gray-100 text-sm font-medium text-gray-800">Vista Lista</button>
          <button className="px-4 py-2 rounded-md bg-white text-sm font-medium text-gray-400">Vista Visual</button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mesas.map((mesa) => (
            <div
              key={mesa.id}
              onClick={() => mesa.estado.toLowerCase() === 'disponible' && setSelectedMesa(mesa)}
              className={`border rounded-xl p-6 shadow-sm transition cursor-pointer hover:shadow-md ${
                mesa.estado.toLowerCase() !== 'disponible' ? 'opacity-60 cursor-not-allowed' : ''
              }`}
            >
              <div className="flex justify-between items-start mb-2">
                <h2 className="text-lg font-semibold">Mesa {mesa.titulo}</h2>
                <span
                  className={`text-xs font-semibold px-3 py-1 rounded-full ${
                    mesa.estado.toLowerCase() === 'disponible'
                      ? 'bg-green-100 text-green-600'
                      : 'bg-red-100 text-red-600'
                  }`}
                >
                  {mesa.estado.toLowerCase() === 'disponible' ? 'Disponible' : 'Reservada'}
                </span>
              </div>
              <div className="text-sm text-gray-600 space-y-1">
                <p className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Capacidad: {mesa.capacidad} personas
                </p>
                <p className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Disponible desde: {mesa.horainicio}
                </p>
                <p className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  {getNombreAcceso(mesa.acceso)}
                </p>
              </div>
            </div>
          ))}
        </div>

        {selectedMesa && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
              <h2 className="text-xl font-bold mb-4">Reservar Mesa {selectedMesa.titulo}</h2>
              <form onSubmit={handleReservationSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Nombre</label>
                  <input
                    type="text"
                    name="nombre"
                    value={reservationData.nombre}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Correo</label>
                  <input
                    type="email"
                    name="correo"
                    value={reservationData.correo}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Teléfono</label>
                  <input
                    type="tel"
                    name="telefono"
                    value={reservationData.telefono}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                  />
                </div>
                <div className="flex justify-end gap-2 pt-4">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Enviar Reserva
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Mesas;
