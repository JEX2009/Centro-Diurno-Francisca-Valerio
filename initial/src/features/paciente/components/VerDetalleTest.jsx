export default function VerDetalleTest({ test }) {
    return (
        <div className="p-4 w-full max-w-xl bg-white">
            <h3 className="text-2xl font-bold text-blue-700 mb-4">{test.prueba}</h3>
            <div className="space-y-3 max-h-[70vh] overflow-y-auto pr-2">
                <p className="text-lg font-semibold border-b pb-2">Puntuación Total: <span className="text-green-600">{test.puntuacion_total}</span></p>
                <p className="text-sm text-gray-600"><span className="font-medium">Evaluador:</span> {test.usuario}</p>
                <p className="text-sm text-gray-600"><span className="font-medium">Fecha:</span> {test.fecha_evaluacion}</p>
                <p className="text-sm text-gray-800 pt-2"><span className="font-medium">Observaciones:</span> {test.observaciones}</p>

                <h4 className="text-lg font-bold pt-4 border-t">Respuestas Detalladas:</h4>
                <div className="space-y-3">
                    {test.respuestas.map((respuesta, index) => (
                        <div key={index} className="bg-gray-50 p-3 rounded-md border">
                            <p className="font-semibold text-sm text-gray-900">{respuesta.pregunta}</p>
                            {respuesta.opcion_respuesta && (
                                <p className="text-sm text-blue-600 pl-3">Opción: {respuesta.opcion_respuesta}</p>
                            )}
                            {respuesta.valor && (
                                <p className="text-sm text-blue-600 pl-3">Valor/Texto: {respuesta.valor}</p>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}