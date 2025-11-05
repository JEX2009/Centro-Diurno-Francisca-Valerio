import { useState } from 'react';
import LoadingSpinner from '../../../components/LoadingSpinner';
import ErrorMessage from '../../../components/ErrorMessage';
import SuccessMessage from '../../../components/SuccessMessage';
import { FaUpload, FaEye, FaTrash } from 'react-icons/fa';

export default function EpicrisisSection({ paciente, epicrisis, isLoading, error, isLoadingCreate, errorCreate, succesCreate, subirEpicrisis }) {
    const [selectedFile, setSelectedFile] = useState(null);
    const [isCreating, setIsCreating] = useState(false);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-40">
                <LoadingSpinner />
            </div>
        );
    }

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleUpload = async (e) => {
        e.preventDefault();
        if (!selectedFile) return;

        const formData = new FormData();
        formData.append('paciente', paciente.id);
        formData.append('foto', selectedFile);
        await subirEpicrisis(formData);
        setSelectedFile(null);
        setIsCreating(false);
        e.target.reset();

    };


    return (
        <section className="mt-6 space-y-6">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-800">Gestión de Epicrisis</h3>
                {paciente.esta_activo && (
                    <button
                        className="bg-green-500 text-white py-1 px-3 rounded-md hover:bg-green-600 transition"
                        onClick={() => setIsCreating(!isCreating)}
                        disabled={isLoadingCreate}
                    >
                        {isCreating ? 'Cancelar Subida' : '+ Subir Nueva Epicrisis'}
                    </button>
                )}
            </div>

            {succesCreate && <SuccessMessage message="Epicrisis subida con éxito." />}
            {errorCreate && <ErrorMessage message={`Error al subir Epicrisis: ${errorCreate}`} />}
            {error && <ErrorMessage message={`Error al cargar historial: ${error}`} />}

            {isCreating ? (
                <form onSubmit={handleUpload} className="p-4 border border-green-300 rounded-lg bg-green-50 space-y-4 shadow-inner">
                    <h4 className="text-lg font-semibold text-green-800">Cargar Archivo de Epicrisis</h4>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-100 file:text-green-700 hover:file:bg-green-200"
                        required
                    />
                    <button
                        type="submit"
                        disabled={!selectedFile || isLoadingCreate}
                        className="w-full flex items-center justify-center space-x-2 bg-green-600 text-white font-bold py-2 px-4 rounded-lg shadow hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoadingCreate ? (
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        ) : (
                            <FaUpload size={16} />
                        )}
                        <span>{isLoadingCreate ? 'Subiendo...' : 'Subir Epicrisis'}</span>
                    </button>
                </form>
            ) : epicrisis.length === 0 ? (
                <div className="text-gray-500 p-4 border rounded-lg bg-gray-50">
                    No hay imágenes de epicrisis registradas para este paciente.
                </div>
            ) : (
                <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
                    {epicrisis.map((item) => (
                        <div key={item.id} className="flex justify-between items-center p-3 border rounded-lg bg-white shadow-md">
                            <div className="text-sm">
                                <p className="font-semibold text-gray-800">Epicrisis #{item.id}</p>
                                <p className="text-xs text-gray-500">Fecha: {new Date(item.fecha_creacion).toLocaleDateString()}</p>
                            </div>
                            <div className="flex space-x-3 items-center">
                                <a
                                    href={item.foto}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 hover:text-blue-800 transition p-1 rounded-full bg-blue-100"
                                >
                                    <FaEye size={18} title="Ver Imagen" />
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
}
