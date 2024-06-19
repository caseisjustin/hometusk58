import pkg from 'pg';
const { Pool } = pkg
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

(() => {
    pool.query(`
        CREATE TABLE IF NOT EXISTS Users (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255),
            email VARCHAR(255) UNIQUE,
            password VARCHAR(255),
            phoneNumber VARCHAR(20),
            role VARCHAR(50)
        );
    
        CREATE TABLE IF NOT EXISTS books (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255),
            genre VARCHAR(255),
            author VARCHAR(255),
            price DECIMAL(10, 2)
        );

        CREATE TABLE IF NOT EXISTS payedBooks (
            id SERIAL PRIMARY KEY,
            userid INT REFERENCES Users(id),
            bookid INT REFERENCES books(id)
        );
    `)
    console.log("created tables")
})()

export default pool;