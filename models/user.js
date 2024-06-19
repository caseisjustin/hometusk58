// models/user.js
import pool from '../config/database.js';

const createUser = async (user) => {
    const { name, email, password, phoneNumber, role } = user;
    const result = await pool.query(
        'INSERT INTO Users (name, email, password, phoneNumber, role) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [name, email, password, phoneNumber, role]
    );
    return result.rows[0];
};

const getUserByEmail = async (email) => {
    const result = await pool.query('SELECT * FROM Users WHERE email = $1', [email]);
    return result.rows[0];
};

const getUserById = async (id) => {
    const result = await pool.query('SELECT * FROM Users WHERE id = $1', [id]);
    return result.rows[0];
};

const updateUser = async (id, updates) => {
    const fields = Object.keys(updates).map((key, i) => `${key} = $${i + 2}`).join(', ');
    const values = Object.values(updates);
    values.unshift(id);
    const result = await pool.query(
        `UPDATE Users SET ${fields} WHERE id = $1 RETURNING *`,
        values
    );
    return result.rows[0];
};

const deleteUser = async (id) => {
    const result = await pool.query('DELETE FROM Users WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
};

export { createUser, getUserByEmail, getUserById, updateUser, deleteUser };
