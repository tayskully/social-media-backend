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
  async getSingleThought(res, req) {
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
  async createThought(res, req) {
    try {
      const thought = await Thought.create(req.body);
      const user = await User.findOneAndUpdate(
        { _id: req.body.userId },
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
  async updateThought(res, req) {
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

  //function to add a reaction

  //function to remove a reaction
};
