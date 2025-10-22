import { useForm } from 'react-hook-form';

export default function EditPacient({ paciente, setModalEdit,EditPaciente}) {

    const initialData = paciente || {}; 

    const handleSave=(data)=>{
        console.log(paciente.id )
        console.log(data)
        EditPaciente(paciente.id,data)
        setModalEdit(false)
    }

    const { register, handleSubmit, watch, formState: { errors } } = useForm({
        defaultValues: {
            nombre_completo: initialData.nombre_completo || '',
            cedula: initialData.cedula || '',
            email: initialData.email || '',
            telefono: initialData.telefono || '',
            enfermedades: initialData.enfermedades || '',
            estado_pension: initialData.estado_pension || 'No tiene',
            monto_pension: initialData.monto_pension || '',
            personas_con_las_que_habita: initialData.personas_con_las_que_habita || '',
            tiene_diabetes: initialData.tiene_diabetes || false,
            fecha_diagnostico_diabetes: initialData.fecha_diagnostico_diabetes || '',
            observaciones: initialData.observaciones || '',
            direccion: initialData.direccion || '',
        }
    });

    const watchTieneDiabetes = watch("tiene_diabetes");
    const watchEstadoPension = watch("estado_pension");

    // Clases comunes para inputs para reducir repetición
    const inputClassName = (fieldName) =>
        `w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out ${errors[fieldName] ? 'border-red-500' : 'border-gray-300'}`;

    const labelClassName = "block text-sm font-medium text-gray-700 mb-1";

    return (
        <>
            <h2 className="text-2xl font-semibold mb-1 text-center text-gray-800 pt-4">Editar Paciente</h2>

            <form onSubmit={handleSubmit(handleSave)} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  gap-x-6 gap-y-6 items-start bg-white p-4">
                {/* --- Fila 1 --- */}
                <div>
                    <label htmlFor="nombre_completo" className={labelClassName}>Nombre Completo</label>
                    <input
                        type="text"
                        id="nombre_completo"
                        {...register("nombre_completo")}
                        className={inputClassName("nombre_completo")}
                    />
                    {errors.nombre_completo && <p className="text-red-500 text-xs mt-1">{errors.nombre_completo.message}</p>}
                </div>

                <div>
                    <label htmlFor="cedula" className={labelClassName}>Cédula</label>
                    <input
                        type="text"
                        id="cedula"
                        {...register("cedula")}
                        className={inputClassName("cedula")}
                    />
                    {errors.cedula && <p className="text-red-500 text-xs mt-1">{errors.cedula.message}</p>}
                </div>

                <div>
                    <label htmlFor="email" className={labelClassName}>Email</label>
                    <input
                        type="email"
                        id="email"
                        {...register("email")}
                        className={inputClassName("email")}
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                </div>

                <div>
                    <label htmlFor="telefono" className={labelClassName}>Teléfono</label>
                    <input
                        type="tel"
                        id="telefono"
                        {...register("telefono")}
                        className={inputClassName("telefono")}
                    />
                    {errors.telefono && <p className="text-red-500 text-xs mt-1">{errors.telefono.message}</p>}
                </div>

                {/* --- Fila 2 --- */}
                <div>
                    <label htmlFor="estado_pension" className={labelClassName}>Estado de Pensión</label>
                    <select
                        id="estado_pension"
                        {...register("estado_pension")}
                        className={inputClassName("estado_pension")}
                    >
                        <option value="No tiene">No tiene</option>
                        <option value="Si tiene">Si tiene</option>
                        <option value="En tramite">En trámite</option>
                    </select>
                    {errors.estado_pension && <p className="text-red-500 text-xs mt-1">{errors.estado_pension.message}</p>}
                </div>

                {watchEstadoPension !== 'No tiene' && (
                    <div>
                        <label htmlFor="monto_pension" className={labelClassName}>Monto de Pensión</label>
                        <input
                            type="number"
                            step="0.01"
                            id="monto_pension"
                            {...register("monto_pension")}
                            className={inputClassName("monto_pension")}
                        />
                        {errors.monto_pension && <p className="text-red-500 text-xs mt-1">{errors.monto_pension.message}</p>}
                    </div>
                )}

                <div className="flex items-center pt-5">
                    <label htmlFor="tiene_diabetes" className="flex items-center space-x-2 text-sm font-medium text-gray-700 cursor-pointer">
                        <input
                            type="checkbox"
                            id="tiene_diabetes"
                            {...register("tiene_diabetes")}
                            className={`h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 ${errors.tiene_diabetes ? 'border-red-500' : 'border-gray-300'}`}
                        />
                        <span>¿Tiene Diabetes?</span>
                    </label>
                    {errors.tiene_diabetes && <p className="text-red-500 text-xs mt-1">{errors.tiene_diabetes.message}</p>}
                </div>

                {watchTieneDiabetes && (
                    <div>
                        <label htmlFor="fecha_diagnostico_diabetes" className={labelClassName}>Fecha Diagnóstico Diabetes</label>
                        <input
                            type="date"
                            id="fecha_diagnostico_diabetes"
                            {...register("fecha_diagnostico_diabetes")}
                            className={inputClassName("fecha_diagnostico_diabetes")}
                        />
                        {errors.fecha_diagnostico_diabetes && <p className="text-red-500 text-xs mt-1">{errors.fecha_diagnostico_diabetes.message}</p>}
                    </div>
                )}

                {/* --- Fila 3 --- */}
                <div className="lg:col-span-1"> 
                    <label htmlFor="enfermedades" className={labelClassName}>Enfermedades</label>
                    <textarea
                        id="enfermedades"
                        rows={4} 
                        {...register("enfermedades")}
                        className={inputClassName("enfermedades")}
                    />
                    {errors.enfermedades && <p className="text-red-500 text-xs mt-1">{errors.enfermedades.message}</p>}
                </div>

                <div className="lg:col-span-1"> 
                    <label htmlFor="personas_con_las_que_habita" className={labelClassName}>Personas con las que habita</label>
                    <textarea
                        id="personas_con_las_que_habita"
                        rows={4}
                        {...register("personas_con_las_que_habita")}
                        className={inputClassName("personas_con_las_que_habita")}
                    />
                    {errors.personas_con_las_que_habita && <p className="text-red-500 text-xs mt-1">{errors.personas_con_las_que_habita.message}</p>}
                </div>

                <div className="col-span-2 "> 
                    <label htmlFor="observaciones" className={labelClassName}>Observaciones</label>
                    <textarea
                        id="observaciones"
                        rows={4}
                        {...register("observaciones")}
                        className={inputClassName("observaciones")}
                    />
                    {errors.observaciones && <p className="text-red-500 text-xs mt-1">{errors.observaciones.message}</p>}
                </div>

                <div className="lg:col-span-4"> 
                    <label htmlFor="direccion" className={labelClassName}>Dirección</label>
                    <textarea
                        id="direccion"
                        {...register("direccion")}
                        className={inputClassName("direccion")}
                    />
                    {errors.direccion && <p className="text-red-500 text-xs mt-1">{errors.direccion.message}</p>}
                </div>

                <div className="col-span-full flex justify-center mt-6">
                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-150 ease-in-out " 
                    >
                        Guardar
                    </button>
                </div>

            </form>
        </>
    )
}

