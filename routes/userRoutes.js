import express from 'express';
import { register, login, getUser, updateUserDetails, removeUser } from '../controllers/userController.js';
import { auth, adminGuard } from '../middlewares/auth.js';

const router = new express.Router();

router.post('/users/register', register);
router.post('/users/login', login);
router.get('/users/me', auth, getUser);
router.patch('/users/me', auth, updateUserDetails);
router.delete('/users/:id', auth, adminGuard, removeUser);

export default router;
