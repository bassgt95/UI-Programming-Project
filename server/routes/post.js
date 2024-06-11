const express = require('express');
const Post = require('../models/post');
const router = express.Router();

router
    .post('/create', async (req, res) => {
        try {
            const post = await Post.createPost(req.body.userId, req.body.postContent);
            res.send(post);
        } catch (error) {
            res.status(401).send({ message: error.message });
        }
    });

    .put('/update', async (req, res) => {
    try {
        const post = await Post.editPost(req.body.id, req.body.editedContent);
        res.send(post)
    } catch (error) {
        res.status(401).send({ message: error.message })
    }
})

    .put('/like', async (req, res) => {
        try {
            const post = await Post.likePost(req.body.id, req.body.username);
            res.send(post);
        } catch (error) {
            res.status(401).send({ message: error.message })
        }
    })

    .delete('/delete', async (req, res) => {
        try {
            await Post.deleteUser(req.body.id);
            res.send({ success: "Post deleted" })
        } catch (error) {
            res.status(401).send({ message: error.message })
        }
    })

module.exports = router;