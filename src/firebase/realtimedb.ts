import { database as db } from "./config";

interface DatosIngreso {
    nombre: string;
    correo: string;
    
}

export function registrarIngreso({nombre, correo}: DatosIngreso) {
    
    const refdb = db.ref('asistencias');
    //const refdb = ref(db, 'asistencias');

    return refdb.push({
        nombre: nombre,
        correo: correo,
        fechaIngreso: Date.now(),
    }).then(() => {
        console.log("Datos guardados en la base de datos de Firebase Realtime Database.");
    }
    ).catch((error) => {
        console.error("Error al guardar los datos en Firebase Realtime Database:", error);
    });
}