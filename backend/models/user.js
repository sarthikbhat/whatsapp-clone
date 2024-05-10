const { Schema, model } = require("mongoose");

const messageSchema = Schema(
  {
    from: String,
    to: String,
    message: String,
  },
  { timestamps: true }
);

const User = Schema({
  email: {
    type: String,
    required: "Email is required",
    validate: {
      validator: (props) =>
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
          props
        ),
      message: "Please provide a valid email",
    },
  },
  userName: {
    type: String,
    required: "Username is required",
    validate: {
      validator: (props) => props.length > 3,
      message: "Length of the username should be > 3",
    },
  },
  password: {
    type: String,
    required: "Password is required",
    validate: {
      validator: (props) => props.length > 6,
      message: "Length of the password should be > 6",
    },
  },
  friends: {
    type: [{ type: Schema.ObjectId, ref: "users" }],
  },
  messages: {
    type: [messageSchema],
  },
});


module.exports = model("users", User);
