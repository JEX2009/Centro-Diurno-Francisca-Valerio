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
        console.log()
        throw error;
    }
}