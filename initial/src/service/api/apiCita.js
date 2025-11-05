import { apiClient } from '../apiClient';


//_______________________Apartado Cita___________________________________
export const createCita = async (data) => {
    try {
        const response = await apiClient.post('citas/cita/', data);
        return response;
    } catch (error) {
        console.log(); 
        throw error;
    }
}

export const fetchCita = async () => {
    try {
        const response = await apiClient.get('citas/cita/')
        return response;
    } catch (error) {
        console.log(); 
        throw error;
    }
}

export const updateCita = async (idCita, data)=>{
    try {
        const response = await apiClient.patch('citas/cita/' + idCita+"/", data)
        return response;

    } catch (error) {
        console.log(); 
        throw error;
    }
}


//_______________________Apartado Terminar Cita___________________________________

export const fetchCitaFinal = async ()=>{
    try {
        const response = await apiClient.get('citas/completar_cita/')
        return response;
    } catch (error) {
        console.log(); 
        throw error;
    }
}
export const createCitaFinal = async (data)=>{
    try {
        const response = await apiClient.post('citas/completar_cita/', data)
        return response;
    } catch (error) {
        console.log(); 
        throw error;
    }
}

//_______________________Apartado Terapia___________________________________

export const fetchTerapia = async ()=>{
    try {
        const response = await apiClient.get('citas/tipo-terapia/')
        return response;
    } catch (error) {
        console.log(); 
        throw error;
    }
}

export const createTerapia = async (data)=>{
    try {
        const response = await apiClient.post('citas/tipo-terapia/', data)
        return response;
    } catch (error) {
        console.log(); 
        throw error;
    }
}