import {pool} from '../db.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import env from 'dotenv'



env.config();

const JWT_SECRET = process.env.SECRET



export const login = async (req, res) => {

    try{
        const {username, password} = req.body
        const result = await pool.query('SELECT * FROM users WHERE email = $1', [username]);

        const user = result.rows[0];

        if(!user)return res.status(400).json({message: "Usuario invalido"})

        const valid = bcrypt.compareSync(password, user.password)
        console.log(valid)

        if(!valid) return res.status(400).json({message: "Contraseña incorrecta"})

        const token = jwt.sign({id: user.id, username: user.email, role: user.role}, JWT_SECRET, {expiresIn: '1h'})

        const{password: _, ...publicUser}=user
        
        console.log(token)
        res.json({user:publicUser, token } )
    }catch(error){
        console.error(error);
    res.status(500).json({ message: "Error en login" });
    }


}