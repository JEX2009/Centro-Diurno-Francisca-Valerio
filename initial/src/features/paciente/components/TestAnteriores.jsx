import LoadingSpinner from "../../../components/LoadingSpinner";
import ErrorMessage from "../../../components/ErrorMessage";
import { useState } from "react";
import PopUp from '../../../components/PopUp';
import VerDetalleTest from './VerDetalleTest';

export default function TestAnteriores({ paciente, tests, isLoading, error }) {
    const [modal, setModal] = useState(false)
    const [testSeleccionado, setTestSeleccionado] = useState(null)

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-24">
                <LoadingSpinner />
            </div>
        );
    }
    if (error) {
        return (
            <div className="p-4">
                <ErrorMessage message={error} />
            </div>
        );
    }

    const testList = tests.filter((test) => {
        return paciente.nombre_completo === test.paciente
    })

    const handleTest = (test) => {
        setTestSeleccionado(test);
        setModal(true)
    }

    return (
        <section>
            <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-300 pb-2 mb-4">
                Resultados de Pruebas Anteriores
            </h3>
            <div className="h-96 overflow-y-auto space-y-3 pr-2">
                {testList.length === 0 ? (
                    <div className="flex items-center justify-center h-full text-gray-500 text-sm">
                        <p>No hay test registrados.</p>
                    </div>
                ) : (
                    <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
                        {testList.map((test) => (
                            <div
                                key={test.id}
                                className="bg-white border border-blue-200 rounded-lg p-4 shadow-md hover:shadow-lg hover:border-blue-500 transition duration-300 cursor-pointer"
                                onClick={() => handleTest(test)}
                            >
                                <div className="flex justify-between items-start">
                                    <p className="text-lg font-bold text-blue-700">
                                        {test.prueba}
                                    </p>
                                    <span className="text-sm font-semibold text-gray-600 bg-yellow-100 px-3 py-1 rounded-full">
                                        Puntaje: {test.puntuacion_total}
                                    </span>
                                </div>

                                <p className="text-sm text-gray-700 mt-2">
                                    <span className="font-medium text-gray-900">Evaluado por:</span> {test.usuario}
                                </p>
                                <p className="text-xs text-gray-500 mt-1">
                                    <span className="font-medium">Fecha de Evaluación:</span> {test.fecha_evaluacion}
                                </p>

                                <div className="mt-3 pt-3 border-t border-gray-100">
                                    <p className="text-sm text-gray-800 italic truncate">
                                        Observación: {test.observaciones || 'Sin observaciones.'}
                                    </p>
                                </div>

                            </div>
                        ))}
                    </div>
                )}

            </div>
            <PopUp isModalOpen={modal} closeModal={() => setModal(false)}>
                {testSeleccionado && (
                    <VerDetalleTest test={testSeleccionado} />
                )}
            </PopUp>
        </section>
    )
}


