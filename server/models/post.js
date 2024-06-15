const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    userId: Number,
    postContent: String,
    postLikes: [String],
    edited: Boolean
});

const Post = mongoose.model("Post", postSchema);

async function createPost(userId, postContent) {
    const post = await Post.create({
        userId: userId,
        postContent: postContent,
        postLikes: [],
        edited: false
    });

    return post;
}

async function editPost(id, editedContent) {
    const post = await Post.updateOne({ "_id": id }, { $set: { postContent: editedContent }, edited: true });
    return post;
}

async function likePost(postId, userId) {
    const post = await Post.findOne({ "_id": postId });
    post.postLikes.push(userId);
    return post;
}

async function deletePost(id) {
    await Post.deleteOne({ "_id": id });
}

module.exports = { createPost, editPost, likePost, deletePost };