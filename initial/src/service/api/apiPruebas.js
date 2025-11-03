import { apiClient } from "../apiClient";

export const fetchPruebas= async()=>{
    try {
        const response = await apiClient.get("pruebas/pruebas/");
        return response;
    } catch (error) {
        console.log();
        throw error;
    }
}
export const createPruebas= async(data)=>{
    try {
        const response = await apiClient.post("pruebas/pruebas/",data);
        return response;
    } catch (error) {
        console.log();
        throw error;
    }
}

export const fetchRespuestPrueba = async ()=>{
    try {
        const response = await apiClient.get("pruebas/resultados-pruebas/");
        return response;
    } catch (error) {
        console.log();
        throw error;
    }
}
export const createRespuestPrueba = async (data)=>{
    try {
        const response = await apiClient.post("pruebas/resultados-pruebas/",data);
        return response;
    } catch (error) {
        console.log();
        throw error;
    }
}