import React, { useState, useEffect } from 'react';
import { useSearchParams, useLocation, useNavigate } from 'react-router-dom';
import { getMesasByAcceso, getAccesos, createReservation } from '../../utils/ApiMesas';

const Mesas = () => {
  const [searchParams] = useSearchParams();
  const [mesas, setMesas] = useState([]);
  const [accesos, setAccesos] = useState([]);
  const { state } = useLocation();
  const tipoAcceso = state?.tipoAcceso;
  const [selectedMesa, setSelectedMesa] = useState(null);
  const [reservationData, setReservationData] = useState({
    nombre: "",
    correo: "",
    telefono: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchAccesos = async () => {
      try {
        const data = await getAccesos();
        setAccesos(data);
      } catch (error) {
        console.error("Error al obtener los accesos", error);
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
        console.error("Error al obtener las mesas", error);
      }
    };
    if (tipoAcceso) {
      fetchMesas();
    }
  }, [tipoAcceso]);

  const getNombreAcceso = (idacceso) => {
    const acceso = accesos.find(a => a.id === idacceso);
    return acceso ? acceso.nombre : idacceso;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReservationData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleReservationSubmit = async (e) => {
    e.preventDefault();
    const body = {
      idmesa: selectedMesa.id,
      ...reservationData
    };
    try {
      const result = await createReservation(body);
      console.log("Reserva creada", result);
      navigate(`/detalles-reserva/${result.id}`);
      setSelectedMesa(null);
      setReservationData({
        fecha: "",
        horainicio: "",
        horafin: "",
        nombre: "",
        correo: "",
        telefono: "",
      });
    } catch (error) {
      console.error("Error al crear la reserva", error);
    }
  };

  const closeModal = () => {
    setSelectedMesa(null);
  };

  return (
    <div>
      <h1>Mesas para {tipoAcceso}</h1>
      <div>
        {mesas.map((mesa) => (
          <div
            key={mesa.id}
            onClick={() => setSelectedMesa(mesa)}
          >
            <h2>{mesa.titulo}</h2>
            <p>{mesa.estado}</p>
            <p>Capacidad: {mesa.capacidad} personas</p>
            <p>Disponible desde: {mesa.horainicio}</p>
            <p>Tipo: {getNombreAcceso(mesa.acceso)}</p>
          </div>
        ))}
      </div>
      {selectedMesa && (
        <div>
          <div>
            <h2>Reservar {selectedMesa.nombre}</h2>
            <form onSubmit={handleReservationSubmit}>
              {/* Se eliminaron los campos de Fecha, Hora Inicio y Hora Fin */}
              <div>
                <label>Nombre</label>
                <input
                  type="text"
                  name="nombre"
                  value={reservationData.nombre}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label>Correo</label>
                <input
                  type="email"
                  name="correo"
                  value={reservationData.correo}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label>Teléfono</label>
                <input
                  type="tel"
                  name="telefono"
                  value={reservationData.telefono}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <button
                  type="button"
                  onClick={closeModal}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                >
                  Enviar Reserva
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Mesas;