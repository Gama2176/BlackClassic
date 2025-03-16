import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getReservaById } from '../../utils/ApiMesas';
import QRModern from '../../components/QRModern';

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

  // Ahora se usa el código de la reserva para generar el QR de forma local
  const handleShowQR = () => {
    setShowModal(true);
  };

  const handleDownloadQR = () => {
    if (qrInstance) {
      qrInstance.download({ extension: "png", name: "codigo_qr" });
    }
  };

  if (!reserva) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      <h2>Detalles de tu reserva!</h2>
      <p>Fecha: {reserva.fecha}</p>
      <p>Hora: {reserva.horainicio}</p>
      <p>Personas: {reserva.idmesa_mesa.numeroasientos}</p>
      <p>Ubicación: ubicacion falta etc.</p>
      <p>Número de reserva: {reserva.codigoqr}</p>
      <p>Se envió el código QR a su correo.</p>
      <button onClick={handleShowQR}>Ver código QR</button>
      <div>
        <Link to="/">Volver a Inicio</Link>
      </div>

      {showModal && (
        <div>
          <div>
            <h2>¡Reserva confirmada!</h2>
            {/* El componente QRModern genera el QR y guarda la instancia en qrInstance */}
            <QRModern data={reserva.codigoqr} qrRefCallback={setQrInstance} />
            <div>
              <p>Fecha: {reserva.fecha}</p>
              <p>Hora: {reserva.horainicio}</p>
              <p>Personas: {reserva.idmesa_mesa.numeroasientos}</p>
              <p>Ubicación: ubicacion falta etc.</p>
              <p>Número de reserva: {reserva.codigoqr}</p>
            </div>
            <button onClick={handleDownloadQR}>
              Descargar código QR
            </button>
            <br/>
            <button onClick={() => setShowModal(false)}>
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetallesReservas;