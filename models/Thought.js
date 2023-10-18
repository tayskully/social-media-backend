const { Schema, model } = require("mongoose");
const Reaction = require("./Reaction");

// Schema to create Post model
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      //use a getter method to format timestamp on query
      // formattedCreatedAt() ??
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [Reaction],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// Create a virtual property `getTags` that gets the amount of tags associated with an application
thoughtSchema
  .virtual("reactionCount")
  // getter
  .get(function () {
    return this.reactions.length;
  });

thoughtSchema
  .virtual("formattedCreatedAt")
  //getter
  .get(function () {
    return new Date(this.createdAt).toLocaleString();
  });

// Initialize our Application model
const Thought = model("thought", thoughtSchema);

module.exports = Thought;
