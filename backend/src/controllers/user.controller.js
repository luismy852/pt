import {pool} from '../db.js'

export const createRequest =  async (req, res) => {
  const { program_id } = req.body;
  const user_id = req.user.id; // viene del JWT

  const result = await pool.query(
    `INSERT INTO requests (user_id, program_id) VALUES ($1, $2) RETURNING *`,
    [user_id, program_id]
  );

  res.status(201).json(result.rows[0]);
}


export const listRequest = async (req, res) => {
    const { status } = req.query;

    try {
        let query = "SELECT * FROM requests";
        let params = [];

        if (status) {
            query += " WHERE status = $1";
            params.push(status);
        }

        const { rows } = await pool.query(query, params);
        res.status(200).json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener solicitudes" });
    }
};



export const aproveRequest = async (req, res) =>{
    const id = parseInt(req.params.id);

    // actualizar La peticion

    const result = await pool.query(
        'UPDATE requests SET status = $1 WHERE id = $2 RETURNING *', ["aprobado", id]
    )

    //actualizar el usuario

    const data = result.rows[0]

    if(!data) return res.status(404).json({message: "Soliicitud no encontrada"})
    console.log(data)

    const {rows} = await pool.query('UPDATE users SET program_id = $1 WHERE id = $2 RETURNING *', [data.program_id, data.user_id])

    res.status(200).json(rows)
}


export const listUsers = async (req, res) => {

    try {
        const {rows} = await pool.query("SELECT * FROM users WHERE program_id IS NOT NULL AND role = 'user'") ;

        res.status(200).json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener solicitudes" });
    }
};