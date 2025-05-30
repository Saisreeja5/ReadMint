import Book from "../models/Book.js";

const uploadBookController = async (req, res) => {
  try {
    const { title, author, description, fileUrl, coverImage } = req.body;

    if (!title || !author || !description || !fileUrl || !coverImage) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const userId = req.user._id; // ✅ From middleware

    const book = await Book.create({
      title,
      author,
      description,
      fileUrl,
      coverImage,
      addedBy: userId,
    });

    res.status(200).json({ book, message: "Book added successfully" });
  } catch (error) {
    console.error("Book creation error", error);
    res.status(500).json({ message: "Server error while adding book" });
  }
};

export default  uploadBookController;