const get_home = (req, res) => {
  res.locals.message = req.cookies.message;
  if (req.cookies.message) res.clearCookie("message");
  res.render("home");
};

const get_todos = (req, res) => {
  res.locals.message = req.cookies.message;
  if (req.cookies.message) res.clearCookie("message");
  res.render("todos");
};

const get_signup = (req, res) => {
  res.render("signup");
};

const get_login = (req, res) => {
  res.locals.message = req.cookies.message;
  if (req.cookies.message) res.clearCookie("message");
  res.render("login");
};

const get_user = (req, res) => {
  try {
    res.render("user");
  } catch (error) {
    console.log(error);
  }
};

export { get_home, get_todos, get_signup, get_login, get_user };
