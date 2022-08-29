const router = require('express').Router();

const {
    getAllThoughts,
    getThoughtsById,
    createThoughts,
    updateThoughts,
    deleteThoughts,
    addReaction,
    removeReaction
} = require('../../controllers/thoughts-controller');

router
.route('/')
.get(getAllThoughts)
.post(createThoughts)

router
.route('/:id')
.get(getThoughtsById)
.put(updateThoughts)
.delete(deleteThoughts)

router
.route('/:thoughtId/reactions')
.post(addReaction)

router
.route('/:thoughtId/reaction/:reactionId')
.delete(removeReaction)

module.exports = router;