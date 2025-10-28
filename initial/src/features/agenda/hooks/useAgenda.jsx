import { useState } from "react";

const dictMes = {
        1: "Enero", 2: "Febrero", 3: "Marzo", 4: "Abril",
        5: "Mayo", 6: "Junio", 7: "Julio", 8: "Agosto",
        9: "Septiembre", 10: "Octubre", 11: "Noviembre", 12: "Diciembre"
    }

    const hoy = new Date();
export default function useAgenda() {
    const [fechaActual, setFechaActual] = useState(new Date());

    
    const totalMes = (mes, año) => {
        const diaCero = new Date(año, mes + 1, 0);
        return diaCero.getDate();
    }

    const startDay = (mes, año) => {
        const diaCero = new Date(año, mes, 1);
        return diaCero.getDay();
    }

    const generarMatrizDelMes = (año, mes) => {
        const diasTotales = totalMes(mes, año);
        const diaInicio = startDay(mes, año);

        const ajusteInicio = (diaInicio === 0) ? 6 : diaInicio - 1;

        let arrayDias = [];
        let filaActual = Array(ajusteInicio).fill(null);
        let conteo = 0;

        arrayDias.push(filaActual);

        for (let i = 1; i <= diasTotales; i++) {
            if (arrayDias[conteo].length % 7 === 0) {
                arrayDias.push([i]);
                conteo++;
            } else {
                arrayDias[conteo].push(i);
            }
        }

        while (arrayDias[conteo].length < 7) {
            arrayDias[conteo].push(null);
        }

        return arrayDias;
    }

    const cambiarMes = (direccion) => {
        setFechaActual(prevDate => {
            const newDate = new Date(prevDate.getFullYear(), prevDate.getMonth() + direccion, 1);
            return newDate;
        });
    };

    const volverHoy = ()=>{
        setFechaActual(new Date())
    }

    const colocarFecha= (dia,mes,año)=>{
        const nuevaFecha= new Date(año,mes,dia)
        setFechaActual(nuevaFecha)
    }
    
    const matrizDeSemanas = generarMatrizDelMes(fechaActual.getFullYear(), fechaActual.getMonth());
    const mesActual = fechaActual.getMonth();
    const anioActual = fechaActual.getFullYear();
    const diaDeHoy = hoy.getDate();


    return {
        matrizDeSemanas,
        mesActual,
        anioActual,
        diaDeHoy,
        dictMes,
        fechaActual,
        cambiarMes,
        volverHoy,
        hoy,
        colocarFecha
    }
}