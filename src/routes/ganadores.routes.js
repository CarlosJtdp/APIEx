import { Router } from "express";
import { listarGanadores } from "../controladores/ganadoresCtrl.js";

const router = Router();

router.get("/ganador", listarGanadores);

export default router;
