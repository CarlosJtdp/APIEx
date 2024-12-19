import express from 'express';
import { login } from '../controladores/autenticacionCtrl.js';

const router = express.Router();

router.post('/login', login);

export default router;
