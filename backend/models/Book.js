import mongoose from 'mongoose';

const { Schema } = mongoose;

const bookSchema = new Schema(
{
    title: {
        type:String,
        required:true,
    },
    author: {
        type:String,
        required:true,
    },
    description: {
        type:String,
        required:true,
    },
    fileUrl: {
        type:String,
        required:true,
    },
    coverImage: {
        type:String,
        required:true,
    },
    addedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
},
{ timestamps:true }
);

const Book = mongoose.models.Book || mongoose.model('Book',bookSchema);

export default Book;