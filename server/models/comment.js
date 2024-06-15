const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    userId: Number,
    postId: Number,
    commentContent: String,
    commentLikes: [String],
    edited: Boolean
});

const Comment = mongoose.model("Comment", commentSchema);

async function addComment(userId, postId, commentContent) {
    const comment = await Comment.create({
        userId: userId,
        postId: comment
        commentContent: commentContent,
        commentLikes: [],
        edited: false
    });

    return comment;
}

async function editComment(id, editedContent) {
    const comment = await Comment.updateOne({ "_id": id }, { $set: { commentContent: editedContent, edited: true } });
    return comment;
}

async function likeComment(commentId, userId) {
    const comment = await Comment.findOne({ "_id": commentId });
    comment.commentLikes.push(userId);
    return comment;
}

async function deleteComment(id) {
    await Comment.deleteOne({ "_id": id });
}

module.exports = { addComment, editComment, likeComment, deleteComment };