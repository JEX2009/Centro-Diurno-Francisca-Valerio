
import {fetchPaciente, updatePaciente, createPacient,deletePacient} from "../../../service/api/apiPaciente"
import useFeatch from '../../../hooks/useFeatch'
import useUpdate from "../../../hooks/useUpdate";
import useCreate from "../../../hooks/useCreate";
import useFindUser from "../../../hooks/useFindUser";

export default function usePaciente(){
    const {data, isLoading, error, refetch} = useFeatch(fetchPaciente);
    const {data:dataUpdate, error:errorUpdate, succesUpdate, handleUpdate} =useUpdate(updatePaciente);
    const {data:dataCreate, error:errorCreate, succesCreate, handleCreate} =useCreate(createPacient);
    const {data:dataUser, } =useFindUser();
    const EditPaciente = async (paciente_id, data) => {
        try {
            await handleUpdate(paciente_id, data);
            refetch();

        } catch (updateError) {
            console.error("Error al actualizar el paciente:", updateError);
        }
    }
    const DeletePaciente = async(paciente_id, data) => {
        const sendData ={
            'motivo':data,
            'id_usuario':dataUser.id
        }
        console.log(sendData)
        try {
            await deletePacient(paciente_id, sendData);
            refetch();

        } catch (updateError) {
            console.error("Error al actualizar el paciente:", updateError);
        }
    }

    const CreatePaciente = async(data)=>{
        try {
            await handleCreate(data);
            refetch();

        } catch (err) {
            console.error("Error al crear el paciente:", errorCreate);
        }
    }


    return{
        data, isLoading,error,DeletePaciente,EditPaciente,errorUpdate,CreatePaciente
    }
}