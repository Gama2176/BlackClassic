import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getReservaById } from '../../utils/ApiMesas';
import QRModern from '../../components/QRModern';
import { CalendarDays, Users, Clock, MapPin, CheckCircle } from 'lucide-react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const DetallesReservas = () => {
  const { id } = useParams();
  const [reserva, setReserva] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [qrInstance, setQrInstance] = useState(null);

  useEffect(() => {
    const fetchReserva = async () => {
      try {
        const data = await getReservaById(id);
        setReserva(data);
      } catch (error) {
        console.error("Error al obtener la reserva", error);
      }
    };
    fetchReserva();
  }, [id]);

  const handleShowQR = () => setShowModal(true);
  const handleDownloadQR = () => {
    if (qrInstance) {
      qrInstance.download({ extension: "png", name: "codigo_qr" });
    }
  };

  // Loader animado mientras se carga la reserva
  if (!reserva) {
    return (
      <div className="flex items-center justify-center h-screen bg-white">
        <div className="flex space-x-2">
          <span className="w-3 h-3 bg-black rounded-full animate-bounce [animation-delay:-0.3s]"></span>
          <span className="w-3 h-3 bg-black rounded-full animate-bounce [animation-delay:-0.15s]"></span>
          <span className="w-3 h-3 bg-black rounded-full animate-bounce"></span>
        </div>
      </div>
    );
  }
  

  return (
    <div>
      <Navbar />
      <div className="min-h-screen flex flex-col items-center pt-16 px-4 pb-10 bg-white text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-2">¡Reserva Exitosa!</h2>
        <p className="text-gray-500 mb-6">Tu mesa está confirmada en La Buena Mesa</p>

        <div className="bg-white rounded-xl p-6 w-full max-w-xl ">
          <h3 className="text-xl font-semibold mb-4">Detalles de reserva</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left text-gray-700 mb-4">
            <div className="flex items-center gap-2">
              <CalendarDays size={20} /> {reserva.fecha}
            </div>
            <div className="flex items-center gap-2">
              <Clock size={20} /> {reserva.horainicio}
            </div>
            <div className="flex items-center gap-2">
              <Users size={20} /> {reserva.idmesa_mesa.numeroasientos} personas
            </div>
            <div className="flex items-center gap-2">
              <MapPin size={20} /> Calle Principal 123, ciudad
            </div>
          </div>

          <div className="bg-gray-100 rounded-lg py-3 px-4 text-sm text-gray-800 mb-4">
            Número de reserva: <strong>{reserva.codigoqr}</strong>
          </div>

          <p className="text-xs text-gray-400 mb-6">
            Se ha enviado un correo electrónico con los detalles de tu reserva y el código QR.
          </p>

          <button
            onClick={handleShowQR}
            className="bg-black text-white px-5 py-2 rounded-xl text-sm hover:bg-gray-800 transition"
          >
            Ver código QR
          </button>

          <div className="mt-6">
            <Link to="/" className="text-sm text-blue-500 hover:underline">
              Volver a inicio
            </Link>
          </div>
        </div>

        {/* Modal para QR */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl px-6 py-8 w-full max-w-md text-center shadow-2xl">
              <div className="flex justify-center mb-4">
                <CheckCircle size={48} className="text-green-500" />
              </div>
              <h2 className="text-2xl font-bold mb-1">¡Reserva Confirmada!</h2>
              <p className="text-gray-500 text-sm mb-6">Tu mesa está lista en La Buena Mesa</p>
              <div className="flex justify-center mb-6">
                <div className="bg-white p-1 rounded-lg border border-black inline-block w-[150px] h-[150px] flex items-center justify-center">
                  <QRModern data={reserva.codigoqr} qrRefCallback={setQrInstance} />
                </div>
              </div>

              <div className="bg-gray-100 rounded-xl px-6 py-5 text-sm text-gray-800 text-left mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <CalendarDays size={16} /> {reserva.fecha}
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <Clock size={16} /> {reserva.horainicio}
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <Users size={16} /> {reserva.idmesa_mesa.numeroasientos} personas
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <MapPin size={16} /> Calle Principal 123, ciudad
                </div>
                <div className="mt-2">
                  Número de reserva: <strong>{reserva.codigoqr}</strong>
                </div>
              </div>

              <p className="text-xs text-gray-400 mb-6">
                Guarda este código QR, lo necesitarás para validar tu reserva.
              </p>

              <button
                onClick={handleDownloadQR}
                className="bg-black text-white w-full py-2 rounded-xl text-sm font-medium hover:bg-gray-800 transition"
              >
                Descargar QR
              </button>

              <button
                onClick={() => setShowModal(false)}
                className="mt-3 text-sm text-gray-500 hover:underline"
              >
                Cerrar
              </button>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default DetallesReservas;
