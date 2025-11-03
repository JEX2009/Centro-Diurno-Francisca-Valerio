import { FaPrint, FaRegFilePdf } from "react-icons/fa";
import { FiRefreshCcw } from "react-icons/fi";

export default function ReportDisplay({ reporte, onNewSearch }) {

    const printReport = () => {
        window.print();
    };

    const metadata = {
        mes: reporte.mes,
        anio: reporte.anio,
        persona: reporte.persona_que_genera,
        codigo: reporte.codigo_persona,
        consultorio: reporte.consultorio,
    };
    const resumen = reporte.resumen_del_mes;
    const estadisticas = reporte.estadisticas_de_tratamiento;
    const casos = reporte.casos_destacados || [];
    const datosBusqueda = {
        inicio: reporte.inicio_reporte || 'N/A',
        fin: reporte.fin_reporte || 'N/A',
        medios: reporte.medios_terapeuticos_utilizados || 'N/A',
        dificultades: reporte.dificultades_encontradas || 'N/A',
        recomendaciones: reporte.recomendaciones || 'N/A',
    };

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <header className="flex justify-between items-center mb-6 border-b pb-4">
                <h1 className="text-3xl font-extrabold text-green-700">Reporte Generado con Éxito</h1>
                <div className="flex space-x-3">
                    <button
                        onClick={onNewSearch}
                        className="flex items-center space-x-2 bg-yellow-500 text-white font-bold py-2 px-4 rounded-lg shadow hover:bg-yellow-600 transition"
                    >
                        <FiRefreshCcw size={18} />
                        <span>Nueva Búsqueda</span>
                    </button>
                    <button
                        onClick={printReport}
                        className="flex items-center space-x-2 bg-blue-600 text-white font-bold py-2 px-4 rounded-lg shadow hover:bg-blue-700 transition"
                    >
                        <FaPrint size={18} />
                        <span>Imprimir</span>
                    </button>
                </div>
            </header>

            <div id="reporte-contenido" className="bg-white p-8 rounded-xl shadow-2xl space-y-8 print:shadow-none print:p-0">

                {/* 1. METADATOS DEL REPORTE */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <div><span className="font-bold text-gray-800">Generado Por:</span> {metadata.persona}</div>
                    <div><span className="font-bold text-gray-800">Mes:</span> {metadata.mes} {metadata.anio}</div>
                    <div><span className="font-bold text-gray-800">Consultorio:</span> {metadata.consultorio}</div>
                    <div><span className="font-bold text-gray-800">Código Persona:</span> {metadata.codigo}</div>
                </div>

                {/* 2. RESUMEN TERAPÉUTICO (Texto Generado) */}
                <h2 className="text-2xl font-bold mb-4 border-b pb-2 text-gray-800">Resumen Terapéutico</h2>

                <div className="prose max-w-none p-4 border rounded-lg bg-gray-50">
                    <p className="whitespace-pre-wrap text-gray-700">{reporte.resumen || "No se pudo generar el resumen automáticamente."}</p>
                </div>

                {/* 3. ESTADÍSTICAS DEL PERIODO */}
                <div className="pt-6 border-t border-gray-200 space-y-4">
                    <h3 className="text-xl font-semibold mb-3 text-gray-800">Estadísticas Clave del Tratamiento</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-700">
                        {/* Resumen General */}
                        <div className="col-span-2 md:col-span-1 p-3 bg-indigo-50 rounded-lg"><span className="font-medium block">Usuarios Atendidos:</span> <span className="text-lg font-bold text-indigo-700">{resumen.usuarios_atendidos}</span></div>
                        <div className="col-span-2 md:col-span-1 p-3 bg-indigo-50 rounded-lg"><span className="font-medium block">Sesiones Realizadas:</span> <span className="text-lg font-bold text-indigo-700">{resumen.sesiones_realizadas}</span></div>

                        {/* Terapias y Ausencias */}
                        <div className="col-span-4 grid grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
                            <div className="p-3 bg-gray-100 rounded-lg"><span className="font-medium">Total Electroterapias:</span> <span className="font-bold">{estadisticas.total_electroterapias}</span></div>
                            <div className="p-3 bg-gray-100 rounded-lg"><span className="font-medium">Ejercicios Terapéuticos:</span> <span className="font-bold">{estadisticas.total_ejercicios_terapeuticos}</span></div>
                            <div className="p-3 bg-red-100 rounded-lg"><span className="font-medium">Ausencias Justificadas:</span> <span className="font-bold text-red-700">{estadisticas.ausencias_justificadas}</span></div>
                            <div className="p-3 bg-red-100 rounded-lg"><span className="font-medium">Ausencias Injustificadas:</span> <span className="font-bold text-red-700">{estadisticas.ausencias_injustificadas}</span></div>
                            <div className="p-3 bg-gray-100 rounded-lg"><span className="font-medium">Terapias Cognitivas:</span> <span className="font-bold">{estadisticas.total_terapias_cognitivas_pam}</span></div>
                            <div className="p-3 bg-gray-100 rounded-lg"><span className="font-medium">Terapias Grupales:</span> <span className="font-bold">{estadisticas.terapias_grupales}</span></div>
                            <div className="p-3 bg-gray-100 rounded-lg"><span className="font-medium">Evaluaciones Realizadas:</span> <span className="font-bold">{estadisticas.evaluaciones_realizadas}</span></div>
                        </div>
                    </div>
                </div>

                {/* 4. CASOS DESTACADOS */}
                {casos.length > 0 && (
                    <div className="pt-6 border-t border-gray-200 space-y-4">
                        <h3 className="text-xl font-semibold text-gray-800">Casos Destacados del Periodo ({casos.length})</h3>
                        {casos.map((caso, index) => (
                            <div key={index} className="border border-red-200 p-4 rounded-lg bg-red-50 space-y-2">
                                <p className="text-md font-bold text-red-800">{caso.titulo} - <span className="font-normal text-sm">{caso.fecha_creacion.substring(0, 10)}</span></p>
                                <p className="text-sm"><span className="font-medium">Paciente:</span> {caso.paciente.nombre_completo} (Cédula: {caso.paciente.cedula})</p>
                                <p className="text-sm italic text-gray-700">{caso.descripcion}</p>
                            </div>
                        ))}
                    </div>
                )}

                {/* 5. DATOS DE BÚSQUEDA ORIGINALES (Mantenido y mejorado) */}
                <div className="pt-6 border-t border-gray-200">
                    <h3 className="text-xl font-semibold mb-3">Parámetros de Búsqueda</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
                        <div><span className="font-medium block">Periodo:</span> {datosBusqueda.inicio} al {datosBusqueda.fin}</div>
                        <div><span className="font-medium block">Dificultades Reportadas:</span> {datosBusqueda.dificultades || 'N/A'}</div>
                        <div className="md:col-span-2"><span className="font-medium block">Medios Terapéuticos Utilizados:</span> {datosBusqueda.medios}</div>
                        <div className="md:col-span-2"><span className="font-medium block">Recomendaciones:</span> {datosBusqueda.recomendaciones}</div>
                    </div>
                </div>

            </div>
        </div>
    );
}
