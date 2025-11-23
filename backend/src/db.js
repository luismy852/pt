import pg, { Result } from 'pg'
import dotenv from 'dotenv'
dotenv.config()

export const pool = new pg.Pool({
    user: process.env.USER_DB,
    host: process.env.HOST_DB,
    password: process.env.PASSWORD_DB,
    database: process.env.NAME_DB,
    port: Number(process.env.PORT_DB), // convertir a número
})