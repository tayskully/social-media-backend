const router = require('express').Router();

//will also contain routes for adding and deleting reactions !!!!!!!

const {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  addReaction,
  removeReaction
} = require('../../controllers/thoughtController');

// /api/thoughts
router.route('/').get(getThoughts).post(createThought);

// /api/thoughts/:thoughtId
router.route('/:thoughtId').get(getSingleThought).put(updateThought);

// /api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions').post(addReaction);

// /api/thoughts/:thoughtId/reactions/:reactionId
router.route('/:thoughtId/reactions').delete(removeReaction);

module.exports = router;