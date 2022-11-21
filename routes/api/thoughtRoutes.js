const router = require('express').Router();

const {
    getThoughts,
    thoughtbyID,
    createThought,
    updateThought,
    deleteThought,
    createReaction,
    deleteReaction
} = require('../..controllers/thoughtController');

// http://localhost:3001/api/thoughts
router.route('/')
    .get(getThoughts)
    .post(createThought);

//http://localhost:3001/api/thoughts/:id
router.route('/:id')
    .get(thoughtbyID)
    .put(updateThought)
    .delete(deleteThought);

router.route('/:thoughtID/reactions')
    .post(createReaction)

// http://localhost:3001/api/thoughts/:id/reactions:reactionID
router.route('/:thoughtID/reactions/:reactionID')
    .delete(deleteReaction);

module.exports = router