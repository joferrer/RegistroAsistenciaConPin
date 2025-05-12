import { Router } from 'express';
import { createPin, showPins, verifyPin } from './pin';


export const router = Router();


router.post('/generar-pin', (req, res) => {

    const { correo, nombre } = req.body;
    
    if (!correo) {
        res.status(400).json({ error: 'El correo es obligatorio' });
        return;
    }
    if (!nombre) {
        res.status(400).json({ error: 'El nombre es obligatorio' });
        return;
    }

    const {pin, fechaExpiracion} = createPin({ correo, nombre });
    console.log(pin, fechaExpiracion);
    res.json({ pin, fechaExpiracion });
});

router.post('/verificar-pin', async(req, res) => {
    
    const { pin } = req.body;
        
        if (!pin) {
            res.status(400).send('No se ha proporcionado un PIN');
            return;
        }
    
        const nombreUsuario = await verifyPin(pin);
        res.send(nombreUsuario)
      
});