import usePaciente from "./hooks/usePaciente"
import LoadingSpinner from "../../components/LoadingSpinner"
import ErrorMessage from "../../components/ErrorMessage"
import useFindUser from "../../hooks/useFindUser"
import TarjetaPaciente from './components/TarejetaPaciente'
import CreatePacient from './components/CreatePacient'
import PopUp from '../../components/PopUp'
import { useState } from "react"

export default function PacientPage() {
    const { data, isLoading, error, DeletePaciente, EditPaciente, errorUpdate, CreatePaciente, searchTerm, handleSearchChange, filteredSearch, dataCita } = usePaciente();
    const { data: userData, isLoading: isLoadingUser, error: userError } = useFindUser()
    const [modal, setModal] = useState()


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
                <h1 className="text-3xl font-extrabold text-blue-800 mb-8 border-b pb-2">
                    Pacientes
                </h1>

                <div className="justify-self-end ">
                    <button onClick={() => setModal(true)} className="mr-10 bg-yellow-300 rounded-lg p-2 shadow shadow-xl cursor-pointer text-1xl text-bold">Crear Paciente</button>
                </div>

                <div className="col-span-2">
                    <div className="w-full sm:w-3/4 md:w-1/2 lg:w-1/3 mx-auto mb-4">
                        <input
                            type="text"
                            className='border border-gray-700 rounded-xl w-full p-3 '
                            onChange={handleSearchChange}
                            placeholder="Agrega el nombre o la cedula del paciente..."
                            value={searchTerm}
                        />
                    </div>
                </div>
            </div>
            {searchTerm !== "" ? (
                <div class="max-w-3xl mx-auto mt-6 px-4">
                    {filteredSearch.map((paciente) => (
                        <TarjetaPaciente
                            citas={dataCita}
                            paciente={paciente}
                            key={paciente.id}
                            EditPaciente={EditPaciente}
                            DeletePaciente={DeletePaciente}
                            userData={userData}
                        />
                    ))}
                </div >
            ) : (
                <>
                    <div class="max-w-3xl mx-auto mt-6 px-4">
                        {pacientes.map((paciente) => (
                            <TarjetaPaciente
                                citas={dataCita}
                                paciente={paciente}
                                key={paciente.id}
                                EditPaciente={EditPaciente}
                                DeletePaciente={DeletePaciente}
                                userData={userData}
                            />
                        ))}
                    </div >
                </>
            )
            }



            <PopUp isModalOpen={modal} closeModal={() => setModal(false)}>
                <CreatePacient
                    CreatePaciente={CreatePaciente}
                    closeModal={() => setModal(false)}
                />
            </PopUp>
        </>
    )
}