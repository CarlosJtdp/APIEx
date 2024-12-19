import jwt from 'jsonwebtoken';
import { conmysql } from "../db.js";

const SECRET_KEY = process.env.SECRET_KEY; 

export const login = async (req, res) => {
    const { usuario, clave } = req.body;

    try {
        console.log('Credenciales recibidas:', { usuario, clave });
        const [rows] = await conmysql.query(
            "SELECT * FROM usuario WHERE usuario = ? AND clave = ?",
            [usuario, clave]
        );
    
        if (rows.length === 0) {
            console.log('Credenciales incorrectas');
            return res.status(401).json({ message: "Credenciales incorrectas" });
        }
    
        const user = rows[0];
        console.log('Usuario encontrado:', user);
        
        const token = jwt.sign(
            { id: user.id_usr, nombres: user.nombres, perfil: user.per_id }, 
            SECRET_KEY,
            { expiresIn: '1h' } 
        );
    
        return res.json({ 
            token, 
            id: user.id_usr, 
            nombres: user.nombres, 
            perfil: user.per_id 
        });
    } catch (error) {
        console.error('Error en el login:', error);
        res.status(500).json({ message: "Error al iniciar sesión", error });
    }
};
