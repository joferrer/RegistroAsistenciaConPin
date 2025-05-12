import { registrarIngreso } from "../../firebase/realtimedb";

type PinEntry = {
    expiresAt: number;
    correo: string;
    nombre: string;
  };
  
  const pinStore = new Map<string, PinEntry>();
  const PIN_EXPIRATION_MINUTES = 9;

  function generatePin(): string {
    return Math.floor(10000 + Math.random() * 90000).toString(); // 5 dígitos
  }
  
  export function createPin({
    correo,
    nombre,
  }: {
    correo: string;
    nombre: string;
  }): { pin: string; fechaExpiracion: string } {

    const pin = generatePin();
    const expiresAt = Date.now() + PIN_EXPIRATION_MINUTES * 60 * 1000;
    pinStore.set(pin, { expiresAt,correo,nombre });
    return {pin, fechaExpiracion: new Date(expiresAt).toLocaleString()};
  }
  
  export async function verifyPin(inputPin: string):  Promise<string>  {
    
    const entry = pinStore.get(inputPin);
    if (!entry) {
      return "PIN no encontrado";
    };
  
    const isExpired = Date.now() > entry.expiresAt;
    pinStore.delete(inputPin); // Se elimina de todas formas
    if(!isExpired) {
      await registrarIngreso({
        nombre: entry.nombre,
        correo: entry.correo,
      })

    }
    return !isExpired ? entry.nombre : 'PIN expirado';
  }
  
  export function cleanupExpiredPins(): void {
    const now = Date.now();
    for (const [pin, entry] of pinStore.entries()) {
      if (entry.expiresAt < now) {
        pinStore.delete(pin);
      }
    }
  }

  export function showPins(): void {
    console.log("PINs actuales:");
    for (const [pin, entry] of pinStore.entries()) {
      console.log(`
        PIN: ${pin}, 
        Expira en: ${new Date(entry.expiresAt).toLocaleString()}
        Correo: ${entry.correo}
        Nombre: ${entry.nombre || 'No proporcionado'}
        `);
    }
  }
  