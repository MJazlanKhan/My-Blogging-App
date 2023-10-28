import mongoose from 'mongoose';

const blogPostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    summary: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    imageURL:{
        type: String,
        required: true,
    },
});

const BlogPost = mongoose.model('BlogPost', blogPostSchema);

export default BlogPost

