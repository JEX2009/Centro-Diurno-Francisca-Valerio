import { useAgendaContext } from "../context/AgendaContext"; 
export default function BodyTable({ semana, indiceSemana}) {

    const {
        anioActual,
        mesActual,
        diaDeHoy,
        hoy,
        colocarFecha,
        fechaActual
    } = useAgendaContext();

    const handleDia = (dia) => {
        if (dia === null) {
            return
        }
        colocarFecha(dia, mesActual, anioActual)
    }

    return (
        <>
            {semana.map((dia, indiceDia) => {
                const clave = dia === null
                    ? `empty-${indiceSemana}-${indiceDia}`
                    : `${anioActual}-${mesActual}-${dia}`;

                const esHoy = (
                    dia === diaDeHoy &&
                    mesActual === hoy.getMonth() &&
                    anioActual === hoy.getFullYear()
                );

                const selectedDay = (
                    dia === fechaActual.getDate() &&
                    mesActual === fechaActual.getMonth() &&
                    anioActual === fechaActual.getFullYear()
                );

                const claseDia = esHoy
                    ? 'bg-blue-600 text-white font-bold rounded-full'
                    : selectedDay ? 'bg-blue-400 text-white font-bold rounded-full' : 'text-gray-800 ';

                const functional = dia !== null? 'cursor-pointer transition duration-150 hover:bg-gray-100': '';

                return (
                    <td key={clave} className={`text-center p-1 h-12 border border-gray-200 ${functional}`} onClick={() => handleDia(dia)}>
                        {dia !== null && (
                            <button className={`mx-auto flex items-center justify-center w-8 h-8  ${claseDia}`}  >
                                {dia}
                            </button>
                        )}
                    </td>
                );
            })}
        </>
    )
}