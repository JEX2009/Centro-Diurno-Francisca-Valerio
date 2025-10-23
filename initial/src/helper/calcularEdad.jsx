export function calcularEdad(fechaNacimientoString) {

    const hoy = new Date();
    const anioActual = hoy.getFullYear();
    const mesActual = hoy.getMonth(); 
    const diaActual = hoy.getDate(); 
    const fechaNac = new Date(`${fechaNacimientoString}T00:00:00Z`);

    const anioNac = fechaNac.getUTCFullYear();
    const mesNac = fechaNac.getUTCMonth(); 
    const diaNac = fechaNac.getUTCDate();   
    let edad = anioActual - anioNac;

    const aunNoEsElMes = mesActual < mesNac;

    const esElMesPeroNoElDia = (mesActual === mesNac && diaActual < diaNac);

    if (aunNoEsElMes || esElMesPeroNoElDia) {
        edad--;
    }

    return edad;
}