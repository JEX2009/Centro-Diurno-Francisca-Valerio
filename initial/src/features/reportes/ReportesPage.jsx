import { useForm } from 'react-hook-form';
import { IoIosSearch } from "react-icons/io";
import useReporte from './hooks/useReporte';
import ErrorMessage from '../../components/ErrorMessage';
import ReportDisplay from './components/ReportDisplay';


export default function ReportesPage() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { data,isLoading, error, crearResumen } = useReporte();

    const inputClassName = (fieldName) =>
        `w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out ${errors[fieldName] ? 'border-red-500' : 'border-gray-300'}`;
    const labelClassName = "block text-sm font-medium text-gray-700 mb-1";

    const handleForm = (formData) => {
        crearResumen(formData)
    }

    if (error) {
        return <ErrorMessage />
    }

    if (data && data.resumen) {
        return (
            <ReportDisplay 
                reporte={data} 
                onNewSearch={() => crearResumen(null)} 
            />
        );
    }

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <header className="mb-8 border-b pb-4">
                <h1 className="text-3xl font-extrabold text-gray-800">Generación de Reportes Terapéuticos</h1>
                <p className="text-gray-500">Define el periodo y los puntos clave para generar un resumen automático.</p>
            </header>

            <form className="bg-white p-8 rounded-xl shadow-lg space-y-6" onSubmit={handleSubmit(handleForm)}>
                
                <h2 className="text-xl font-semibold text-blue-700 border-b pb-2">Parámetros del Reporte</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="fecha_inicio" className={labelClassName}>Fecha de Inicio del Periodo</label>
                        <input
                            type='date'
                            id='fecha_inicio'
                            {...register('fecha_inicio', { required: 'La fecha de inicio es obligatoria' })}
                            className={inputClassName("fecha_inicio")}
                        />
                        {errors.fecha_inicio && <p className="text-red-500 text-xs mt-1">{errors.fecha_inicio.message}</p>}
                    </div>
                    <div>
                        <label htmlFor="fecha_fin" className={labelClassName}>Fecha de Fin del Periodo</label>
                        <input
                            type='date'
                            id='fecha_fin'
                            {...register('fecha_fin', { required: 'La fecha de fin es obligatoria' })}
                            className={inputClassName("fecha_fin")}
                        />
                        {errors.fecha_fin && <p className="text-red-500 text-xs mt-1">{errors.fecha_fin.message}</p>}
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="medios_terapeuticos_utilizados" className={labelClassName}>Medios Terapéuticos Utilizados</label>
                        <textarea
                            id="medios_terapeuticos_utilizados"
                            rows={4}
                            {...register("medios_terapeuticos_utilizados")}
                            placeholder="Ej: Terapia cognitiva, ejercicios de movilidad, sesiones grupales..."
                            className={inputClassName("medios_terapeuticos_utilizados")}
                        />
                        {errors.medios_terapeuticos_utilizados && <p className="text-red-500 text-xs mt-1">{errors.medios_terapeuticos_utilizados.message}</p>}
                    </div>
                    <div>
                        <label htmlFor="dificultades_encontradas" className={labelClassName}>Dificultades Encontradas</label>
                        <textarea
                            id="dificultades_encontradas"
                            rows={4}
                            {...register("dificultades_encontradas")}
                            placeholder="Ej: Resistencia inicial, barreras de comunicación, fatiga del paciente..."
                            className={inputClassName("dificultades_encontradas")}
                        />
                        {errors.dificultades_encontradas && <p className="text-red-500 text-xs mt-1">{errors.dificultades_encontradas.message}</p>}
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div>
                        <label htmlFor="recomendaciones" className={labelClassName}>Recomendaciones para el Cuidador/Paciente</label>
                        <textarea
                            id="recomendaciones"
                            rows={4}
                            {...register("recomendaciones")}
                            placeholder="Ej: Aumentar paseos, reducir cafeína, practicar ejercicios de memoria..."
                            className={inputClassName("recomendaciones")}
                        />
                        {errors.recomendaciones && <p className="text-red-500 text-xs mt-1">{errors.recomendaciones.message}</p>}
                    </div>
                    <div>
                        <label htmlFor="comentarios" className={labelClassName}>Comentarios Adicionales</label>
                        <textarea
                            id="comentarios"
                            rows={4}
                            {...register("comentarios")}
                            placeholder="Cualquier nota no cubierta en las secciones anteriores."
                            className={inputClassName("comentarios")}
                        />
                        {errors.comentarios && <p className="text-red-500 text-xs mt-1">{errors.comentarios.message}</p>}
                    </div>
                    <div>
                        <label htmlFor="descripcion" className={labelClassName}>Descripción General del Periodo</label>
                        <textarea
                            id="descripcion"
                            rows={4}
                            {...register("descripcion")}
                            placeholder="Un resumen de lo que cubrieron las sesiones."
                            className={inputClassName("descripcion")}
                        />
                        {errors.descripcion && <p className="text-red-500 text-xs mt-1">{errors.descripcion.message}</p>}
                    </div>
                </div>
                
                <div className='pt-6'>
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-150 ease-in-out disabled:opacity-50"
                    >
                        {isLoading ? (
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        ) : (
                            <>
                                <IoIosSearch size={23} />
                                <span>Generar Resumen</span>
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    )
}
