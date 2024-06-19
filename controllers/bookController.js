// controllers/bookController.js
import { createBook, getBooks, getBookById, updateBook, deleteBook } from '../models/book.js';

const addBook = async (req, res) => {
    const book = await createBook(req.body);
    res.status(201).send(book);
};

const fetchBooks = async (req, res) => {
    const books = await getBooks();
    res.send(books);
};

const fetchBookById = async (req, res) => {
    const book = await getBookById(req.params.id);
    if (!book) {
        return res.status(404).send({ error: 'Book not found' });
    }
    res.send(book);
};

const editBook = async (req, res) => {
    const book = await updateBook(req.params.id, req.body);
    if (!book) {
        return res.status(404).send({ error: 'Book not found' });
    }
    res.send(book);
};

const removeBook = async (req, res) => {
    const book = await deleteBook(req.params.id);
    res.send(book);
};

export { addBook, fetchBooks, fetchBookById, editBook, removeBook };
