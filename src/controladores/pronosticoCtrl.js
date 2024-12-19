import { conmysql } from "../db.js";

export const obtenerPartidosActivos = async (req, res) => {
    try {
        const [rows] = await conmysql.query(`
            SELECT 
                p.id_par, 
                e1.nombre_eq AS eq_uno_nombre, 
                e2.nombre_eq AS eq_dos_nombre, 
                p.fecha_par 
            FROM partido p
            JOIN equipo e1 ON p.eq_uno = e1.id_eq
            JOIN equipo e2 ON p.eq_dos = e2.id_eq
            WHERE p.estado_par = 'activo'
        `);
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener partidos activos", error });
    }
};


export const registrarPronostico = async (req, res) => {
    const { id_usr, id_par, id_res, valor } = req.body;
    
    console.log("Datos recibidos:", req.body);
    
    if (!id_usr || !id_par || !id_res || !valor) {
      return res.status(400).json({ message: "Todos los campos son obligatorios" });
    }
  
    const fechaRegistro = new Date().toISOString().slice(0, 19).replace('T', ' '); 
  
    try {
      await conmysql.query(
        "INSERT INTO pronostico (id_usr, id_par, id_res, valor, fecha_registro) VALUES (?, ?, ?, ?, ?)",
        [id_usr, id_par, id_res, valor, fechaRegistro]
      );
      res.status(201).json({ message: "Pronóstico registrado exitosamente" });
    } catch (error) {
      res.status(500).json({ message: "Error al registrar el pronóstico", error });
    }
  };
  
  
