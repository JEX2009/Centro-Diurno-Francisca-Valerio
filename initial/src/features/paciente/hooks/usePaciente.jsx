
import {fetchPaciente, updatePaciente} from "../../../service/api/apiPaciente"
import useFeatch from '../../../hooks/useFeatch'
import useUpdate from "../../../hooks/useUpdate";

export default function usePaciente(){
    const {data, isLoading, error, refetch} = useFeatch(fetchPaciente);
    const {data:dataUpdate, isLoading:isLoadingUpdate, error:errorUpdate, succesUpdate, handleUpdate} =useUpdate(updatePaciente);
    const EditPaciente = async (paciente_id, data) => {
        try {
            await handleUpdate(paciente_id, data);
            refetch();

        } catch (updateError) {
            // Opcional: manejar el error de actualización si lo hubiera
            console.error("Error al actualizar el paciente:", updateError);
        }
    }
    const DeletePaciente = async(paciente_id, data) => {
        try {
            await handleUpdate(paciente_id, data);
            refetch();

        } catch (updateError) {
            console.error("Error al actualizar el paciente:", updateError);
        }
    }
    return{
        data, isLoading,error,DeletePaciente,EditPaciente,dataUpdate,isLoadingUpdate,errorUpdate,succesUpdate
    }
}