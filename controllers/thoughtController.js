const { Thought, User } = require("../models");

module.exports = {
  //function to get all the thoughts
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //function to get a single thought using ID
  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.thoughtId });
      if (!thought) {
        return res.status(404).json({ message: "no thought found here 💭" });
      }
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  //function to create a thought
  async createThought(req, res) {
    try {
      const thought = await Thought.create(req.body);
      const user = await User.findOneAndUpdate(
        { _id: req.body.userId }, //userid or username??
        { $addToSet: { thoughts: thought._id } },
        { new: true }
      );
      if (!user) {
        return res.status(404).json({
          message:
            "new thought created, but unable to find user with matching id",
        });
      }
      res.json("Created new thought! 💭");
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  //function to update a thought
  async updateThought(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
      );
      if (!thought) {
        return res.status(404).json({ message: "No thought found here 💭" });
      }
      res.json(thought);
    } catch {
      console.log(err);
      res.status(500).json(err);
    }
  },

  //function to delete a thought
  async deleteThought(req, res) {
    try {
      const thought = await Thought.findOneAndRemove({
        _id: req.params.thoughtId,
      });

      if (!thought) {
        return res.status(404).json({ message: "No thought found here 💭" });
      }

      const user = await User.findOneAndUpdate(
        { thoughts: req.params.thoughtId },
        { $pull: { thoughts: req.params.thoughtId } },
        { new: true }
      );

      if (!user) {
        return res.status(404).json({
          message:
            "thought was deleted, but unable to find user with matching id",
        });
      }

      res.json({ message: "Thought deleted away 💭" });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //REACTIONS---------------------------------------------
  //diff bc just a schema, only exists to be with thoughts, so everything revolves around the thought model

  //function to add a reaction
  async addReaction(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body } },
        { runValidators: true, new: true }
      );

      if (!thought) {
        return res.status(404).json({ message: "No thought with this id!!" });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //function to remove a reaction
  async removeReaction(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { runValidators: true, new: true }
      );

      if (!thought) {
        return res.status(404).json({ message: "No thought with this id!!" });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
