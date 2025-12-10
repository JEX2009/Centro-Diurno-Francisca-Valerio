import { useForm } from 'react-hook-form';

export default function EditPacient({ paciente, setModalEdit, EditPaciente}) {

    const initialData = paciente || {}; 

    const validatePastDate = (value) => {
        if (!value) return true;
        const inputDate = new Date(value);
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);
        return inputDate <= currentDate || "La fecha no puede ser futura.";
    };

    const { register, handleSubmit, watch, formState: { errors } } = useForm({
        defaultValues: {
            nombre_completo: initialData.nombre_completo || '',
            cedula: initialData.cedula || '',
            email: initialData.email || '',
            telefono: initialData.telefono || '',
            genero: initialData.genero || '',
            fecha_nacimiento: initialData.fecha_nacimiento || '',
            cantidad_hijos: initialData.cantidad_hijos || 0,
            estado_pension: initialData.estado_pension || 'No tiene',
            monto_pension: initialData.monto_pension || '',
            profesion: initialData.profesion || '',
            tiene_diabetes: initialData.tiene_diabetes || false,
            fecha_diagnostico_diabetes: initialData.fecha_diagnostico_diabetes || '',
            enfermedades: initialData.enfermedades || '',
            personas_con_las_que_habita: initialData.personas_con_las_que_habita || '',
            observaciones: initialData.observaciones || '',
            direccion: initialData.direccion || '',
        }
    });

    const handleSave = (data) => {
        data.cantidad_hijos = parseInt(data.cantidad_hijos) || 0;
        data.monto_pension = parseFloat(data.monto_pension) || 0;

        EditPaciente(paciente.id, data)
        setModalEdit(false)
    }

    const watchTieneDiabetes = watch("tiene_diabetes");
    const watchEstadoPension = watch("estado_pension");

    const inputClassName = (fieldName) =>
        `w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out ${errors[fieldName] ? 'border-red-500' : 'border-gray-300'}`;

    const labelClassName = "block text-sm font-medium text-gray-700 mb-1";

    return (
        <>
            <h2 className="text-2xl font-semibold mb-1 text-center text-gray-800 pt-4">Editar Paciente</h2>

            <form onSubmit={handleSubmit(handleSave)} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-6 items-start bg-white p-4">

                <div>
                    <label htmlFor="nombre_completo" className={labelClassName}>Nombre Completo</label>
                    <input
                        type="text"
                        id="nombre_completo"
                        {...register("nombre_completo", { 
                            required: "El nombre es obligatorio",
                            maxLength: { value: 100, message: "El nombre es demasiado largo" }
                        })}
                        className={inputClassName("nombre_completo")}
                    />
                    {errors.nombre_completo && <p className="text-red-500 text-xs mt-1">{errors.nombre_completo.message}</p>}
                </div>

                <div>
                    <label htmlFor="cedula" className={labelClassName}>Cédula</label>
                    <input
                        type="text"
                        id="cedula"
                        {...register("cedula", { 
                            required: "La cédula es obligatoria",
                            minLength: { value: 5, message: "Mínimo 5 caracteres" },
                            pattern: { value: /^[0-9]+$/, message: "Solo se permiten dígitos" }
                        })}
                        className={inputClassName("cedula")}
                    />
                    {errors.cedula && <p className="text-red-500 text-xs mt-1">{errors.cedula.message}</p>}
                </div>

                <div>
                    <label htmlFor="email" className={labelClassName}>Email</label>
                    <input
                        type="email"
                        id="email"
                        {...register("email", {
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                message: "Formato de email incorrecto",
                            }
                        })}
                        className={inputClassName("email")}
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                </div>

                <div>
                    <label htmlFor="telefono" className={labelClassName}>Teléfono</label>
                    <input
                        type="tel"
                        id="telefono"
                        {...register("telefono", {
                            minLength: { value: 8, message: "Mínimo 8 dígitos" },
                            pattern: { value: /^[0-9]+$/, message: "Solo se permiten dígitos" }
                        })}
                        className={inputClassName("telefono")}
                    />
                    {errors.telefono && <p className="text-red-500 text-xs mt-1">{errors.telefono.message}</p>}
                </div>

                <div>
                    <label htmlFor="genero" className={labelClassName}>Género</label>
                    <select
                        id="genero"
                        {...register("genero", { required: "El género es obligatorio" })}
                        className={inputClassName("genero")}
                    >
                        <option value="">Seleccione...</option>
                        <option value="Masculino">Masculino</option>
                        <option value="Femenino">Femenino</option>
                        <option value="Otro">Otro</option>
                    </select>
                    {errors.genero && <p className="text-red-500 text-xs mt-1">{errors.genero.message}</p>}
                </div>

                <div>
                    <label htmlFor="fecha_nacimiento" className={labelClassName}>Fecha de Nacimiento</label>
                    <input
                        type='date'
                        id='fecha_nacimiento'
                        {...register('fecha_nacimiento', { 
                            required: "La fecha de nacimiento es obligatoria",
                            validate: validatePastDate
                        })}
                        className={inputClassName("fecha_nacimiento")}
                    />
                    {errors.fecha_nacimiento && <p className="text-red-500 text-xs mt-1">{errors.fecha_nacimiento.message}</p>}
                </div>

                <div>
                    <label htmlFor="cantidad_hijos">Cantidad de Hijos</label>
                    <input
                        type='number'
                        id='cantidad_hijos'
                        {...register('cantidad_hijos', {
                            min: { value: 0, message: "No puede ser negativo" },
                            valueAsNumber: true
                        })}
                        className={inputClassName('cantidad_hijos')}
                    />
                    {errors.cantidad_hijos && <p className='text-red-500 text-xs mt-1'>{errors.cantidad_hijos.message}</p>}
                </div>

                <div>
                    <label htmlFor="profesion">Profesión</label>
                    <input 
                        type="text"
                        id='profesion'
                        {...register('profesion')}
                        className={inputClassName('profesion')} 
                    />
                    {errors.profesion && <p className="text-red-500 text-xs mt-1">{errors.profesion.message}</p>}
                </div>

                <div>
                    <label htmlFor="estado_pension" className={labelClassName}>Estado de Pensión</label>
                    <select
                        id="estado_pension"
                        {...register("estado_pension", { required: "El estado de pensión es obligatorio" })}
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
                            {...register("monto_pension", {
                                required: "El monto es obligatorio si aplica",
                                min: { value: 0, message: "El monto debe ser positivo" },
                                valueAsNumber: true
                            })}
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
                            {...register("fecha_diagnostico_diabetes", { 
                                required: "La fecha es obligatoria",
                                validate: validatePastDate
                            })}
                            className={inputClassName("fecha_diagnostico_diabetes")}
                        />
                        {errors.fecha_diagnostico_diabetes && <p className="text-red-500 text-xs mt-1">{errors.fecha_diagnostico_diabetes.message}</p>}
                    </div>
                )}

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

                <div className="lg:col-span-2"> 
                    <label htmlFor="observaciones" className={labelClassName}>Observaciones</label>
                    <textarea
                        id="observaciones"
                        rows={4}
                        {...register("observaciones")}
                        className={inputClassName("observaciones")}
                    />
                    {errors.observaciones && <p className="text-red-500 text-xs mt-1">{errors.observaciones.message}</p>}
                </div>

                <div className="lg:col-span-3"> 
                    <label htmlFor="direccion" className={labelClassName}>Dirección</label>
                    <textarea
                        id="direccion"
                        {...register("direccion", {required: "La dirección es obligatoria"})}
                        className={inputClassName("direccion")}
                    />
                    {errors.direccion && <p className="text-red-500 text-xs mt-1">{errors.direccion.message}</p>}
                </div>

                <div className="col-span-full flex justify-center mt-6">
                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-150 ease-in-out " 
                    >
                        Guardar Cambios
                    </button>
                </div>

            </form>
        </>
    )
}
