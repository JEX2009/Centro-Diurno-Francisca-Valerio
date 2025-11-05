import {apiClient} from "../apiClient"

export const generateResume = async (data)=>{
    try {
        const response = await apiClient.post('reportes/reporte/generate-preview/', data);
        return response.data;
    } catch (error) {
        console.log();
        throw error;
    }
}