import { useState } from 'react';

export default function TestAnteriores({ pacienteId }) {
    const [epicrisisList, setEpicrisis] = useState([]);

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-800">Epicrisis Antiguas</h3>
            </div>
            {epicrisisList.length === 0 ? (
                <div className="text-gray-500 p-4 border rounded-lg bg-gray-50">
                    No hay epicrisis registradas para este paciente.
                </div>
            ) : (
                <ul className="space-y-3">
                    {/* Aquí mapearías y mostrarías cada medicamento */}
                </ul>
            )}
        </div>
    )
}