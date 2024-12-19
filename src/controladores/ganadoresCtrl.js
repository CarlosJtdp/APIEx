import { conmysql } from "../db.js";

export const listarGanadores = async (req, res) => {
  try {
    const [totalApostado] = await conmysql.query(`
      SELECT SUM(valor) AS total_apostado
      FROM pronostico pr
      JOIN partido pa ON pr.id_par = pa.id_par
      WHERE pa.estado_par = 'cerrado'
    `);

    const [apostadoPorGanadores] = await conmysql.query(`
      SELECT SUM(pr.valor) AS total_apostado_ganadores
      FROM pronostico pr
      JOIN partido pa ON pr.id_par = pa.id_par
      JOIN resultado r ON pa.id_res = r.id_res
      WHERE pa.estado_par = 'cerrado' 
        AND pr.id_res = pa.id_res
    `);

    const [ganadores] = await conmysql.query(`
      SELECT 
        u.id_usr, 
        u.nombres, 
        pa.id_par AS partido_id, 
        CONCAT(eq1.nombre_eq, ' vs ', eq2.nombre_eq) AS partido, 
        CASE
          WHEN r.descripcion_res = 'Local' THEN eq1.nombre_eq
          WHEN r.descripcion_res = 'Visitante' THEN eq2.nombre_eq
          WHEN r.descripcion_res = 'Empate' THEN 'Empate'
          ELSE 'Resultado no definido'
        END AS resultado_partido,
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

    if (ganadores.length === 0) {
      return res.status(404).json({ message: "No se encontraron ganadores" });
    }

    const totalApostadoGanadores = apostadoPorGanadores[0].total_apostado_ganadores;
    const totalApostadoGeneral = totalApostado[0].total_apostado;

    const ganancias = ganadores.map(ganador => {
      const ganancia = (ganador.valor_apostado / totalApostadoGanadores) * totalApostadoGeneral;
      return {
        ...ganador,
        ganancia
      };
    });

    res.status(200).json({ 
      ganadores: ganancias 
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener el ganador con las ganancias", error });
  }
};
