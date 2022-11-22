const router = require('express').Router();

const {
    getThoughts,
    thoughtById,
    createThought,
    updateThought,
    deleteThought,
    createReaction,
    deleteReaction
} = require('../../controllers/thoughtController');

// http://localhost:3001/api/thoughts
router.route('/')
    .get(getThoughts)
    .post(createThought);

//http://localhost:3001/api/thoughts/:id
router.route('/:id')
    .get(thoughtById)
    .put(updateThought)
    .delete(deleteThought);

router.route('/:id/reactions')
    .put(createReaction)
    .delete(deleteReaction);

module.exports = router;