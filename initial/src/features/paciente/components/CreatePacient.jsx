import { useForm } from 'react-hook-form';
import ErrorMessage from '../../../components/ErrorMessage';

export default function CreatePacient({CreatePaciente,closeModal}) {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const watchTieneDiabetes = watch("tiene_diabetes");
    const watchEstadoPension = watch("estado_pension");
    const inputClassName = (fieldName) =>
        `w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out ${errors[fieldName] ? 'border-red-500' : 'border-gray-300'}`;

    const labelClassName = "block text-sm font-medium text-gray-700 mb-1";

    const handleCreate= (data)=>{
        CreatePaciente(data);
        closeModal();
    }

    return (
        <>
            <h2 className="text-2xl font-semibold mb-1 text-center text-gray-800 pt-4">Crear Paciente</h2>
            <form onSubmit={handleSubmit(handleCreate)} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5  gap-x-6 gap-y-6 items-start bg-white p-6 rounded-lg">
                {/* --- Fila 1 --- */}
                <div>
                    <label htmlFor="nombre_completo" className={labelClassName}>Nombre Completo</label>
                    <input
                        type="text"
                        id="nombre_completo"
                        {...register("nombre_completo", { required: "El nombre es obligatorio" })}
                        className={inputClassName("nombre_completo")}
                    />
                    {errors.nombre_completo && <p className="text-red-500 text-xs mt-1">{errors.nombre_completo.message}</p>}
                </div>

                <div>
                    <label htmlFor="cedula" className={labelClassName}>Cédula</label>
                    <input
                        type="text"
                        id="cedula"
                        {...register("cedula", { required: "La cedula es obligatoria" })}
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
                <div>
                    <label htmlFor="genero" className={labelClassName}>Genero</label>
                    <select
                        id="genero"
                        {...register("genero")}
                        className={inputClassName("genero")}
                    >
                        <option value="Masculino">Masculino</option>
                        <option value="Femenino">Femenino</option>
                        <option value="Otro">Otro</option>
                    </select>
                    {errors.genero && <p className="text-red-500 text-xs mt-1">{errors.genero.message}</p>}
                </div>

                {/* --- Fila 2 --- */}

                <div>
                    <label htmlFor="fecha_nacimiento" className={labelClassName}>Fecha de Nacimiento</label>
                    <input
                        type='date'
                        id='fecha_nacimiento'
                        {...register('fecha_nacimiento', { required: "La fecha de nacimiento es obligatoria" })}
                        className={inputClassName("fecha_nacimiento")}
                    />
                    {errors.fecha_nacimiento && <p className="text-red-500 text-xs mt-1">{errors.fecha_nacimiento.message}</p>}
                </div>
                <div>
                    <label htmlFor="cantidad_hijos">Cantidad de Hijos</label>
                    <input
                        defaultValue={0}
                        type='number'
                        id='cantidad_hijos'
                        {...register('cantidad_hijos')}
                        className={inputClassName('cantidad_hijos')}
                    />
                    {errors.cantidad_hijos && <p className='text-red-500 text-xs mt-1'>{errors.cantidad_hijos.message}</p>}
                </div>
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
                            step="1000"
                            id="monto_pension"
                            {...register("monto_pension")}
                            className={inputClassName("monto_pension")}
                        />
                        {errors.monto_pension && <p className="text-red-500 text-xs mt-1">{errors.monto_pension.message}</p>}
                    </div>
                )}

                <div>
                    <label htmlFor="profesion">Profesion</label>
                    <input 
                    type="text"
                    id='profesion'
                    {... register('profesion')}
                    className={inputClassName('profesion')} 
                    />
                    {errors.profesion  && <p className="text-red-500 text-xs mt-1">{errors.profesion.message}</p>}
                </div>

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


                {/* --- Fila 3 --- */}
                {watchTieneDiabetes && (
                        <div>
                            <label htmlFor="fecha_diagnostico_diabetes" className={labelClassName}>Fecha Diagnóstico Diabetes</label>
                            <input
                                type="date"
                                id="fecha_diagnostico_diabetes"
                                {...register("fecha_diagnostico_diabetes", { required: "La fecha es obligatoria" })}
                                className={inputClassName("fecha_diagnostico_diabetes")}
                            />
                            {errors.fecha_diagnostico_diabetes && <p className="text-red-500 text-xs mt-1">{errors.fecha_diagnostico_diabetes.message}</p>}
                        </div>
                )}
                
                <div className="lg:col-span-1" >
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

                <div className="col-span-1 ">
                    <label htmlFor="observaciones" className={labelClassName}>Observaciones</label>
                    <textarea
                        id="observaciones"
                        rows={4}
                        {...register("observaciones")}
                        className={inputClassName("observaciones")}
                    />
                    {errors.observaciones && <p className="text-red-500 text-xs mt-1">{errors.observaciones.message}</p>}
                </div>

                <div className="lg:col-span-full">
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