import { generateResume } from "../../../service/api/apiPreview"
import useCreate from "../../../hooks/useCreate";
import useFindUser from "../../../hooks/useFindUser";

export default function useReporte() {
    const { data, isLoading, error, succesCreate, handleCreate } = useCreate(generateResume);

    const crearResumen = (data) => {
        handleCreate(data);
    }
    
    console.log(data)
    return {
        data,
        isLoading,
        error,
        crearResumen
    }
}