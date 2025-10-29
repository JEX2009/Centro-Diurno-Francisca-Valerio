import { apiClient } from '../apiClient';

export const fetchCaso = async () => {
    try {
        const response = await apiClient.get("casos/caso/");
        return response;
    } catch (error) {   
        console.log();
        throw error;
    }
}
export const createCaso = async (data) => {
    try {
        const response = await apiClient.post("casos/caso/", data);
        return response;
    } catch (error) {   
        console.log();
        throw error;
    }
}