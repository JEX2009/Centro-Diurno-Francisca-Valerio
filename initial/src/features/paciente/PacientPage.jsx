import usePaciente from "./hooks/usePaciente"
import LoadingSpinner from "../../components/LoadingSpinner"
import ErrorMessage from "../../components/ErrorMessage"
import useFindUser from "../../hooks/useFindUser"
import TarjetaPaciente from './components/TarejetaPaciente'
import CreatePacient from './components/CreatePacient'
import PopUp from '../../components/PopUp'
import { useState } from "react"

export default function PacientPage() {
    const { data, isLoading, error, DeletePaciente, EditPaciente, errorUpdate,CreatePaciente } = usePaciente();
    const {data:userData,isLoading:isLoadingUser,error:userError}=useFindUser()
    const [modal,setModal]=useState()
    if (isLoading) {
        return (<LoadingSpinner />);
    }
    if (error || errorUpdate) {
        return <ErrorMessage message={error !== null ? error : errorUpdate} />
    }
    const pacientes = data.data

    return (
        <>
            <div className="grid grid-cols-2">
                <div className="justify-self-end ">
                    <h2 className="text-2xl font-bold text-center mb-6">Pacientes</h2>
                </div>
                <div className="justify-self-end ">
                    <button onClick={()=> setModal(true)} className="mr-10 bg-yellow-300 rounded-lg p-2 shadow shadow-xl cursor-pointer text-1xl text-bold">Crear Paciente</button>
                </div>
            </div>
            <div class="max-w-3xl mx-auto mt-6 px-4">
                {pacientes.map((paciente) => (
                    <TarjetaPaciente
                        paciente={paciente}
                        key={paciente.id}
                        EditPaciente={EditPaciente}
                        DeletePaciente={DeletePaciente}
                        userData={userData}
                    />
                ))}
            </div>
            <PopUp isModalOpen={modal} closeModal={()=>setModal(false)}>
                <CreatePacient
                    CreatePaciente={CreatePaciente}
                    closeModal={()=>setModal(false)}
                />
            </PopUp>
        </>
    )
}