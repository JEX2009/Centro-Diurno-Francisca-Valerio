import { useState } from 'react';

export default function EjecutarPrueba({ prueba, pacienteId, usuarioId, onResultadoGuardado, handleCreateRespuesta }) {
    const [respuestas, setRespuestas] = useState({});
    const [observaciones, setObservaciones] = useState('');

    const handleRespuestaChange = (preguntaId, tipo, valor, opcionId = null) => {
        let nuevaRespuesta = {
            pregunta: preguntaId,
            valor: null,
            opcion_respuesta: null,
        };

        if (tipo === 'Opcion_Multiple') {
            nuevaRespuesta.opcion_respuesta = parseInt(opcionId);
        } else {
            nuevaRespuesta.valor = valor;
        }

        setRespuestas(prevRespuestas => ({
            ...prevRespuestas,
            [preguntaId]: nuevaRespuesta,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const respuestasArray = Object.values(respuestas);

        const resultadoData = {
            paciente: pacienteId,
            prueba: prueba.id,
            usuario: usuarioId, 
            observaciones: observaciones,
            respuestas: respuestasArray
        };

        handleCreateRespuesta(resultadoData);
        onResultadoGuardado();
    };

    return (
        <form onSubmit={handleSubmit} className="p-6 bg-white shadow-xl rounded-lg space-y-8">
            <header className="border-b pb-4">
                <h1 className="text-3xl font-extrabold text-blue-700">{prueba.nombre}</h1>
                <p className="text-lg text-gray-500">{prueba.categoria}</p>
            </header>
            
            <section className="space-y-6">
                <h2 className="text-2xl font-semibold text-gray-800 border-b pb-2">Preguntas</h2>
                
                {prueba.preguntas.map((pregunta, index) => (
                    <div key={pregunta.id} className="p-4 border rounded-lg bg-gray-50">
                        <label className="block text-base font-medium text-gray-900 mb-3">
                            {index + 1}. {pregunta.texto_pregunta}
                        </label>

                        {pregunta.tipo_pregunta === 'Opcion_Multiple' && (
                            <div className="space-y-2">
                                {pregunta.opciones.map((opcion) => (
                                    <div key={opcion.id} className="flex items-center">
                                        <input 
                                            type="radio" 
                                            name={`pregunta_${pregunta.id}`} 
                                            value={opcion.id}
                                            id={`opcion_${opcion.id}`}
                                            onChange={() => handleRespuestaChange(pregunta.id, 'Opcion_Multiple', opcion.valor_puntaje.toString(), opcion.id)}
                                            className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                                            required
                                        />
                                        <label htmlFor={`opcion_${opcion.id}`} className="ml-3 text-sm font-medium text-gray-700 cursor-pointer">
                                            {opcion.texto_opcion} ({opcion.valor_puntaje} pts)
                                        </label>
                                    </div>
                                ))}
                            </div>
                        )}

                        {(pregunta.tipo_pregunta === 'Texto' || pregunta.tipo_pregunta === 'Numerico') && (
                            <textarea
                                id={`pregunta_${pregunta.id}`}
                                rows={pregunta.tipo_pregunta === 'Texto' ? 4 : 1}
                                type={pregunta.tipo_pregunta === 'Numerico' ? 'number' : 'text'}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder={pregunta.tipo_pregunta === 'Numerico' ? "Ingrese solo números" : "Escriba la respuesta aquí..."}
                                onChange={(e) => handleRespuestaChange(pregunta.id, pregunta.tipo_pregunta, e.target.value)}
                                required
                            />
                        )}
                    </div>
                ))}
            </section>

            <div className="pt-4 border-t">
                <label htmlFor="observaciones" className="block text-base font-medium text-gray-900 mb-2">
                    Observaciones Generales (Opcional)
                </label>
                <textarea
                    id="observaciones"
                    rows="4"
                    value={observaciones}
                    onChange={(e) => setObservaciones(e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Notas relevantes del terapeuta sobre la evaluación..."
                />
            </div>

            <button
                type="submit"
                className="w-full py-3 px-4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition duration-150 ease-in-out shadow-md"
            >
                Finalizar y Guardar Evaluación
            </button>
        </form>
    );
}
