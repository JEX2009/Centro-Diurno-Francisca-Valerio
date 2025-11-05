import { apiClient } from '../apiClient';


export const fetchPaciente = async()=>{
    try {
        const response = await apiClient.get('pacientes/paciente/');
        return response;
    } catch (error) {
        console.log();
        throw error;
    }
}

export const updatePaciente = async ( paciente_id,data)=>{
    try {
        const response = await apiClient.patch('pacientes/paciente/'+paciente_id + '/', data);
        return response.data;
    } catch (error){
        console.log();
        throw error;
    }
}

export const createPacient = async (data)=>{
    try {
        const response = await apiClient.post('pacientes/paciente/', data);
        return response.data;
    } catch (error) {
        console.log();
        throw error;
    }
}

export const deletePacient = async (paciente_id, data)=>{
    try {
        const config = {
            data: data 
        };
        const response = await apiClient.delete(
            'pacientes/paciente/' + paciente_id + '/', 
            config 
        );
        
        return response.data;
    } catch (error){
        console.log();
        throw error;
    }
}

export const fetchEpicrisis = async()=>{
    try {
        const response = await apiClient.get('pacientes/epicrisis/');
        console.log(response)
        return response;
    } catch (error) {
        console.log();
        throw error;
    }
}

export const createEpicrisis = async (data)=>{
    try {
        const response = await apiClient.post('pacientes/epicrisis/', data);
        return response.data;
    } catch (error) {
        console.log();
        throw error;
    }
}