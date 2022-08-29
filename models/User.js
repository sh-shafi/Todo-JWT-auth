import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    firstName: {
      type: String,
      required: [true, "Can't find Firstname!"],
    },
    lastName: {
      type: String,
      required: [true, "Can't find lastname!"],
    },
  },
  email: {
    type: String,
    required: [true, "Please enter an Email!"],
    unique: true,
    lowercase: true,
    validate: [
      (mail) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail),
      "Please enter a valid email!",
    ],
  },
  password: {
    type: String,
    required: [true, "Please enter a password!"],
    minlength: [6, "Password must be more than 6 characters!"],
  },
  todos: [{ title: String, body: String }],
});

const User = mongoose.model("user", userSchema);
export default User;
