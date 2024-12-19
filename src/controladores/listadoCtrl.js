import { conmysql } from "../db.js";

export const getListado = async (req, res) => {
  try {
    const [rows] = await conmysql.query(`
      SELECT 
        u.id_usr, 
        u.nombres, 
        CONCAT(eq1.nombre_eq, ' vs ', eq2.nombre_eq) AS partido,  -- Muestra el partido
        CASE 
          WHEN r.descripcion_res = 'Local' THEN eq1.nombre_eq
          WHEN r.descripcion_res = 'Visitante' THEN eq2.nombre_eq
          WHEN r.descripcion_res = 'Empate' THEN 'Empate'
          ELSE 'Resultado no definido'
        END AS resultado_real,  
        CASE 
          WHEN pr.id_res = pa.id_res AND pr.id_res = r.id_res THEN 
            CASE 
              WHEN pr.id_res = 'Local' THEN eq1.nombre_eq
              WHEN pr.id_res = 'Visitante' THEN eq2.nombre_eq
              WHEN pr.id_res = 'Empate' THEN 'Empate'
              ELSE 'Pronóstico no definido'
            END
          END AS pronostico_elegido,  
        pr.valor AS valor_apostado  
      FROM usuario u
      JOIN pronostico pr ON u.id_usr = pr.id_usr
      JOIN partido pa ON pr.id_par = pa.id_par
      JOIN resultado r ON pa.id_res = r.id_res
      JOIN equipo eq1 ON pa.eq_uno = eq1.id_eq  
      JOIN equipo eq2 ON pa.eq_dos = eq2.id_eq
      WHERE pa.estado_par = 'cerrado' 
        AND pr.id_res = pa.id_res
    `);

    if (rows.length === 0) {
      return res.status(404).json({ message: "No se encontraron usuarios que acertaron el pronóstico" });
    }

    res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener los usuarios que acertaron el pronóstico", error });
  }
};
