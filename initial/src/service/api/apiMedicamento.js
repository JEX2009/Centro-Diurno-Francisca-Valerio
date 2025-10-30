import { apiClient } from '../apiClient';

export const featchMedicamento = ()=>{
    try {
        const response = apiClient.get("medicamentos/medicamento/");
        return response
    } catch (error) {
        console.log()
        throw error;
    }
}

export const createMedicamento = (data)=>{
    try {
        const response = apiClient.post("medicamentos/medicamento/", data);
        return response
    } catch (error) {
        console.log()
        throw error;
    }
}
export const deleteMedicamento = (id)=>{
    try {
        const response = apiClient.delete("medicamentos/medicamento/"+ id + "/");
        return response
    } catch (error) {
        console.log()
        throw error;
    }
}