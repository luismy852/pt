import {pool} from '../db.js'

export const createCourse = async (req, res) => {
  try {
    const { name, description, start_date , status } = req.body;

    const { rows } = await pool.query(
      "INSERT INTO programs (name, description, start_date, status) VALUES ($1, $2, $3, $4) RETURNING *",
      [name, description, start_date, status]
    );

    res.status(201).json(rows[0]);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getCourses = async (req, res) => {
  const response = await pool.query("SELECT * FROM programs ORDER BY id ASC");
  res.status(200).json(response.rows);
};

export const getCourseById = async (req, res) => {
  const id = parseInt(req.params.id);
  const response = await pool.query("SELECT * FROM programs WHERE id = $1", [id]);
  res.json(response.rows);
};

export const updateCourse = async (req, res) => {
  const id = parseInt(req.params.id);
  const { name, description, start_date , status } = req.body;

  const { rows } = await pool.query(
    "UPDATE programs SET name = $1, description = $2, start_date = $3,  status =$4 WHERE id = $5 RETURNING *",
    [name, description, start_date , status, id]
  );

  return res.json(rows[0]);
};

export const deleteCourse = async (req, res) => {
  const id = parseInt(req.params.id);
  const { rowCount } = await pool.query("DELETE FROM programs where id = $1", [
    id,
  ]);

  if (rowCount === 0) {
    return res.status(404).json({ message: "User not found" });
  }

  return res.sendStatus(204);
};