import usePaciente from "./hooks/usePaciente"
import LoadingSpinner from "../../components/LoadingSpinner"
import ErrorMessage from "../../components/ErrorMessage"
import SuccessMessage from "../../components/SuccessMessage"
import TarjetaPaciente from './components/TarejetaPaciente'

export default function PacientPage() {
    const { data, isLoading, error, EditPaciente, DeletePaciente } = usePaciente();
    if (isLoading) {
        return (<LoadingSpinner />);
    }
    if (error) {
        <ErrorMessage message={error} />
    }
    const pacientes = data.data

    return (
        <>
            <h2 className="text-2xl font-bold text-center mb-6">Pacientes</h2>

            <div class="max-w-3xl mx-auto mt-6 px-4">
                {pacientes.map((paciente) => (
                    <TarjetaPaciente
                        paciente={paciente}
                        key={paciente.id}
                        EditPaciente={EditPaciente}
                        DeletePaciente={DeletePaciente}
                    />
                ))}
            </div>
        </>
    )
}