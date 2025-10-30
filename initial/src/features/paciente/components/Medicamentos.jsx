import LoadingSpinner from "../../../components/LoadingSpinner";
import ErrorMessage from "../../../components/ErrorMessage";
import { useState } from "react";
import { useForm } from 'react-hook-form';
import { MdOutlineDeleteOutline } from "react-icons/md";

export default function Medicamentos({ paciente, medicamentos, isLoading, error, succesCreate, errorCreate, crearMedicamento, borrarMedicamento }) {
    const [creacion, setCreacion] = useState(false)
    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        defaultValues: {
            fecha_fin: null
        }
    });

    const medicamentosList = medicamentos.filter((medicamento) => {
        return paciente.id == medicamento.paciente.id
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
            fecha_fin: data.fecha_fin === "" ? null : data.fecha_fin,
        };

        crearMedicamento(dataToSubmit, paciente.id);
        reset();
        setCreacion(false);
    }

    const inputClassName = (fieldName) =>
        `w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out ${errors[fieldName] ? 'border-red-500' : 'border-gray-300'}`;

    const labelClassName = "block text-sm font-medium text-gray-700 mb-1";

    return (
        <section>
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-800">Medicamentos Activos </h3>
                {paciente.esta_activo && (
                    <button
                        className="bg-green-500 text-white py-1 px-3 rounded-md hover:bg-green-600 transition"
                        onClick={() => {
                            setCreacion(!creacion);
                            reset();
                        }}
                    >
                        {creacion ? 'Cancelar' : '+ Añadir Medicamento'}
                    </button>
                )}
            </div>
            {succesCreate && <p className="p-3 mb-2 bg-green-100 text-green-700 rounded-lg">Medicamento creado con éxito.</p>}
            {errorCreate && <p className="p-3 mb-2 bg-red-100 text-red-700 rounded-lg">Error al crear medicamento: {errorCreate}</p>}

            {creacion ?
                <form onSubmit={handleSubmit(handleForm)} className="space-y-4 p-4 border rounded-lg bg-white shadow-inner">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="nombre" className={labelClassName}>Nombre del Medicamento</label>
                            <input
                                type="text"
                                id="nombre"
                                {...register("nombre", { required: "El nombre es obligatorio" })}
                                className={inputClassName("nombre")}
                            />
                            {errors.nombre && <p className="text-red-500 text-xs mt-1">{errors.nombre.message}</p>}
                        </div>
                        <div>
                            <label htmlFor="dosis" className={labelClassName}>Dosis de la Medicina</label>
                            <input
                                type="text"
                                id="dosis"
                                {...register("dosis", { required: "La dosis es obligatoria" })}
                                className={inputClassName("dosis")}
                            />
                            {errors.dosis && <p className="text-red-500 text-xs mt-1">{errors.dosis.message}</p>}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="frecuencia" className={labelClassName}>Frecuencia de la Medicina</label>
                            <input
                                type="text"
                                id="frecuencia"
                                {...register("frecuencia", { required: "La frecuencia es obligatoria" })}
                                className={inputClassName("frecuencia")}
                            />
                            {errors.frecuencia && <p className="text-red-500 text-xs mt-1">{errors.frecuencia.message}</p>}
                        </div>
                        <div>
                            <label htmlFor="motivo" className={labelClassName}>El motivo de la Medicina</label>
                            <input
                                type="text"
                                id="motivo"
                                {...register("motivo")}
                                className={inputClassName("motivo")}
                            />
                            {errors.motivo && <p className="text-red-500 text-xs mt-1">{errors.motivo.message}</p>}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="fecha_inicio" className={labelClassName}>Fecha de Inicio</label>
                            <input
                                type='date'
                                id='fecha_inicio'
                                {...register('fecha_inicio', { required: "La fecha de inicio es obligatoria" })}
                                className={inputClassName("fecha_inicio")}
                            />
                            {errors.fecha_inicio && <p className="text-red-500 text-xs mt-1">{errors.fecha_inicio.message}</p>}
                        </div>
                        <div>
                            <label htmlFor="fecha_fin" className={labelClassName}>Fin del medicamento</label>
                            <input
                                type='date'
                                id='fecha_fin'
                                {...register('fecha_fin')}
                                className={inputClassName("fecha_fin")}
                            />
                            {errors.fecha_fin && <p className="text-red-500 text-xs mt-1">{errors.fecha_fin.message}</p>}
                        </div>
                    </div>

                    <div>
                        <label htmlFor="instrucciones" className={labelClassName}>Instrucciones de la medicina</label>
                        <textarea
                            id="instrucciones"
                            rows="3"
                            {...register("instrucciones", { required: "Las instrucciones son obligatorias" })}
                            className={inputClassName("instrucciones")}
                        />
                        {errors.instrucciones && <p className="text-red-500 text-xs mt-1">{errors.instrucciones.message}</p>}
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
                medicamentosList.length === 0 ? (
                    <div className="text-gray-500 p-4 border rounded-lg bg-gray-50">
                        No hay medicamentos activos registrados para este paciente.
                    </div>
                ) : (
                    <div className="space-y-3 h-96 overflow-y-auto pr-2">
                        {medicamentosList.map((medicamento) => (
                            <div
                                key={medicamento.id}
                                className="bg-white border border-gray-200 rounded-lg p-3 shadow-md"
                            >
                                <div className="flex justify-between items-start">
                                    <p className="text-base font-bold text-blue-800">
                                        {medicamento.nombre}
                                    </p>
                                    {paciente.esta_activo && (
                                        <div className="flex gap-2">
                                            <button
                                                className="text-gray-500 hover:text-red-600 transition"
                                                onClick={() => borrarMedicamento(medicamento.id)}
                                            >
                                                <MdOutlineDeleteOutline size={18} />
                                            </button>
                                        </div>
                                    )}
                                </div>

                                <p className="text-sm text-gray-700 mt-1">
                                    <span className="font-medium text-gray-900">Dosis:</span> {medicamento.dosis} |
                                    <span className="font-medium text-gray-900 ml-3">Frecuencia:</span> {medicamento.frecuencia}
                                </p>
                                <p className="text-sm text-gray-700 mt-1">
                                    <span className="font-medium text-gray-900">Motivo:</span> {medicamento.motivo || 'No especificado'}
                                </p>
                                <p className="text-xs text-gray-500 mt-2 border-t pt-2">
                                    <span className="font-medium">Inicio:</span> {medicamento.fecha_inicio} |
                                    <span className="font-medium ml-3">Fin:</span> {medicamento.fecha_fin || 'Continuo'}
                                </p>
                                <p className="text-sm text-gray-600 mt-2">
                                    <span className="font-medium text-gray-900">Instrucciones:</span> {medicamento.instrucciones}
                                </p>
                            </div>
                        ))}
                    </div>
                )
            }
        </section>
    );
}