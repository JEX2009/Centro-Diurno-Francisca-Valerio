export default function SeeCaso({ caso }) {
    const fecha = new Date(caso.fecha_creacion);

    return (
        <div className="bg-white p-6 rounded-lg shadow-xl max-w-lg mx-auto mb-6">
            
            <h2 className="text-2xl font-bold text-indigo-700 border-b pb-2 mb-4">
                Detalles del Caso
            </h2>

            <div className="mb-4 text-sm text-gray-500 border-b border-gray-200 pb-2">
                <span className="font-semibold text-gray-600">Fecha:</span> {fecha.toLocaleDateString()}
            </div>
            
            <div className="grid grid-cols-1 gap-y-4">
                
                <div className="bg-indigo-50 p-3 rounded-md">
                    <p className="text-xs font-medium text-indigo-600 uppercase">Paciente</p>
                    <p className="text-lg font-semibold text-gray-800">{caso.paciente.nombre_completo}</p>
                </div>

                <div className="border-l-4 border-gray-400 pl-3">
                    <p className="text-xs font-medium text-gray-500 uppercase">Título</p>
                    <p className="text-xl font-bold text-gray-900">{caso.titulo}</p>
                </div>
                
                <div>
                    <p className="text-xs font-medium text-gray-500 uppercase mb-1">Descripción</p>
                    <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">{caso.descripcion}</p>
                </div>
                
            </div>
            
        </div>
    );
}