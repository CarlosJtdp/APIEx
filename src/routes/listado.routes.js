import { Router } from "express";
import { getListado } from "../controladores/listadoCtrl.js";

const router = Router();

router.get("/listado", getListado);

export default router;
