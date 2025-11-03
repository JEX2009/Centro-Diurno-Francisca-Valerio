import { apiClient } from "../apiClient";

export const fetchResponsable = async ()=>{
    try {
        const response =  await apiClient.get("encargados/encargado/");
        return response;
    } catch (error) {
        console.log();
        throw error;
    }
}
export const createResponsable = async (data)=>{
    try {
        const response =  await apiClient.post("encargados/encargado/",data);
        return response;
    } catch (error) {
        console.log();
        throw error;
    }
}