import axios from 'axios';

export const fetchPaciente = async()=>{
    try {
        const response = await axios.get('http://localhost:8000/api/v1/pacientes/paciente/');
        return response;
    } catch (error) {
        console.log();
        throw error;
    }
}

export const updatePaciente = async ( paciente_id,data)=>{
    try {
        const response = await axios.patch('http://localhost:8000/api/v1/pacientes/paciente/'+paciente_id + '/', data);
        return response.data;
    } catch (error){
        console.log();
        throw error;
    }
}

export const createPacient = async (data)=>{
    try {
        const response = await axios.post('http://localhost:8000/api/v1/pacientes/paciente/', data);
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
        const response = await axios.delete(
            'http://localhost:8000/api/v1/pacientes/paciente/' + paciente_id + '/', 
            config 
        );
        
        return response.data;
    } catch (error){
        console.log();
        throw error;
    }
}