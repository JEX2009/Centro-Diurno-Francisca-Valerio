import { useState } from 'react';

export default function Responsables({ paciente }) {
    const [responsablesList, setResponsablesList] = useState([]);

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-800">Responsables del Paciente</h3>
                {paciente.esta_activo && (
                <button className="bg-green-500 text-white py-1 px-3 rounded-md hover:bg-green-600 transition">
                    + Añadir Responsable
                </button>
                )}
            </div>
            {responsablesList.length === 0 ? (
                <div className="text-gray-500 p-4 border rounded-lg bg-gray-50">
                    No hay responsables registrados para este paciente.
                </div>
            ) : (
                <ul className="space-y-3">
                    {/* Aquí mapearías y mostrarías cada responsable */}
                </ul>
            )}
        </div>
    );
}