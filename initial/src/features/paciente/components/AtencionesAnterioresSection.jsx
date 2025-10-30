export default function AtencionesAnterioresSection({ paciente, citas }) {
    const dataCitas = citas.data
    const citasPaciente = dataCitas.filter((cita) => {
        return cita.cita.paciente.id === paciente.id
    })

    return (
        <section>
            <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-300 pb-2 mb-4">
                Atenciones Anteriores
            </h3>
            <div className="h-96 overflow-y-auto space-y-3 pr-2">
                {citasPaciente.length > 0 ? (
                    citasPaciente.map((atencion) => (
                        <div 
                            key={atencion.id} 
                            className="bg-gray-50 border border-gray-200 rounded-lg p-3 shadow-sm"
                        >
                            <p className="text-sm font-semibold text-gray-700">
                                Fecha: {atencion.cita.fecha}
                            </p>
                            <p className="text-sm text-gray-600 mt-1">
                                <span className="font-medium text-gray-800">Dolor:</span> {atencion.dolor_localizacion}
                            </p>
                            <p className="text-sm text-gray-600 mt-1">
                                <span className="font-medium text-gray-800">Procedimiento:</span> {atencion.procedimiento}
                            </p>
                        </div>
                    ))
                ) : (
                    <div className="flex items-center justify-center h-full text-gray-500 text-sm">
                        <p>No hay atenciones registradas.</p>
                    </div>
                )}
            </div>
        </section>
    )
}