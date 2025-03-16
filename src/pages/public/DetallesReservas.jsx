import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getReservaById, generateQR } from '../../utils/ApiMesas';

const DetallesReservas = () => {
  const { id } = useParams();
  const [reserva, setReserva] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [qrCode, setQrCode] = useState(null);

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

  const handleShowQR = async () => {
    try {
      const dataQR = await generateQR(id);
      setQrCode(dataQR.qr);
      setShowModal(true);
    } catch (error) {
      console.error("Error al generar el código QR", error);
    }
  };

  const handleDownloadQR = () => {
    const link = document.createElement('a');
    link.href = qrCode;
    link.download = 'codigo_qr.png';
    link.click();
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
            {qrCode ? (
              <img 
                src={qrCode} 
                alt="Código QR" 
              />
            ) : (
              <p>Cargando QR...</p>
            )}
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