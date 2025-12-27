import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import mysql from 'mysql2';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 5000;
dotenv.config();
const HOST = process.env.HOST;
const USER = process.env.USER;
const PASSWORD = process.env.PASSWORD;
const DATABASE = process.env.DATABASE;

app.use(express.static(path.join(__dirname, "public")));

try {
    var pool = await mysql.createPool({
    host: HOST,
    user: USER,
    password: PASSWORD,
    database: DATABASE
    }).promise();
    console.log("Sucesso ao criar a pool", pool);
} catch(error) {
    console.log(error);
}

try {
    const result = await pool.query('SELECT 1');
    console.log("SELECT funcionando");
}
catch (error){
    console.log(error);
}

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/public/index.html")
})

app.listen(PORT, () =>{
    console.log("Server running at port: " + PORT)
})