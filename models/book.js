// models/book.js
import pool from '../config/database.js';

const createBook = async (book) => {
    const { name, genre, author, price } = book;
    const result = await pool.query(
        'INSERT INTO books (name, genre, author, price) VALUES ($1, $2, $3, $4) RETURNING *',
        [name, genre, author, price]
    );
    return result.rows[0];
};

const getBooks = async () => {
    const result = await pool.query('SELECT * FROM books');
    return result.rows;
};

const getBookById = async (id) => {
    const result = await pool.query('SELECT * FROM books WHERE id = $1', [id]);
    return result.rows[0];
};

const updateBook = async (id, updates) => {
    const fields = Object.keys(updates).map((key, i) => `${key} = $${i + 2}`).join(', ');
    const values = Object.values(updates);
    values.unshift(id);
    const result = await pool.query(
        `UPDATE books SET ${fields} WHERE id = $1 RETURNING *`,
        values
    );
    return result.rows[0];
};

const deleteBook = async (id) => {
    const result = await pool.query('DELETE FROM books WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
};

export { createBook, getBooks, getBookById, updateBook, deleteBook };
