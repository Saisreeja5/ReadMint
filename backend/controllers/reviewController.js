import Review from "../models/Review.js";
import Book from "../models/Book.js";

const addReviewController = async (req, res) => {
    try {
        const bookId = req.params.id;
        const comment = req.body.comment;

        if(!bookId || !comment){
            return res.status(400).json({message:"Please fill all the details"});
        }

        const reviewData = await Review.create({
            book: bookId,
            user: req.user._id,
            comment

        });

        return res.status(200).json({
            message:"Review added successfully",
            reviewData
        });
        
    } catch (error) {
        console.error("Unable to add review",error);
        res.status(500).json({message:"Unable to add review"});
    }
}



const getReviewsController = async (req, res) => {
     try {
    const bookId = req.params.id;

    const book = await Book.findById(bookId).populate('addedBy', 'name');
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    const reviews = await Review.find({ book: bookId }).populate('user', 'name avatar');

    return res.status(200).json({
      book,
      reviews
    });
  } catch (error) {
    console.error("Error fetching book with reviews:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const deleteReviewController = async (req, res) => {
  try {
    const reviewId = req.params.id;

    // Find the review
    const review = await Review.findById(reviewId);

    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    // Check if the user is the owner of the review
    if (review.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "You can only delete your own review" });
    }

    // Delete the review
    await Review.findByIdAndDelete(reviewId);

    // Optionally return updated list of reviews
    const updatedReviews = await Review.find({ book: review.book }).populate('user', 'name avatar');

    res.status(200).json({
      message: "Review deleted successfully",
      reviews: updatedReviews
    });

  } catch (error) {
    console.error("Error deleting review:", error);
    res.status(500).json({ message: "Server error while deleting review" });
  }
};

export default {getReviewsController, addReviewController, deleteReviewController} 