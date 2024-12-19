import { conmysql } from "../db.js";

export const registrarResultado = async (req, res) => {
  const { id_par, id_res } = req.body; 

  if (!id_par || !id_res) {
    return res.status(400).json({ message: "Los campos id_par y id_res son obligatorios" });
  }

  try {
    const [result] = await conmysql.query(
      "UPDATE partido SET id_res = ?, estado_par = 'cerrado' WHERE id_par = ?",
      [id_res, id_par] 
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Partido no encontrado" });
    }

    res.status(200).json({ message: "Resultado registrado exitosamente y partido cerrado" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al registrar el resultado", error });
  }
};