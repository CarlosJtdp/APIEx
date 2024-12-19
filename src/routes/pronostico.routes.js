import express from 'express';
import { obtenerPartidosActivos, registrarPronostico } from '../controladores/pronosticoCtrl.js';

const router = express.Router();

router.get("/partidosactivos", obtenerPartidosActivos); 
router.post("/registrarpronostico", registrarPronostico); 

export default router;
