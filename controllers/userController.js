// controllers/userController.js
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { createUser, getUserByEmail, getUserById, updateUser, deleteUser } from '../models/user.js';

dotenv.config();

const register = async (req, res) => {
    const { name, email, password, phoneNumber, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 8);
    const user = await createUser({ name, email, password: hashedPassword, phoneNumber, role });
    res.status(201).send(user);
};

const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await getUserByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(400).send({ error: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET);
    res.send({ user, token });
};

const getUser = async (req, res) => {
    const user = await getUserById(req.user.id);
    res.send(user);
};

const updateUserDetails = async (req, res) => {
    const updates = req.body;
    const user = await updateUser(req.user.id, updates);
    res.send(user);
};

const removeUser = async (req, res) => {
    const user = await deleteUser(req.params.id);
    res.send(user);
};

export { register, login, getUser, updateUserDetails, removeUser };
