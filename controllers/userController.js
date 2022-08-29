import User from "../models/User.js";
import jwt from "jsonwebtoken";
import {} from "dotenv/config.js";
import bcrypt from "bcrypt";

// **************************************************** Handling signup errors **************************************************** //
const handleErrors = (err) => {
  let errors = {};
  // Handling login error
  if (err.message === "email") {
    errors.email = "The email is not registered!";
  }
  if (err.message === "password") {
    errors.password = "Incorrect password!";
  }
  // Handling duplicate error
  if (err.code === 11000) {
    errors.email = "Email is already registered!";
    return errors;
  }
  // Handling validation error
  if (err.message.includes("user validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }
  return errors;
};

// **************************************************** Creating Json Web Token **************************************************** //
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, process.env.KEY, {
    expiresIn: maxAge,
  });
};

// ******************************************************** Login function ******************************************************** //
const login = async (email, password) => {
  const user = await User.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error("password");
  }
  throw Error("email");
};

// **************************************************** handling post requests **************************************************** //
const post_signup = async (req, res) => {
  try {
    // Hashing passwords
    const salt = await bcrypt.genSalt();
    const password = await bcrypt.hash(req.body.password, salt);
    console.log("Created new password!");

    // Creating User in Mongoose
    const user = await User.create({
      name: {
        firstName: req.body.name.firstName,
        lastName: req.body.name.lastName,
      },
      email: req.body.email,
      password: password,
    });

    // Creating JWT and assigning the JWT as cookie
    const token = createToken(user._id);
    res.cookie("jwtkn", token, { httpOnly: true, maxAge: maxAge * 1000 });

    // Sending confirmation of user creation
    res.cookie("message", "new");
    res.status(201).json({ message: "New user created!", user: user._id });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};

const post_login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await login(email, password);

    // Creating JWT and assigning the JWT as cookie
    const token = createToken(user._id);
    res.cookie("jwtkn", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.cookie("message", "ok");
    res.status(201).json({ user: user._id });
  } catch (err) {
    const errors = handleErrors(err);
    console.log(err);
    res.status(400).json({ errors });
  }
};

// **************************************************** handling delete requests **************************************************** //
const delete_user = async (req, res) => {
  const id = res.user._id;
  try {
    await User.findByIdAndDelete(id);
    res.clearCookie("jwtkn");
    res.cookie("message", "delete");
    res.json({ message: "ok" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Something went wrong!");
  }
};

// **************************************************** handling get requests **************************************************** //
const get_logout = (req, res) => {
  res.clearCookie("jwtkn");
  res.cookie("message", "nolog");
  res.redirect("/");
};

// **************************************************** Exporting required function **************************************************** //
export { delete_user, post_login, get_logout, post_signup };
