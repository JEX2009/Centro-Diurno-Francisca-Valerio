import { useForm } from 'react-hook-form';
import { useMemo, useState } from 'react';

export default function CitasDetails({ selectCita, dataTerpia, onSubmit, closeModal, añadirAusencia }) {
    const [justificacion, setJustificacion] = useState(false);
    const cita = useMemo(() => selectCita[0], [selectCita]);
    const [datosJustificacion, setJustificacionDatos] = useState();
    const handleForms = (data) => {
        onSubmit(data, cita)
        closeModal()
    }

    const terapias = dataTerpia.data||[];

    const handleAusencia = (data) => {
        añadirAusencia(cita.id, data)
        closeModal()
    }

    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            dolor_localizacion: '',
            procedimiento: '',
            pulso_bpm: null,
            oxigeno_spo2: null,
            peso_kg: null,
            altura_cm: null,
            presion_sistolica: null,
            presion_diastolica: null,
            glicemia: null,
            terapias_aplicadas: []
        }
    });

    const labelClassName = "block text-sm font-semibold text-gray-800 mb-1";

    const inputBaseClassName = `w-full text-gray-700 bg-gray-50 border-gray-200 transition duration-150 ease-in-out
                                focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500`;

    const adornmentClassName = `px-4 py-2 bg-gray-200 text-gray-600 font-medium text-sm border border-l-0 border-gray-200 rounded-r-xl`;

    const inputGroupClassName = (fieldName) =>
        `flex items-center shadow-inner rounded-xl
         ${errors[fieldName] ? 'border border-red-500 ring-1 ring-red-500' : 'border border-gray-200'}`;

    // const handleSearchChange = (event) => {
    //     setJustificacionDatos(event.target.value);
    // };

    return (
        <div className="bg-white p-6 rounded-2xl shadow-xl max-w-3xl w-full">

            <div className="flex justify-between items-start mb-4 pb-4 border-b border-gray-200">
                <div>
                    <h2 className="text-xl font-extrabold text-blue-800">
                        Atención de Cita
                    </h2>
                    <p className="text-base text-gray-600 mt-1">
                        Paciente: <span className="font-semibold">{cita.paciente.nombre_completo}</span>
                    </p>
                    <p className="text-sm text-gray-500">
                        Hora programada: {cita.hora}
                    </p>
                </div>
                <div>
                    {cita.estado_cita !== "AUSENCIA" && (<button className='bg-red-200 p-3 rounded-lg border border-red-500 shadow shadow-xl hover:bg-red-300 hover:border-red-700' onClick={() => handleAusencia({ estado_cita: "AUSENCIA" })}>
                        Agregar ausencia
                    </button>)}

                    {/* <button className='bg-yellow-200 p-3 rounded-lg border border-yellow-500 shadow shadow-xl hover:bg-yellow-300 hover:border-yellow-700' onClick={() => setJustificacion(!justificacion)}>
                        Editar
                    </button>
                    {justificacion && (
                        <>
                            <textarea
                                value={datosJustificacion}
                                onChange={handleSearchChange}
                                placeholder='Agregar una justificacion...'
                            />
                            <button onClick={() => handleAusencia({ estado_cita: "AUSENCIA", justificacion_ausencia :datosJustificacion })}>
                                Aceptar justificacion
                            </button>
                        </>
                    )} */}
                </div>
            </div>

            <form onSubmit={handleSubmit(handleForms)} className="grid grid-cols-4 gap-6">

                <div className="lg:col-span-4">
                    <label htmlFor="dolor_localizacion" className={labelClassName}>Localización del Dolor</label>
                    <input
                        type="text"
                        id="dolor_localizacion"
                        {...register("dolor_localizacion", { required: "Se necesita digitar dónde duele" })}
                        className={`${inputBaseClassName} px-4 py-2 rounded-xl shadow-inner ${errors.dolor_localizacion ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-200'}`}
                    />
                    {errors.dolor_localizacion && <p className="text-red-500 text-xs mt-1 font-medium">{errors.dolor_localizacion.message}</p>}
                </div>

                <div className="lg:col-span-4">
                    <label htmlFor="procedimiento" className={labelClassName}>Procedimiento Realizado</label>
                    <textarea
                        id="procedimiento"
                        rows="3"
                        {...register("procedimiento", { required: "Se necesita colocar el procedimiento" })}
                        className={`${inputBaseClassName} px-4 py-2 rounded-xl shadow-inner ${errors.procedimiento ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-200'}`}
                    />
                    {errors.procedimiento && <p className="text-red-500 text-xs mt-1 font-medium">{errors.procedimiento.message}</p>}
                </div>

                <div>
                    <label htmlFor="pulso_bpm" className={labelClassName}>Pulso</label>
                    <div className={inputGroupClassName("pulso_bpm")}>
                        <input
                            type="number"
                            step="0.1"
                            id="pulso_bpm"
                            {...register("pulso_bpm")}
                            className={`${inputBaseClassName} rounded-l-xl px-4 py-2 border-r-0`}
                        />
                        <span className={adornmentClassName}>BPM</span>
                    </div>
                    {errors.pulso_bpm && <p className="text-red-500 text-xs mt-1 font-medium">{errors.pulso_bpm.message}</p>}
                </div>

                <div>
                    <label htmlFor="oxigeno_spo2" className={labelClassName}>Oxígeno</label>
                    <div className={inputGroupClassName("oxigeno_spo2")}>
                        <input
                            type="number"
                            step="0.1"
                            id="oxigeno_spo2"
                            {...register("oxigeno_spo2")}
                            className={`${inputBaseClassName} rounded-l-xl px-4 py-2 border-r-0`}
                        />
                        <span className={adornmentClassName}>SPO2</span>
                    </div>
                    {errors.oxigeno_spo2 && <p className="text-red-500 text-xs mt-1 font-medium">{errors.oxigeno_spo2.message}</p>}
                </div>

                <div>
                    <label htmlFor="peso_kg" className={labelClassName}>Peso</label>
                    <div className={inputGroupClassName("peso_kg")}>
                        <input
                            type="number"
                            step="0.1"
                            id="peso_kg"
                            {...register("peso_kg")}
                            className={`${inputBaseClassName} rounded-l-xl px-4 py-2 border-r-0`}
                        />
                        <span className={adornmentClassName}>KG</span>
                    </div>
                    {errors.peso_kg && <p className="text-red-500 text-xs mt-1 font-medium">{errors.peso_kg.message}</p>}
                </div>

                <div>
                    <label htmlFor="altura_cm" className={labelClassName}>Altura</label>
                    <div className={inputGroupClassName("altura_cm")}>
                        <input
                            type="number"
                            step="0.1"
                            id="altura_cm"
                            {...register("altura_cm")}
                            className={`${inputBaseClassName} rounded-l-xl px-4 py-2 border-r-0`}
                        />
                        <span className={adornmentClassName}>CM</span>
                    </div>
                    {errors.altura_cm && <p className="text-red-500 text-xs mt-1 font-medium">{errors.altura_cm.message}</p>}
                </div>

                <div>
                    <label htmlFor="presion_sistolica" className={labelClassName}>P. Sistólica</label>
                    <div className={inputGroupClassName("presion_sistolica")}>
                        <input
                            type="number"
                            step="0.1"
                            id="presion_sistolica"
                            {...register("presion_sistolica")}
                            className={`${inputBaseClassName} rounded-l-xl px-4 py-2 border-r-0`}
                        />
                        <span className={adornmentClassName}>mmHg</span>
                    </div>
                    {errors.presion_sistolica && <p className="text-red-500 text-xs mt-1 font-medium">{errors.presion_sistolica.message}</p>}
                </div>

                <div>
                    <label htmlFor="presion_diastolica" className={labelClassName}>P. Diastólica</label>
                    <div className={inputGroupClassName("presion_diastolica")}>
                        <input
                            type="number"
                            step="0.1"
                            id="presion_diastolica"
                            {...register("presion_diastolica")}
                            className={`${inputBaseClassName} rounded-l-xl px-4 py-2 border-r-0`}
                        />
                        <span className={adornmentClassName}>mmHg</span>
                    </div>
                    {errors.presion_diastolica && <p className="text-red-500 text-xs mt-1 font-medium">{errors.presion_diastolica.message}</p>}
                </div>

                <div className="lg:col-span-1">
                    <label htmlFor="glicemia" className={labelClassName}>Glicemia</label>
                    <div className={inputGroupClassName("glicemia")}>
                        <input
                            type="number"
                            step="0.1"
                            id="glicemia"
                            {...register("glicemia")}
                            className={`${inputBaseClassName} rounded-l-xl px-4 py-2 border-r-0`}
                        />
                        <span className={adornmentClassName}>mg/dL</span>
                    </div>
                    {errors.glicemia && <p className="text-red-500 text-xs mt-1 font-medium">{errors.glicemia.message}</p>}
                </div>

                <div className="lg:col-span-4">
                    <label htmlFor="terapias_aplicadas" className={labelClassName}>Terapias Aplicadas</label>
                    <select
                        multiple
                        id="terapias_aplicadas"
                        {...register("terapias_aplicadas")}
                        className={`${inputBaseClassName} px-4 py-2 rounded-xl shadow-inner h-32 ${errors.terapias_aplicadas ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-200'}`}
                    >
                        {terapias.map((terapia) => (
                            <option key={terapia.id} value={terapia.id}>
                                {terapia.nombre}
                            </option>
                        ))}
                    </select>
                    {errors.terapias_aplicadas && <p className="text-red-500 text-xs mt-1 font-medium">{errors.terapias_aplicadas.message}</p>}
                </div>

                <button
                    type="submit"
                    className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white font-extrabold py-3 px-8 rounded-xl shadow-lg col-span-full
                                  focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-offset-2 
                                  transition duration-200 ease-in-out transform hover:scale-[1.01]
                                  disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Guardar Atención
                </button>

            </form>
        </div>
    )
}  