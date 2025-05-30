import mongoose from 'mongoose';

const { Schema } = mongoose;

const reviewSchema = new Schema(
    {
        book:{
            type: mongoose.Schema.Types.ObjectId,
            ref:'Book',
            required:true,
        },
        user:{
            type: mongoose.Schema.Types.ObjectId,
            ref:'User',
            required:true,
        },
        comment:{
            type: String,
            required:true,
        },
    },
    {timestamps: true}
);

const Review = mongoose.models.Review || mongoose.model('Review', reviewSchema);

export default Review;