import { useAgendaContext } from "../context/AgendaContext";
import { useMemo, useState } from 'react';
import CitasDetails from "./CitasDetails";
import PopUp from "../../../components/PopUp";

export default function ShowCitas({ citas, onSubmit,añadirAusencia,dataTerpia }) {
    const [modal, setModal] = useState(false);
    const [selectCita, setSelectedCita] = useState([]);

    const { fechaActual } = useAgendaContext();
    const handleCita = (citaId) => {
        const cita = citas.filter((cita) => {
            return cita.id === citaId
        });
        setSelectedCita(cita)
        setModal(true);
    };

    const handleCloseModal = () => {
        setModal(false);
        setSelectedCita(null);
    };

    const { citasDeHoy, diaFormateado } = useMemo(() => {
        const formatted = fechaActual.toLocaleDateString('es-ES', {
            weekday: 'long',
            day: 'numeric',
            month: 'long'
        });

        const hoyString = fechaActual.toLocaleDateString('sv-SE');

        const filtradas = citas.filter((cita) => {
            return cita.fecha === hoyString
        });


        return { citasDeHoy: filtradas, diaFormateado: formatted };

    }, [fechaActual, citas]);

    const tituloDia = diaFormateado.charAt(0).toUpperCase() + diaFormateado.slice(1);


    return (
        <>
            <div className="p-6 bg-white shadow-xl rounded-xl border border-gray-200 h-full overflow-y-auto">
                <h2 className="text-2xl font-bold text-blue-800 mb-5 pb-3 border-b border-gray-300">
                    Citas del día: <span className="text-blue-600">{tituloDia}</span>
                </h2>

                <div>
                    {citasDeHoy.length !== 0 ? (
                        citasDeHoy.map((cita) => {
                            const completo =cita.estado_cita ==="COMPLETA"? ()=>console.log():() => handleCita(cita.id);

                            return (

                                <div
                                    key={cita.id}
                                    className={cita.estado_cita !=="COMPLETA"? (cita.estado_cita!== "AUSENCIA"?"bg-blue-50 border border-blue-200 rounded-lg p-4 mb-3 shadow-sm transition-all duration-200 hover:shadow-md hover:border-blue-300 hover:bg-blue-100 cursor-pointer" : "bg-red-50 border border-red-200 rounded-lg p-4 mb-3 shadow-sm transition-all duration-200 hover:shadow-md hover:border-red-300 hover:bg-red-100 cursor-pointer"): "bg-green-50 border border-green-200 rounded-lg p-4 mb-3 "}
                                    onClick={completo}
                                >
                                    <div className="flex justify-between items-start">
                                        <span className={cita.estado_cita !=="COMPLETA"?(cita.estado_cita!== "AUSENCIA"? "text-xl font-bold text-blue-700 bg-blue-100 px-3 py-1 rounded-md": "text-xl font-bold text-red-700 bg-red-100 px-3 py-1 rounded-md"):"text-xl font-bold text-green-700 bg-green-100 px-3 py-1 rounded-md"}>
                                            {cita.hora}
                                        </span>
                                    </div>

                                    <div className="mt-3">
                                        <p className="text-lg font-semibold text-gray-900">
                                            {cita.paciente.nombre_completo}
                                        </p>
                                        <p
                                            className="text-sm text-gray-600 truncate"
                                            title={cita.paciente.enfermedades || 'Sin enfermedades'}
                                        >
                                            {"Enfermedades: " + (cita.paciente.enfermedades || 'Sin enfermedades registradas')}
                                        </p>
                                        <p
                                            className="text-sm text-gray-600 truncate"
                                            title={cita.motivo_consulta || 'Sin motivo'}
                                        >
                                            {"Motivo de consulta: " + (cita.motivo_consulta || 'Sin motivo registrado')}
                                        </p>
                                    </div>
                                </div>
                            )
                        })
                    ) : (
                        <div className="flex flex-col items-center justify-center h-60 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 text-gray-500">
                            <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                            <span className="mt-3 text-lg font-medium">
                                No hay citas para este día
                            </span>
                        </div>
                    )}
                </div>
            </div>

            {selectCita && (
                <PopUp isModalOpen={modal} closeModal={handleCloseModal}>
                    <CitasDetails
                        selectCita={selectCita}
                        closeModal={handleCloseModal}
                        onSubmit={onSubmit}
                        añadirAusencia={añadirAusencia}
                        dataTerpia={dataTerpia}
                    />
                </PopUp>
            )}
        </>
    )
}