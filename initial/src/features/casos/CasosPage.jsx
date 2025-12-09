import useCasos from "./hooks/useCasos"
import LoadingSpinner from "../../components/LoadingSpinner"
import ErrorMessage from "../../components/ErrorMessage"
import SuccessMessage from "../../components/SuccessMessage"
import { useForm } from 'react-hook-form';
import { useState } from "react";
import PopUp from "../../components/PopUp"
import SeeCaso from "./components/SeeCaso";

export default function CasosPage() {
    const { register, handleSubmit, watch, formState: { errors }, reset } = useForm();
    const { data, isLoading, error, isLoadinCreate, errorCreate, succes, crearCaso, pacientes, isLoadingPaciente } = useCasos();
    const [modal, setModal] = useState(false);
    const [caso, setCaso] = useState()
    
    const pacientesActivos = pacientes.filter(paciente => paciente.esta_activo === true);

    const handleForm = (data) => {
        if (!data.paciente && pacientesActivos.length > 0) {}
        crearCaso(data);
        reset();
    }

    const casos = data.data || [];

    if (isLoading) {
        return <LoadingSpinner />;
    }
    if (error) {
        return <ErrorMessage />;
    }

    const inputClassName = (fieldName) =>
        `w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out ${errors[fieldName] ? 'border-red-500' : 'border-gray-300'}`;

    const labelClassName = "block text-sm font-medium text-gray-700 mb-1";

    const handleModal = (caso) => {
        setModal(true)
        setCaso(caso)
    }

    return (
        <>
            <div className="p-6 max-w-4xl mx-auto">
                <h1 className="text-3xl font-extrabold text-blue-800 mb-8 border-b pb-2">
                    Casos Especiales
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                    <div className="md:col-span-1 bg-gray-50 p-4 rounded-xl shadow-md h-fit">
                        <h2 className="text-xl font-bold text-gray-700 mb-3">Crear Nuevo Caso</h2>
                        <form onSubmit={handleSubmit(handleForm)}>
                            <div>
                                <label htmlFor="paciente" className={labelClassName}>Paciente</label>
                                {isLoadingPaciente === true ? (
                                    <p>Cargando pacientes...</p>
                                ) : (
                                    <>
                                        <select
                                            id="paciente"
                                            {...register("paciente", { required: "Debe seleccionar un paciente activo" })}
                                            className={inputClassName("paciente")}
                                        >
                                            <option value="" disabled>
                                                {pacientesActivos.length > 0 ? "---Elige un Paciente---" : "No hay pacientes activos disponibles"}
                                            </option>
                                            
                                            {pacientesActivos.map((paciente) => ( 
                                                <option
                                                    key={paciente.id}
                                                    value={paciente.id}
                                                >
                                                    {paciente.nombre_completo}
                                                </option>
                                            ))}
                                            
                                        </select>
                                        {errors.paciente && <p className="text-red-500 text-xs mt-1">{errors.paciente.message}</p>}
                                    </>
                                )}
                            </div>

                            <div>
                                <label htmlFor="titulo" className={labelClassName}>Titulo</label>
                                <input
                                    type="text"
                                    {...register("titulo", { required: "El titulo de el caso es obligatorio" })}
                                    id="titulo"
                                    className={inputClassName("titulo")}
                                />
                                {errors.titulo && <p className="text-red-500 text-xs mt-1">{errors.titulo.message}</p>}
                            </div>

                            <div>
                                <label htmlFor="descripcion" className={labelClassName}>Descripcion del Caso</label>
                                <textarea
                                    id="descripcion"
                                    rows={4}
                                    {...register("descripcion", { required: "La descripcion del caso es obligatoria" })}
                                    className={inputClassName("descripcion")}
                                />
                                {errors.descripcion && <p className="text-red-500 text-xs mt-1">{errors.descripcion.message}</p>}
                            </div>

                            <div className="col-span-full flex justify-center mt-6">
                                <button
                                    type="submit"
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-150 ease-in-out cursor-pointer"
                                >
                                    Guardar
                                </button>
                            </div>

                        </form>

                        {succes !== false && (<SuccessMessage />)}
                    </div>

                    <div className="md:col-span-2">
                        <h2 className="text-xl font-bold text-gray-700 mb-3 border-b pb-1">Casos Existentes ({casos.length})</h2>

                        <div className="space-y-2 max-h-156 overflow-y-auto pr-2">
                            {casos.map((caso) => (
                                <div
                                    key={caso.id}
                                    className="bg-white p-3 border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 transition duration-150 cursor-pointer"
                                    onClick={() => handleModal(caso)}
                                >
                                    <p className="text-xl font-medium text-gray-800">{caso.titulo}</p>
                                    <p className="text-lg font-medium text-gray-800">{caso.paciente.nombre_completo}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <PopUp closeModal={() => setModal(false)} isModalOpen={modal}>
                <SeeCaso caso={caso} />
            </PopUp>
        </>
    )
}
