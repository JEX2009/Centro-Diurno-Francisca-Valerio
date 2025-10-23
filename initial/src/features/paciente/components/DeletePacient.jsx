import { useState } from "react";

export default function DeletePacient({ paciente, DeletePaciente, setModalDelete }) {
    const [motivo, setMotivo] = useState(false);
    const [valorInput, setValorInput] = useState('');
    const [inputError, setInputError] = useState(null); 

    const manejarCambio = (evento) => {
        const nuevoValor = evento.target.value;
        setValorInput(nuevoValor);
        if (nuevoValor.trim().length > 0) {
            setInputError(null);
        }
    };

    const handleConfirmDelete = async () => {
        if (valorInput.trim() === '') {
            setInputError("¡El motivo de la eliminación es obligatorio!");
            return;
        }
        
        try {
            await DeletePaciente(paciente.id, valorInput ); 
            setModalDelete(false); 
        } catch (error) {
            const errorMessage = error.response?.data?.motivo?.[0] || "Error al eliminar. Intenta nuevamente.";
            setInputError(errorMessage);
            console.error("Error al eliminar paciente:", error);
        }
    }
    
    const handleInitialDeleteClick = () => {
        setMotivo(true);
    };

    return (
        <div className="bg-white p-6 shadow-lg rounded-lg max-w-sm mx-auto">
            <h2 className="text-lg font-bold text-center mb-4">
                ¿Quieres eliminar a <span className="font-extrabold">{paciente?.nombre_completo}</span>?
            </h2>
            <p className="text-center mb-4">
                Esta acción es irreversible ¿Estás seguro?
            </p>
            <div className="grid grid-cols-2 mt-6 gap-4 justify-center">
                <button
                    onClick={handleInitialDeleteClick}
                    className="rounded-lg bg-green-600 text-white w-full p-2 hover:bg-green-700 transition-colors"
                >
                    Si, eliminar
                </button>
                <button
                    onClick={() => setModalDelete(false)}
                    className="rounded-lg bg-red-600 text-white w-full p-2 hover:bg-red-700 transition-colors"
                >
                    No
                </button>
                {motivo === true && (
                    <div className='col-span-full'>
                        <label htmlFor="motivo" className='block text-sm font-medium text-gray-700 mb-1'>
                            Agrega el motivo de la eliminación
                        </label>
                        <input
                            id='motivo'
                            className={`w-full px-3 py-2 border ${inputError ? 'border-red-500' : 'border-gray-300'} rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out mb-2`}
                            type="text"
                            onChange={manejarCambio}
                            value={valorInput}
                        />
                        {inputError && (
                            <p className="text-red-500 text-xs italic mb-4">{inputError}</p>
                        )}
                        <button
                            className='w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-150 ease-in-out'
                            onClick={handleConfirmDelete}
                        >
                            Guardar
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}
