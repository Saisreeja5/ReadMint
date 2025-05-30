import Book from "../models/Book.js";

const getAllBooksController = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 0; // Default to 0 (no limit)

    const books = await Book.find()
      .limit(limit)
      .populate("addedBy", "name");

    if (!books || books.length === 0) {
      return res.status(400).json({ message: "No books available" });
    }

    return res.status(200).json({
      message: "List of books",
      books,
    });

  } catch (error) {
    console.error("Books not found", error);
    res.status(500).json({ message: "Books fetching error" });
  }
};

export default getAllBooksController;
