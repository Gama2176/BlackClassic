import React, { useState, useEffect } from 'react'
import QrScanner from 'react-weblineindia-qrcode-scanner';
import { validateReserva } from '../../utils/apiRecepcion'

const Recepcion = () => {
  const [qrData, setQrData] = useState(null);
  const [validationResult, setValidationResult] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Inyección de la regla @keyframes en el head del documento
    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes scan {
        0% { top: 0; }
        50% { top: calc(100% - 4px); }
        100% { top: 0; }
      }
    `;
    document.head.appendChild(style);
    
    // Limpieza al desmontar el componente
    return () => {
      document.head.removeChild(style);
    }
  }, []);

  const handleScan = async (data) => {
    if (data) {
      setQrData(data);
      try {
        const result = await validateReserva(data);
        setValidationResult(result);
        setError(null);
      } catch (error) {
        console.error("Error al validar la reserva", error);
        setError("Error al validar la reserva");
      }
    } else {
      // Si se elimina el código QR, reiniciamos el estado
      setQrData(null);
      setValidationResult(null);
      setError(null);
    }
  }

  const handleError = (error) => {
    console.error("Error al escanear el QR", error);
    setError("Error acceder a la cámara");
  }

  // Estilo en línea para la línea escaneada
  const scanningLineStyle = {
    position: 'absolute',
    left: 0,
    right: 0,
    height: '4px',
    backgroundColor: 'rgba(0, 255, 0, 0.7)',
    animation: 'scan 2s infinite',
    animationPlayState: qrData ? 'paused' : 'running'
  }
  
  return (
    <div>
      <h1>Recepcion</h1>
      <div style={{ position: 'relative', width: '30%' }}>
        <QrScanner 
          onScan={handleScan}
          onError={handleError}
          facingMode="environment"
          style={{ width: "100%" }}
        />
        <div style={scanningLineStyle} />
      </div>
      {qrData && <p>QR Data: {qrData}</p>}
      {validationResult && <p>Resultado de la validacion: {JSON.stringify(validationResult)}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <p>Esta es la pagina de recepcion</p>
    </div>
  )
}

export default Recepcion