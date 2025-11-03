import LoadingSpinner from "../../components/LoadingSpinner"
import ErrorMessage from "../../components/ErrorMessage"
import SuccessMessage from "../../components/SuccessMessage"
import SeleccionarPacienteModal from "./components/SeleccionarPacienteModal"
import EjecutarPrueba from "./components/EjecutarPrueba"
import CreateTest from "./components/CreateTest"
import { useState } from "react";
import useTests from "./hooks/useTests";
import PopUp from '../../components/PopUp'

export default function TestPage() {
    const { pruebas, pacientes, crearTest, isLoading, error, errorCreate, succesCreate, dataUser, error: errorCreateRespuesta, succesCreateRespuesta, handleCreate: handleCreateRespuesta } = useTests();

    const [modalCrearTest, setModalCrearTest] = useState(false);
    const [modalElegirPaciente, setModalElegirPaciente] = useState(false);
    const [ejecutandoTest, setEjecutandoTest] = useState(false);
    const [pruebaSeleccionada, setPruebaSeleccionada] = useState(null);
    const [pacienteSeleccionado, setPacienteSeleccionado] = useState(null);

    if (isLoading) {
        return <LoadingSpinner />
    }
    if (error) {
        return <ErrorMessage message={error} />
    }

    const handleSeleccionarPrueba = (prueba) => {
        setPruebaSeleccionada(prueba);
        setModalElegirPaciente(true);
    }

    const handleIniciarTest = (paciente) => {
        setPacienteSeleccionado(paciente);
        setModalElegirPaciente(false);
        setEjecutandoTest(true);
    }

    const handleTestGuardado = () => {
        setEjecutandoTest(false);
        setPruebaSeleccionada(null);
        setPacienteSeleccionado(null);
    }

    const handleTestCreado = () => {
        setModalCrearTest(false);
    }

    if (ejecutandoTest && pruebaSeleccionada && pacienteSeleccionado) {
        return (
            <EjecutarPrueba
                prueba={pruebaSeleccionada}
                pacienteId={pacienteSeleccionado.id}
                usuarioId={dataUser.id}
                onResultadoGuardado={handleTestGuardado}
                handleCreateRespuesta={handleCreateRespuesta}
            />
        );
    }

    return (
        <div className="p-6">
            <header className="flex justify-between items-center mb-8 border-b pb-4">
                <h1 className="text-3xl font-bold text-blue-700">Seleccionar Test para Pacientes</h1>
                <button
                    onClick={() => setModalCrearTest(true)}
                    className="bg-purple-600 text-white py-2 px-4 rounded-lg shadow hover:bg-purple-700 transition"
                >
                    Crear Nueva Plantilla
                </button>
            </header>

            {succesCreate && <SuccessMessage message="Plantilla de prueba creada con éxito." />}
            {errorCreate && <ErrorMessage message={`Error al crear plantilla: ${errorCreate}`} />}

            {/* Mensajes de retroalimentación para la creación de respuestas */}
            {succesCreateRespuesta && <SuccessMessage message="Resultado de la prueba guardado con éxito." />}
            {errorCreateRespuesta && <ErrorMessage message={`Error al guardar resultado: ${errorCreateRespuesta}`} />}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {pruebas && pruebas.length > 0 ? (
                    pruebas.map((prueba) => (
                        <div
                            key={prueba.id}
                            onClick={() => handleSeleccionarPrueba(prueba)}
                            className="p-5 border border-gray-200 rounded-xl shadow-lg cursor-pointer bg-white hover:shadow-xl hover:border-blue-400 transition duration-300"
                        >
                            <h2 className="text-xl font-semibold text-gray-800">{prueba.nombre}</h2>
                            <p className="text-sm text-blue-600 mt-1">Categoría: {prueba.categoria}</p>
                            <p className="text-xs text-gray-500 mt-3">Click para iniciar la evaluación.</p>
                        </div>
                    ))
                ) : (
                    <p className="col-span-3 text-center text-gray-500">No hay plantillas de pruebas disponibles.</p>
                )}
            </div>

            <PopUp isModalOpen={modalCrearTest} closeModal={() => setModalCrearTest(false)}>
                <CreateTest
                    crearTest={crearTest}
                    closeModal={handleTestCreado}
                />
            </PopUp>

            <PopUp isModalOpen={modalElegirPaciente} closeModal={() => setModalElegirPaciente(false)}>
                <SeleccionarPacienteModal
                    pacientes={pacientes}
                    closeModal={() => setModalElegirPaciente(false)}
                    onPacienteSeleccionado={handleIniciarTest}
                />
            </PopUp>
        </div>
    );
}