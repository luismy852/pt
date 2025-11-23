import { Router } from "express";
import { login } from "../controllers/auth.controller.js";
import {pool} from '../db.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import env from 'dotenv'
const router = Router();
env.config();

const JWT_SECRET = process.env.SECRET

router.get("/user", async (req, res) =>{
    const {rows} = await pool.query('SELECT * FROM users')

    res.json(rows)
});

router.post("/register", async (req, res) => {
    const {name, username, password} = req.body
    const hash = await bcrypt.hash(password, 10)
    const result = await pool.query('INSERT INTO users (full_name, email, password) VALUES ($1, $2, $3)', [name, username, hash])
    console.log(req.body)
    console.log(result)
})


router.post("/login", login)



export default router;
