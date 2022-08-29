const post_todo = async (req, res) => {
  const todo = { title: req.body.title, body: req.body.body };
  try {
    const user = res.user;
    user.todos.push(todo);
    await user.save();
    res.status(201).json({ message: "ok" });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "notok" });
  }
};

const delete_todo = async (req, res) => {
  const id = req.body.id;
  try {
    const user = res.user;
    for (let i = 0; i < user.todos.length; i++)
      if (user.todos[i].id === id) user.todos.splice(i, 1);

    await user.save();
    res.status(201).json({ message: "ok" });
  } catch (error) {
    console.log(error);
  }
};

export { delete_todo, post_todo };
