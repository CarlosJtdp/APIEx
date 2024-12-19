import { conmysql } from "../db.js";

export const obtenerEquipos = async (req, res) => {
    try {
        const [rows] = await conmysql.query("SELECT id_eq, nombre_eq FROM equipo");
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener equipos", error });
    }
};


export const crearPartido = async (req, res) => {
    const { eq_uno, eq_dos, fecha_par } = req.body;
    if (!eq_uno || !eq_dos || !fecha_par) {
        return res.status(400).json({ message: "Todos los campos son obligatorios" });
    }
    if (eq_uno === eq_dos) {
        return res.status(400).json({ message: "Los equipos no pueden ser iguales" });
    }
    if (new Date(fecha_par) <= new Date()) {
        return res.status(400).json({ message: "La fecha debe ser futura" });
    }
    try {
        await conmysql.query(
            "INSERT INTO partido (eq_uno, eq_dos, fecha_par, estado_par) VALUES (?, ?, ?, 'activo')",
            [eq_uno, eq_dos, fecha_par]
        );
        res.status(201).json({ message: "Partido creado exitosamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al crear el partido", error });
    }
};
