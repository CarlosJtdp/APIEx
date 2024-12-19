import express from 'express';
import { obtenerEquipos, crearPartido } from '../controladores/partidoadminCtrl.js';

const router = express.Router();

router.get("/equipos", obtenerEquipos); 
router.post("/crearpartido", crearPartido);

export default router;
