import {fetchPruebas,createPruebas,createRespuestPrueba} from "../../../service/api/apiPruebas"
import {fetchPaciente} from "../../../service/api/apiPaciente"
import useCreate from "../../../hooks/useCreate"
import useFeatch from "../../../hooks/useFeatch"
import useFindUser from "../../../hooks/useFindUser";

export default function useTests(){
    const { data, isLoading, error, refetch } = useFeatch(fetchPruebas);
    const { data:dataPacientes, isLoading:isLoadingPacientes, error:errorPacientes } = useFeatch(fetchPaciente);
    const { data: dataCreate, error: errorCreate, succesCreate, handleCreate} = useCreate(createPruebas, refetch);
    const { data: dataCreateRespuesta, error: errorCreateRespuesta, succesCreateRespuesta, handleCreate:handleCreateRespuesta} = useCreate(createRespuestPrueba);
    const { data: dataUser, } = useFindUser();
    

    const pruebas =data.data||[];
    const pacientes = dataPacientes.data ||[];

    const crearTest =(data)=>{
        handleCreate(data)
    } 
    return{pruebas,pacientes,crearTest,isLoading, error,errorCreate,succesCreate,dataUser,error: errorCreateRespuesta, succesCreateRespuesta, handleCreate:handleCreateRespuesta}
}