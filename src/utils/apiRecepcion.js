import axios from 'axios';
import { API_BASE } from '../config';

export const validateReserva = async (codigoqr) => {
    try{
        const response = await axios.post(`${API_BASE}/recepcion/validateReserva`, { codigoqr });
        return response.data;
    }catch(error){
        console.error("error al validar la reserva", error);
        throw error;
    }
}

