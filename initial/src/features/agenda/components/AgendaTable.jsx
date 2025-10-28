import { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import BodyTable from "./BodyTable";
import PopUp from "../../../components/PopUp"
import CreateCita from "./CreateCita"
import { useAgendaContext } from "../context/AgendaContext";

export default function AgendaTable({ data, isLoading, error, succes, generarCita, pacientes }) {

    const [modal, setModal] = useState();
    const crearCita = () => {
        setModal(true)
    }
    const handleCita = (data) => {
        generarCita(data)
        setModal(false)
    }

    const {
        matrizDeSemanas,
        mesActual,
        anioActual,
        dictMes,
        cambiarMes,
        volverHoy
    } = useAgendaContext();

    return (
        <div className="max-w-xl mx-auto p-4 bg-white shadow-2xl rounded-xl ">
            <button className="mb-2 p-2 bg-yellow-400 rounded-lg cursor-pointer w-full" onClick={crearCita}>Crear Cita</button>
            <div className="grid grid-cols-5 justify-between items-center p-4 mb-4 bg-blue-600 text-white rounded-t-lg">
                <p
                    className="cursor-pointer text-xl hover:text-blue-200 transition"
                    onClick={() => cambiarMes(-1)}
                >
                    <FaChevronLeft />
                </p>
                <h3 className="text-xl col-span-2 font-bold">
                    {dictMes[mesActual + 1]} {anioActual}
                </h3>
                <p
                    className="cursor-pointer text-xl hover:text-blue-200 transition"
                    onClick={() => cambiarMes(1)}
                >
                    <FaChevronRight />
                </p>
                <button className="cursor-pointer text-xl hover:text-blue-200 transition rounded-lg hover:bg-blue-700" onClick={volverHoy}>Hoy</button>
            </div>

            <table className="w-full border-collapse table-fixed bg-white">
                <thead>
                    <tr className="border-b border-gray-300">
                        {['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'].map(day => (
                            <th key={day} className="text-center text-sm uppercase text-gray-700 p-2 font-medium bg-gray-100">
                                {day.substring(0, 3)}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {matrizDeSemanas.map((semana, indiceSemana) => (
                        <tr key={indiceSemana}>
                            <BodyTable
                                semana={semana}
                                indiceSemana={indiceSemana} 
                            />
                        </tr>
                    ))}
                </tbody>

            </table>
            <PopUp isModalOpen={modal} closeModal={() => setModal(false)}>
                <CreateCita
                    generarCita={handleCita}
                    pacientes={pacientes}

                />
            </PopUp>
        </div>
    );
}