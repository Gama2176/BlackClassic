import axios from 'axios';
import { API_BASE } from '../config';

export const getAccesos = async () => {
    try{
        const response = await axios.get(`${API_BASE}/accesos/all`);
        return response.data;
    } catch(error){
        console.error("error al tener los datos de accesos", error);
        throw error;
    }
};

export const getMesasByAcceso = async (tipoAcceso) => {
    try{
        const response = await axios.get(`${API_BASE}/mesas`, { params: { tipoAcceso } });
        return response.data;
    } catch(error){
        console.error("error al obtener las mesas por acceso", error);
        throw error;
    }
};

export const createReservation = async (reservationData) => {
    try{
        const response = await axios.post(`${API_BASE}/reservas/create`, reservationData);
        return response.data;
    }catch(error){
        console.error("error al crear la reserva", error);
        throw error;
    }
 
};

export const getReservaById = async (id) => {
    try{
        const response = await axios.get(`${API_BASE}/reservas/${id}`);
        return response.data;

    }catch(error){
        console.error("error al obtener la reserva por id", error);
        throw error;
    }
};

export const generateQR = async (id) => {
    try{
        const response = await axios.get(`${API_BASE}/reservas/qr/${id}`);
        return response.data;

    }catch(error){
        console.error("error al generar el codigo qr", error);
        throw error;
    }
};