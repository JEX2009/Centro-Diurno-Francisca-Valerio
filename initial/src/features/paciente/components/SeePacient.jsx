export default function SeePacient(props) {
    const { paciente, calcularEdad, citas } = props;

    const dataCitas = citas.data
    const citasPaciente = dataCitas.filter((cita) => {
        return cita.cita.paciente.id === paciente.id
    })

    return (

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 bg-white p-4 rounded-lg">
            <section>
                <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-300 pb-2 mb-4">
                    Información del Paciente
                </h3>

                <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">

                    <div className="md:col-span-2">
                        <dt className="text-sm font-medium text-gray-500">Nombre Completo</dt>
                        <dd className="text-gray-900">{paciente.nombre_completo}</dd>
                    </div>
                    <div>
                        <dt className="text-sm font-medium text-gray-500">Cédula</dt>
                        <dd className="text-gray-900">{paciente.cedula}</dd>
                    </div>
                    <div>
                        <dt className="text-sm font-medium text-gray-500">Edad</dt>
                        <dd className="text-gray-900">{calcularEdad(paciente.fecha_nacimiento)}</dd>
                    </div>
                    {paciente.email && (
                        <div>
                            <dt className="text-sm font-medium text-gray-500">Email</dt>
                            <dd className="text-gray-900">{paciente.email}</dd>
                        </div>
                    )}
                    {paciente.telefono && (
                        <div>
                            <dt className="text-sm font-medium text-gray-500">Teléfono</dt>
                            <dd className="text-gray-900">{paciente.telefono}</dd>
                        </div>
                    )}
                    <div className="md:col-span-2">
                        <dt className="text-sm font-medium text-gray-500">Dirección</dt>
                        <dd className="text-gray-900">{paciente.direccion}</dd>
                    </div>
                </dl>
            </section>
            <section>
                <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-300 pb-2 mb-4">
                    Historial Médico
                </h3>

                <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                    {/* Diabetes */}
                    <div>
                        <dt className="text-sm font-medium text-gray-500">¿Tiene Diabetes?</dt>
                        <dd className="text-gray-900">{paciente.tiene_diabetes ? 'Sí' : 'No'}</dd>
                    </div>
                    {paciente.tiene_diabetes && (
                        <div>
                            <dt className="text-sm font-medium text-gray-500">Fecha de Diagnóstico</dt>
                            <dd className="text-gray-900">{paciente.fecha_diagnostico_diabetes}</dd>
                        </div>
                    )}
                    <div className="md:col-span-2">
                        <dt className="text-sm font-medium text-gray-500">Enfermedades</dt>
                        <dd className="text-gray-900">{paciente.enfermedades}</dd>
                    </div>
                    <div className="md:col-span-2">
                        <dt className="text-sm font-medium text-gray-500">Observaciones</dt>
                        <dd className="text-gray-900">{paciente.observaciones}</dd>
                    </div>
                </dl>
            </section>
            <section>
                <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-300 pb-2 mb-4">
                    Información Adicional
                </h3>

                <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                    <div>
                        <dt className="text-sm font-medium text-gray-500">Género</dt>
                        <dd className="text-gray-900">{paciente.genero}</dd>
                    </div>
                    <div>
                        <dt className="text-sm font-medium text-gray-500">Profesión</dt>
                        <dd className="text-gray-900">{paciente.profesion}</dd>
                    </div>
                    {paciente.cantidad_hijos > 0 && (
                        <div>
                            <dt className="text-sm font-medium text-gray-500">Cantidad de Hijos</dt>
                            <dd className="text-gray-900">{paciente.cantidad_hijos}</dd>
                        </div>
                    )}
                    <div>
                        <dt className="text-sm font-medium text-gray-500">Estado de Pensión</dt>
                        <dd className="text-gray-900">{paciente.estado_pension}</dd>
                    </div>
                    {paciente.estado_pension !== 'No tiene' && (
                        <div>
                            <dt className="text-sm font-medium text-gray-500">Monto de Pensión</dt>
                            <dd className="text-gray-900">{paciente.monto_pension}</dd>
                        </div>
                    )}
                    <div>
                        <dt className="text-sm font-medium text-gray-500">Fecha de Ingreso</dt>
                        <dd className="text-gray-900">{paciente.fecha_ingreso}</dd>
                    </div>
                    {paciente.personas_con_las_que_habita && (
                        <div className="md:col-span-2">
                            <dt className="text-sm font-medium text-gray-500">Personas con las que Habita</dt>
                            <dd className="text-gray-900">{paciente.personas_con_las_que_habita}</dd>
                        </div>
                    )}
                </dl>
            </section>
            <section>
                <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-300 pb-2 mb-4">
                    Atenciones Anteriores
                </h3>
                
                {/* 3. Contenedor con alto máximo y scroll */}
                <div className="h-96 overflow-y-auto space-y-3 pr-2">
                    
                    {citasPaciente.length > 0 ? (
                        citasPaciente.map((atencion) => (
                            <div 
                                key={atencion.id} 
                                className="bg-gray-50 border border-gray-200 rounded-lg p-3 shadow-sm"
                            >
                                <p className="text-sm font-semibold text-gray-700">
                                    Fecha: {atencion.cita.fecha}
                                </p>
                                <p className="text-sm text-gray-600 mt-1">
                                    <span className="font-medium text-gray-800">Dolor:</span> {atencion.dolor_localizacion}
                                </p>
                                <p className="text-sm text-gray-600 mt-1">
                                    <span className="font-medium text-gray-800">Procedimiento:</span> {atencion.procedimiento}
                                </p>
                            </div>
                        ))
                    ) : (
                        <div className="flex items-center justify-center h-full text-gray-500 text-sm">
                            <p>No hay atenciones registradas.</p>
                        </div>
                    )}
                </div>
            </section>
        </div>
    )
}