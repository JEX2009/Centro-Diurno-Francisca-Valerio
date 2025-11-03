import { fetchResponsable, createResponsable } from "../../../service/api/apiResponsable"
import useFeatch from '../../../hooks/useFeatch';
import useCreate from "../../../hooks/useCreate"

export default function useResponsable() {
    const { data, isLoading, error, refetch } = useFeatch(fetchResponsable);
    const { data: dataCreate, error: errorCreate, succesCreate, handleCreate } = useCreate(createResponsable, refetch);

    const responsables = data.data || [];

    const crearResponsable = (data)=>{
        handleCreate(data)
    }


    return {
        responsables,
        isLoading,
        error,
        succesCreate,
        errorCreate,
        crearResponsable
    }
}