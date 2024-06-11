const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    userId: Number,
    postContent: String,
    postLikes: [String]
});

const Post = mongoose.model("Post", postSchema);

async function createPost(userId, postContent) {
    const post = await Post.create({
        userId: userId,
        postContent: postContent,
        postLikes: []
    });

    return post;
}

async function editPost(id, editedContent) {
    const post = await Post.updateOne({ "_id": id }, { $set: { postContent: editedContent } });
    return post;
}

async function likePost(id, username) {
    const post = await Post.findOne({ "_id": id });
    post.postLikes.push(username);
    return post;
}

async function deletePost(id) {
    await Post.deleteOne({ "_id": id });
}

module.exports = { createPost, editPost, deletePost };