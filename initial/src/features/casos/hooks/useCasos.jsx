import {fetchCaso,createCaso} from "../../../service/api/apiCasos"
import {fetchPaciente} from "../../../service/api/apiPaciente"
import useFeatch from "../../../hooks/useFeatch"
import useCreate from "../../../hooks/useCreate"
import useFindUser from "../../../hooks/useFindUser";


export default function useCasos(){
    const { data, isLoading, error, refetch } = useFeatch(fetchCaso);
    const { data:dataPaciente, isLoading:isLoadingPaciente} = useFeatch(fetchPaciente);
    const { isLoading:isLoadinCreate, error:errorCreate, succes, handleCreate} = useCreate(createCaso,refetch);
    const { data: dataUser } = useFindUser();

    const pacientes = dataPaciente.data || [];

    const crearCaso =(data)=>{
        const newData = {...data, usuario:dataUser.id};
        handleCreate(newData);
    }

    return {data, isLoading, error,isLoadinCreate,errorCreate,succes,crearCaso, pacientes,isLoadingPaciente}
}