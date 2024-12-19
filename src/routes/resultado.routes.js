import { Router } from "express";
import { registrarResultado } from "../controladores/resultadoCtrl.js";

const router = Router();

router.put("/resultado", registrarResultado);

export default router;
