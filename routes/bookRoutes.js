import express from 'express';
import { addBook, fetchBooks, fetchBookById, editBook, removeBook } from '../controllers/bookController.js';
import { auth, adminGuard } from '../middlewares/auth.js';

const router = new express.Router();

router.post('/books', auth, adminGuard, addBook);
router.get('/books', fetchBooks);
router.get('/books/:id', fetchBookById);
router.patch('/books/:id', auth, adminGuard, editBook);
router.delete('/books/:id', auth, adminGuard, removeBook);

export default router;
