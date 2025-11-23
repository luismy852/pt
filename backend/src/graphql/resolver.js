import { pool } from '../db.js';

export const root = {
  programs: async ({ page = 1, filter = '' }) => {
    const limit = 10;
    const offset = (page - 1) * limit;

    // Obtener cursos filtrados y paginados
    const { rows: items } = await pool.query(
      `SELECT * FROM programs WHERE name ILIKE $1 ORDER BY id LIMIT $2 OFFSET $3`,
      [`%${filter}%`, limit, offset]
    );

    // Obtener total de cursos que cumplen el filtro
    const { rows } = await pool.query(
      `SELECT COUNT(*) FROM programs WHERE name ILIKE $1`,
      [`%${filter}%`]
    );

    return {
      items,
      total: parseInt(rows[0].count)
    };
  }
};