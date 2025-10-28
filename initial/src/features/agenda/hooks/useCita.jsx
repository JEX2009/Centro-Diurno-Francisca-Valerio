import { useState } from "react"
import { createCita, fetchCita,createCitaFinal,updateCita,fetchTerapia} from "../../../service/api/apiCita"
import useCreate from "../../../hooks/useCreate"
import { fetchPaciente } from "../../../service/api/apiPaciente";
import useFeatch from '../../../hooks/useFeatch'
import useUpdate from '../../../hooks/useUpdate'
import useFindUser from "../../../hooks/useFindUser";

export default function useCita() {
    const { data: dataPaciente, isLoading: isLoadingPaciente, error: errorPaciente, refetch } = useFeatch(fetchPaciente);
    const { data: dataCita, isLoading: isLoadingCita, error: errorCita, refetch: refetchCita } = useFeatch(fetchCita);
    const { data:dataCitaFinal, isLoading:isLoadingCitaFinal, error:errorCitaFinal, succes:CitaFinal, handleCreate:handleCreateCitaFinal } = useCreate(createCitaFinal,refetchCita);
    const { data, isLoading, error, succes, handleCreate } = useCreate(createCita,refetchCita);
    const { data: dataTerpia} = useFeatch(fetchTerapia);
    const { data: dataUser, } = useFindUser();
    const { data: dataUpdateCita ,handleUpdate} = useUpdate(updateCita);
    const pacientes = dataPaciente.data || [];

    const generarCita = async (data) => {
        const newData = { ...data, usuario: dataUser.id }
        await handleCreate(newData);
    }

    const onSubmit = async(data, citaId) => {
        const dataFinal = {...data, cita: citaId.id};
        await handleCreateCitaFinal(dataFinal);
    }

    const añadirAusencia = async(citaId,data)=>{
        await handleUpdate(citaId,data);
        refetchCita();
    }


    return { data, isLoading, error, succes, generarCita, pacientes, dataCita, isLoadingCita, errorCita, onSubmit,añadirAusencia,dataTerpia}
}