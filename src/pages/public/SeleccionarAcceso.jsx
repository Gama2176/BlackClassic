import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAccesos } from '../../utils/ApiMesas'

const SeleccionarAcceso = () => {
  const [accesos, setAccesos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAccesos = async () => {
      try {
        const datos = await getAccesos();
        setAccesos(datos);
      } catch (error) {
        console.error("Error al obtener los accesos", error);
      }
    };
    fetchAccesos();
  }, []);

  return (
    <div>
      <h1>Seleccionar accesos</h1>
      <div>
        {accesos.map((acceso) => (
          <div key={acceso.id}>
            <h2>Acesso {acceso.nombre}</h2>
            <p>{acceso.precio}</p>
            <p>{acceso.descripcion}</p>
            <button onClick={() => navigate("/mesas", { state: { tipoAcceso: acceso.nombre } })}>
              Seleccionar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SeleccionarAcceso;