import jwt from "jsonwebtoken";
import User from "../models/User.js";
import {} from "dotenv/config.js";

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwtkn;
  if (token) {
    jwt.verify(token, process.env.KEY, (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.redirect("login");
      } else {
        next();
      }
    });
  } else {
    res.cookie("message", "You must log in!");
    res.redirect("/login");
  }
};

const getUser = (req, res, next) => {
  const token = req.cookies.jwtkn;
  if (token) {
    jwt.verify(token, process.env.KEY, async (err, decodedToken) => {
      if (err) {
        res.user = null;
        next();
      } else {
        const user = await User.findById(decodedToken.id);
        res.user = user;
        next();
      }
    });
  } else {
    res.user = null;
    next();
  }
};

const checkUser = (req, res, next) => {
  const token = req.cookies.jwtkn;
  if (token) {
    jwt.verify(token, process.env.KEY, async (err, decodedToken) => {
      if (err) {
        res.locals.user = null;
        next();
      } else {
        const user = await User.findById(decodedToken.id);
        res.locals.user = user;
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};

export { requireAuth, getUser, checkUser };
