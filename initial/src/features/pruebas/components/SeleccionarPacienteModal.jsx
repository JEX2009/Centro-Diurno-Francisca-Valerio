import { useState } from 'react';

export default function SeleccionarPacienteModal({ pacientes, closeModal, onPacienteSeleccionado }) {
    const [pacienteSeleccionadoId, setPacienteSeleccionadoId] = useState(null);

    const pacientesActivos = pacientes.filter(paciente => paciente.esta_activo === true);

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const paciente = pacientes.find(p => p.id === parseInt(pacienteSeleccionadoId));
        
        if (paciente) {
            onPacienteSeleccionado(paciente);
            closeModal();
        }
    };
    
    return (
        <div className="p-6 bg-white rounded-lg shadow-2xl max-w-lg mx-auto">
            <h3 className="text-xl font-bold mb-4 border-b pb-2">Seleccionar Paciente Activo</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
                <select
                    onChange={(e) => setPacienteSeleccionadoId(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    required
                >
                    <option value="">
                        {pacientesActivos.length > 0 ? "-- Selecciona un paciente --" : "No hay pacientes activos disponibles"}
                    </option>
                    
                    {pacientesActivos.map((paciente) => (
                        <option key={paciente.id} value={paciente.id}>
                            {paciente.nombre_completo} (Cédula: {paciente.cedula})
                        </option>
                    ))}
                </select>
                
                <div className="flex justify-end space-x-3">
                    <button
                        type="button"
                        onClick={closeModal}
                        className="py-2 px-4 border rounded-lg text-gray-600 hover:bg-gray-100"
                    >
                        Cancelar
                    </button>
                    <button
                        type="submit"
                        disabled={!pacienteSeleccionadoId || pacientesActivos.length === 0}
                        className="py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
                    >
                        Iniciar Test
                    </button>
                </div>
            </form>
        </div>
    );
}
