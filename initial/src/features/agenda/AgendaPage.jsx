import AgendaTable from "./components/AgendaTable"
import useCita from "./hooks/useCita"
import LoadingSpinner from "../../components/LoadingSpinner"
import ErrorMessage from "../../components/ErrorMessage"
import ShowCitas from "./components/ShowCitas"
import { AgendaProvider } from "./context/AgendaContext"

export default function AgendaPage() {
    const { data, isLoading, error, succes, generarCita, pacientes, dataCita, isLoadingCita, errorCita,onSubmit,añadirAusencia,dataTerpia} = useCita();

    if (isLoadingCita) {
        return <LoadingSpinner />
    }
    if (errorCita) {
        return <ErrorMessage />
    }

    return (
        <AgendaProvider>
            <div className="grid grid-cols-2">
                <ShowCitas
                    citas={dataCita.data}
                    onSubmit={onSubmit}
                    añadirAusencia={añadirAusencia}
                    dataTerpia={dataTerpia}
                />
                <div>
                    <AgendaTable
                        data={data}
                        isLoading={isLoading}
                        error={error}
                        succes={succes}
                        generarCita={generarCita}
                        pacientes={pacientes}
                    />
                </div>
            </div>
        </AgendaProvider>
    )
}