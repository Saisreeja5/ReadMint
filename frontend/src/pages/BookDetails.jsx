import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const BookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [reviewText, setReviewText] = useState("");
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchBook = async () => {
      const res = await axios.get(`https://readmint-1.onrender.com/api/reviews/${id}`);
      setBook(res.data.book);
      setReviews(res.data.reviews || []);
    };

    fetchBook();
  }, [id]);


  const handleDeleteReview = async (reviewId) => {
  const token = localStorage.getItem("jwtToken");

  try {
    await axios.post(`https://readmint-1.onrender.com/api/reviews/delete/${reviewId}`, {},{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Refetch reviews after deletion
    const updated = await axios.get(`https://readmint-1.onrender.com/api/reviews/${id}`);
    setReviews(updated.data.reviews || []);
  } catch (error) {
    console.error("Error deleting review:", error);
    alert("Failed to delete review");
  }
};


  const handleReviewSubmit = async () => {
    if (!reviewText.trim()) return;

    const token = localStorage.getItem("jwtToken");
    await axios.post(
      `https://readmint-1.onrender.com/api/reviews/${id}`,
      { comment: reviewText },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    setReviewText("");
    const updated = await axios.get(`https://readmint-1.onrender.com/api/reviews/${id}`);
    setReviews(updated.data.reviews || []);
    console.log(reviews);
  };

  if (!book) return <div className="text-center mt-20">Loading...</div>;

  return (
    <div className="max-w-5xl mx-auto py-10 px-4">
      {/* Top section */}
      <div className="flex flex-col md:flex-row gap-10">
        <img
          src={book.coverImage}
          alt={book.name}
          className="max-w-sm  h-auto object-contain rounded shadow"
        />

        <div className="flex flex-col justify-center">
          <h1 className="text-6xl font-bold">{book.title}</h1>
          <p className="text-gray-900 text-2xl mt-1 italic">by {book.author}</p>
          <p className="text-sm text-gray-500 mt-2">
            Created by: {book.addedBy?.name || "Unknown"}
          </p>
          <p className="mt-4 text-gray-700">- {book.description}</p>

          <a
            href={book.pdfUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-block bg-black text-white px-5 py-2 rounded-full"
          >
            Download PDF
          </a>
        </div>
      </div>

      {/* Write Review Section */}
      <div className="mt-16">
        <h2 className="text-2xl font-semibold mb-4">Write a Review</h2>
        <textarea
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          className="w-full border border-gray-300 rounded-lg p-3"
          rows={4}
          placeholder="Your review..."
        />
        <button
          onClick={handleReviewSubmit}
          className="mt-3 bg-black text-white px-4 py-2 rounded-full"
        >
          Submit Review
        </button>
      </div>

      {/* Reviews Grid */}
      <div className="mt-16">
        <h2 className="text-2xl font-semibold mb-6">Reviews</h2>
        {reviews.length === 0 ? (
          <p className="text-gray-500">No reviews yet.</p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {reviews.map((rev, index) => (
              <div
                key={index}
                className="bg-gray-100 p-4 rounded-lg shadow-sm flex gap-3"
              >
                <img
                  src={rev.user?.avatar}
                  alt="avatar"
                  className="w-12 h-12 rounded-full object-cover border border-gray-300"
                   referrerPolicy="no-referrer"
                />
                
                <div>
                  <div className="text-sm font-semibold">{rev.user?.name}</div>
                  <div className="text-xs text-gray-500">
                    {new Date(rev.createdAt).toLocaleDateString()}
                  </div>
                  <p className="mt-1 text-gray-800 text-sm">{rev.comment}</p>
                </div>
               <button
  onClick={() => handleDeleteReview(rev._id)}
  className="ml-auto bg-black text-white w-6 h-6 flex items-center pb-1 justify-center rounded-full hover:bg-red-700"
  title="Delete review"
>
  x
</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BookDetails;
