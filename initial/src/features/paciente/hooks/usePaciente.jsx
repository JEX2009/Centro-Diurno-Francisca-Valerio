
import { fetchPaciente, updatePaciente, createPacient, deletePacient } from "../../../service/api/apiPaciente";
import { fetchCitaFinal } from "../../../service/api/apiCita";
import useFeatch from '../../../hooks/useFeatch'
import useUpdate from "../../../hooks/useUpdate";
import useCreate from "../../../hooks/useCreate";
import useFindUser from "../../../hooks/useFindUser";
import { useState } from "react";


export default function usePaciente() {
    const { data, isLoading, error, refetch } = useFeatch(fetchPaciente);
    const { data: dataUpdate, error: errorUpdate, succesUpdate, handleUpdate } = useUpdate(updatePaciente);
    const { data: dataCreate, error: errorCreate, succesCreate, handleCreate } = useCreate(createPacient,refetch);
    const { data: dataUser, } = useFindUser();
    const {data:dataCita} = useFeatch(fetchCitaFinal);

    const [searchTerm, setSearchTerm] = useState("")

    const EditPaciente = async (paciente_id, data) => {
        try {
            await handleUpdate(paciente_id, data);
            refetch();

        } catch (updateError) {
            console.error();
        }
    }
    const DeletePaciente = async (paciente_id, data) => {
        const sendData = {
            'motivo': data,
            'id_usuario': dataUser.id
        }
        try {
            await deletePacient(paciente_id, sendData);
            refetch();

        } catch (updateError) {
            console.error("Error al actualizar el paciente:", updateError);
        }
    }

    const CreatePaciente = async (data) => {
        try {
            await handleCreate(data);
        } catch (err) {
            console.error("Error al crear el paciente:", errorCreate);
        }
    }


    const listaObjetos = data?.data || [];


    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredSearch = listaObjetos.filter(objeto => {
        {
            const esNumero = !isNaN(Number(searchTerm.trim()));
            
            const resultado = esNumero
                ? // Búsqueda por Cédula: Asegura que cedula exista antes de llamar a toLowerCase()
                objeto.cedula?.includes(searchTerm.toLowerCase())
                : // Búsqueda por Nombre: Asegura que nombre_completo exista
                objeto.nombre_completo?.toLowerCase().includes(searchTerm.toLowerCase());
            return resultado;
        }
    }
    );

    return {
        data, isLoading, error, DeletePaciente, EditPaciente, errorUpdate, CreatePaciente, searchTerm, handleSearchChange, filteredSearch,dataCita
    }
}