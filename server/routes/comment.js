const express = require('express');
const Comment = require('../models/comment');
const router = express.Router();

router
    .post('/create', async (req, res) => {
        try {
            const comment = await Comment.createComment(req.body.userId, req.body.postId, req.body.commentContent);
            res.send(comment);
        } catch (error) {
            res.status(401).send({ message: error.message });
        }
    })

    .put('/update', async (req, res) => {
        try {
            const comment = await Comment.editComment(req.body.id, req.body.editedContent);
            res.send(comment)
        } catch (error) {
            res.status(401).send({ message: error.message })
        }
    })

    .put('/like', async (req, res) => {
        try {
            const comment = await Comment.likeComment(req.body.id, req.body.userId);
            res.send(comment);
        } catch (error) {
            res.status(401).send({ message: error.message })
        }
    })

    .delete('/delete', async (req, res) => {
        try {
            await Comment.deleteComment(req.body.id);
            res.send({ success: "Comment deleted" })
        } catch (error) {
            res.status(401).send({ message: error.message })
        }
    });

module.exports = router;