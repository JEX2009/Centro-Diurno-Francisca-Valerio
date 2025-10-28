import { apiClient } from "./../apiClient"
import axios from 'axios';

export const fetchLogin = async (username, password) => {
    try {
        const response = await axios.post('http://localhost:8000/api/token/', {
            username,
            password,
        });

        localStorage.setItem('access_token', response.data.access);
        localStorage.setItem('refresh_token', response.data.refresh);

        apiClient.defaults.headers.common['Authorization'] = `Bearer ${response.data.access}`;

        return response.data;
    } catch (error) {
        console.error('Error en el inicio de sesión:', error);
        throw error;
    }
};

export const featchUser = async (user_id) => {
    try {
        const response = await apiClient.get('usuarios/usuario/'+user_id + '/' );
        return response.data;
    } catch (error){
        console.log()
        throw error;
    }
}

export const  updateUser = async (user_id, data) => { 
    try {
        const response = await apiClient.patch('usuarios/usuario/'+user_id + '/', data);
        return response.data;
    } catch (error){
        console.log()
        throw error;
    }
}

export const createUser = async (data)=>{
    try {
        const response = await apiClient.post('usuarios/usuario/', data);
        return response.data;
    } catch (error){
        console.log()
        throw error;
    }
}