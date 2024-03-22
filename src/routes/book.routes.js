import express from "express";
export const router = express.Router();
import Book from "../models/book.model.js";

// MIDDLEWARE
const getBook = async (req, res, next) => {
  let book;
  const { id } = req.params;
  if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(404).json({ message: "El ID del libro no es válido." });
  }

  try {
    book = await Book.findById(id);
    if (!book) {
      return res.status(404).json({ message: "El libro no fue encontrado" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
  res.book = book;
  next();
};

// Obtener todos los libros [GET ALL]
router.get("/", async (req, res) => {
  try {
    const books = await Book.find();
    console.log(`GET ALL ${books}`);
    if (books.length === 0) {
      return res.status(204).json([]);
    }
    res.json(books);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// Crear un nuevo libro (recurso) [POST]
router.post("/", async (req, res) => {
  const { title, author, genre, publication_date } = req?.body;
  if (!title || !author || !genre || !publication_date) {
    return res.status(400).json({
      message: "Los campos título, autor, género y fecha son obligatorias.",
    });
  }
  const book = new Book({ title, author, genre, publication_date });
  try {
    const newBook = await book.save();
    console.log(newBook);
    res.status(201).json(newBook);
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
});
