import { Router } from 'express';
import { createPin, showPins } from './pin';


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
    showPins();
    res.json({ pin, fechaExpiracion });
});

