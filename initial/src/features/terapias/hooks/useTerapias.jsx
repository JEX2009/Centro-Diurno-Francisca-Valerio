import {fetchTerapia,createTerapia} from "../../../service/api/apiCita"
import useCreate from "../../../hooks/useCreate"
import useFeatch from "../../../hooks/useFeatch"
export default function useTerapias(){
    const {data:dataTerapia, isLoading:isLoadingTerapia, error:errorTerapia, refetch} = useFeatch(fetchTerapia)
    const {data, isLoading, error, succes, handleCreate} = useCreate(createTerapia, refetch)
    const terapias = dataTerapia.data
    const crearTerapia =async(data)=>{
        await handleCreate(data);

    }

    return{terapias,isLoadingTerapia,errorTerapia,crearTerapia,isLoading,succes}

}