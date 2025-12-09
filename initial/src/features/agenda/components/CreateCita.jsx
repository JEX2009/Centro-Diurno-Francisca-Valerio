import React from 'react';
import { useForm } from 'react-hook-form';

export default function CreateCita({ generarCita, pacientes }) {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const inputClassName = (fieldName) =>
        `w-full px-4 py-2 text-gray-700 bg-gray-50 border transition duration-150 ease-in-out rounded-xl shadow-inner
          focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 
          ${errors[fieldName] ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-200'}`;

    const labelClassName = "block text-sm font-semibold text-gray-800 mb-1";

    const checkboxClassName = (fieldName) =>
        `w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500
          ${errors[fieldName] ? 'border-red-500' : 'border-gray-300'} mr-2`;

    return (
        <form
            onSubmit={handleSubmit(generarCita)}
            className="grid grid-cols-2 gap-x-8 gap-y-6 items-start bg-white p-8 rounded-2xl shadow-xl border border-gray-100"
        >
            <h2 className="col-span-full text-2xl font-extrabold text-blue-800 mb-4 border-b pb-2">
                Programar Nueva Cita
            </h2>

            <div className="col-span-1">
                <label htmlFor="fecha" className={labelClassName}>Fecha de Cita</label>
                <input
                    type="date"
                    id="fecha"
                    {...register("fecha", { required: "La fecha de la cita es obligatoria" })}
                    className={inputClassName("fecha")}
                />
                {errors.fecha && <p className="text-red-500 text-xs mt-1 font-medium">{errors.fecha.message}</p>}
            </div>

            <div className="col-span-1">
                <label htmlFor="hora" className={labelClassName}>Hora de la Cita</label>
                <input
                    type="time"
                    id="hora"
                    {...register("hora", { required: "La hora de la cita es obligatoria" })}
                    className={inputClassName("hora")}
                />
                {errors.hora && <p className="text-red-500 text-xs mt-1 font-medium">{errors.hora.message}</p>}
            </div>

            <div className="col-span-2">
                <label htmlFor="motivo_consulta" className={labelClassName}>Motivo de la Cita</label>
                <textarea
                    id="motivo_consulta"
                    rows="3"
                    {...register("motivo_consulta", {required: "El motivo de la consulta es obligatorio" })}
                    className={inputClassName("motivo_consulta")}
                />
                {errors.motivo_consulta && <p className="text-red-500 text-xs mt-1 font-medium">{errors.motivo_consulta.message}</p>}
            </div>

            <div className="col-span-1">
                <label htmlFor="estado_cita" className={labelClassName}>Estado de la Cita</label>
                <select
                    id="estado_cita"
                    {...register("estado_cita")}
                    className={inputClassName("estado_cita")}
                >
                    <option value="PENDIENTE">Pendiente</option>
                </select>
                {errors.estado_cita && <p className="text-red-500 text-xs mt-1 font-medium">{errors.estado_cita.message}</p>}
            </div>

            <div className="col-span-1">
                <label htmlFor="paciente" className={labelClassName}>Elige el paciente</label>
                <select
                    id="paciente"
                    defaultValue=""
                    {...register("paciente", { required: "Debe seleccionar un paciente" })}
                    className={inputClassName("paciente")}
                >
                    <option value="" disabled>-- Seleccione un paciente --</option>
                    {pacientes.map((paciente) => (
                        <option key={paciente.id} value={paciente.id}>
                            {paciente.nombre_completo}
                        </option>
                    ))}
                </select>
                {errors.paciente && <p className="text-red-500 text-xs mt-1 font-medium">{errors.paciente.message}</p>}
            </div>

            <div className="col-span-2 flex items-center pt-2">
                <input
                    type="checkbox"
                    id="es_grupal"
                    {...register("es_grupal")}
                    className={checkboxClassName("es_grupal")}
                />
                <label htmlFor="es_grupal" className="text-base font-medium text-gray-700 cursor-pointer">
                    ¿La cita es grupal?
                </label>
                {errors.es_grupal && <p className="text-red-500 text-xs mt-1 font-medium">{errors.es_grupal.message}</p>}
            </div>

            <div className="col-span-full flex justify-center mt-6">
                <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-extrabold py-3 px-6 rounded-xl shadow-lg 
                                      focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-offset-2 
                                      transition duration-200 ease-in-out transform hover:scale-[1.01]"
                >
                    Guardar Cita
                </button>
            </div>
        </form>
    )
}   