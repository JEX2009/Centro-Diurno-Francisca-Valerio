import LoadingSpinner from "../../../components/LoadingSpinner";
import ErrorMessage from "../../../components/ErrorMessage";
import { useState } from "react";
import { useForm } from 'react-hook-form';

export default function Responsables({ paciente, responsables, isLoading, error, succesCreate, errorCreate, crearResponsable }) {
    const [creacion, setCreacion] = useState(false)
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const responsableList = responsables.filter((responsable) => {
        return paciente.id == responsable.paciente.id
    })

    if (isLoading) {
        return (
            <div className="h-200 ">
                <LoadingSpinner />
            </div>
        );
    }
    if (error) {
        return (
            <div className="h-200 ">
                <ErrorMessage message={error} />
            </div>
        );
    }

    const handleForm = (data) => {
        const dataToSubmit = {
            ...data,
            paciente: paciente.id,
        };
        console.log(dataToSubmit)
        crearResponsable(dataToSubmit);
        reset();
        setCreacion(false);
    }

    const inputClassName = (fieldName) =>
        `w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out ${errors[fieldName] ? 'border-red-500' : 'border-gray-300'}`;

    const labelClassName = "block text-sm font-medium text-gray-700 mb-1";

    return (
        <section>
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-800">Encargados del paciente </h3>
                {paciente.esta_activo && (
                    <button
                        className="bg-green-500 text-white py-1 px-3 rounded-md hover:bg-green-600 transition"
                        onClick={() => {
                            setCreacion(!creacion);
                            reset();
                        }}
                    >
                        {creacion ? 'Cancelar' : '+ Añadir Encargado'}
                    </button>
                )}
            </div>
            {succesCreate && <p className="p-3 mb-2 bg-green-100 text-green-700 rounded-lg">Encargado creado con éxito.</p>}
            {errorCreate && <p className="p-3 mb-2 bg-red-100 text-red-700 rounded-lg">Error al crear el responsable: {errorCreate}</p>}

            {creacion ?
                <form onSubmit={handleSubmit(handleForm)} className="space-y-4 p-4 border rounded-lg bg-white shadow-inner">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="nombre_completo" className={labelClassName}>Nombre del Responsable</label>
                            <input
                                type="text"
                                id="nombre_completo"
                                {...register("nombre_completo", { required: "El nombre_completo es obligatorio" })}
                                className={inputClassName("nombre_completo")}
                            />
                            {errors.nombre_completo && <p className="text-red-500 text-xs mt-1">{errors.nombre_completo.message}</p>}
                        </div>
                        <div>
                            <label htmlFor="cedula" className={labelClassName}>Cedula del Responsable</label>
                            <input
                                type="text"
                                id="cedula"
                                {...register("cedula", { required: "La cedula es obligatoria" })}
                                className={inputClassName("cedula")}
                            />
                            {errors.cedula && <p className="text-red-500 text-xs mt-1">{errors.cedula.message}</p>}
                        </div>
                    </div>

                    <div className="grid grid-cols-full md:grid-cols-full gap-4">
                        <div>
                            <label htmlFor="telefono" className={labelClassName}>Telefono del Encargado</label>
                            <input
                                type="text"
                                id="telefono"
                                {...register("telefono", { required: "La telefono es obligatoria" })}
                                className={inputClassName("telefono")}
                            />
                            {errors.telefono && <p className="text-red-500 text-xs mt-1">{errors.telefono.message}</p>}
                        </div>
                    </div>

                    <div>
                        <label htmlFor="direccion" className={labelClassName}>Direccion del Encargado</label>
                        <textarea
                            id="direccion"
                            rows="3"
                            {...register("direccion", { required: "La direccion es obligatoria" })}
                            className={inputClassName("direccion")}
                        />
                        {errors.direccion && <p className="text-red-500 text-xs mt-1">{errors.direccion.message}</p>}
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-150 ease-in-out mt-4"
                        >
                            Guardar
                        </button>
                    </div>
                </form>
                :
                responsableList.length === 0 ? (
                    <div className="text-gray-500 p-4 border rounded-lg bg-gray-50">
                        No hay responsables activos registrados para este paciente.
                    </div>
                ) : (
                    <div className="space-y-3 h-96 overflow-y-auto pr-2">
                        {responsableList.map((responsable) => (
                            <div
                                key={responsable.id}
                                className="bg-white border border-gray-200 rounded-lg p-3 shadow-md"
                            >
                                <div className="flex justify-between items-start">
                                    <p className="text-base font-bold text-blue-800">
                                        {responsable.nombre_completo}
                                    </p>
                                </div>

                                <p className="text-sm text-gray-700 mt-1">
                                    <span className="font-medium text-gray-900">Dosis:</span> {responsable.cedula} |
                                    <span className="font-medium text-gray-900 ml-3">Frecuencia:</span> {responsable.telefono}
                                </p>
                                <p className="text-sm text-gray-600 mt-2">
                                    <span className="font-medium text-gray-900">Instrucciones:</span> {responsable.direccion}
                                </p>
                            </div>
                        ))}
                    </div>
                )
            }
        </section>
    );
}