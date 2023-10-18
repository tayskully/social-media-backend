const { Thought, User } = require("../models");

module.exports = {
  // function to get all users
  async getUsers(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // function to get a single user
  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId }).select(
        "-__v"
      );

      if (!user) {
        return res.status(404).json({ message: "No user with that ID" });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // function to create a new user
  async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  //function to update a user
  async updateUser(res, req) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true }
      );
      if (!user) {
        return res.status(404).json({ message: "No user found with that ID" });
      }
      res.json(user);
    } catch {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // function to delete a user and eliminate all their thoughts (dark)
  async deleteUser(req, res) {
    try {
      const user = await User.findOneAndDelete({ _id: req.params.userId });

      if (!user) {
        return res.status(404).json({ message: "No user with that ID" });
      }

      await Application.deleteMany({ _id: { $in: user.thoughts } });
      res.json({ message: "User and associated thoughts deleted!" });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  //Friends---------------------------------------------
  //diff bc just a schema, only exists to be with users, so everything revolves around the user model

  //function to add a reaction
  async addFriend(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { reactions: req.body } },
        { runValidators: true, new: true }
      );

      if (!user) {
        return res.status(404).json({ message: "No user with this id!!" });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //function to remove a reaction
  async removeFriend(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: { userId: req.params.userId } } },
        { runValidators: true, new: true }
      );

      if (!user) {
        return res.status(404).json({ message: "No user with this id!!" });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
