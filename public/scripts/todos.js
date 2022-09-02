const form = document.querySelector("form#todoAdd");
const todosDiv = document.querySelector(".todos");
const todoHeader = document.querySelector("#todoHeader");
const dltBtns = document.querySelectorAll(".delete");
const todos = document.querySelectorAll(".todo");

let count = todos.length;

for (let i = 0; i < count; i++) {
  todos[i].title = "Just do it lol!";
}
for (let i = 0; i < dltBtns.length; i++) {
  dltBtns[i].onclick = async (e) => deleteTodo(e, dltBtns[i]);
}

const deleteTodo = async (e, dltBtn) => {
  e.preventDefault();
  const id = dltBtn.dataset.id;
  try {
    const res = await fetch("/deletePost", {
      method: "POST",
      body: JSON.stringify({
        id,
      }),
      headers: {
        "Content-type": "application/json",
      },
    });
    const data = await res.json();
    if (data.message == "ok") {
      count--;
      if (count === 0) todoHeader.innerText = "No todos for you now!";
      dltBtn.parentNode.remove();
      console.log("Removed: ", id);
    }
  } catch (err) {
    console.log("Something went wrong!\nLook at backend code!");
  }
};

form.onsubmit = async (e) => {
  e.preventDefault();
  const body = {
    title: form.title.value,
    body: form.body.value,
  };
  try {
    const res = await fetch("/postTodo", {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-type": "application/json",
      },
    });
    const data = await res.json();
    if (data.message == "ok") {
      console.log("Added: ", data.id);
      count++;

      const todoDiv = document.createElement("div");
      todoDiv.classList.add("todo");
      todoDiv.title = "Just do it lol!";

      const image = document.createElement("img");
      image.src = "/todo.png";
      image.alt = "todo list";

      const h4 = document.createElement("h4");
      h4.innerText = body.title;

      const p = document.createElement("p");
      p.innerText = body.body;

      const btn = document.createElement("button");
      btn.innerText = "Remove";
      btn.classList.add("delete");
      btn.dataset.id = data.id;
      btn.onclick = async (e) => deleteTodo(e, btn);

      todoDiv.appendChild(image);
      todoDiv.appendChild(h4);
      todoDiv.appendChild(p);
      todoDiv.appendChild(btn);

      if (count != 0) todoHeader.innerText = "Your Todos:";

      todosDiv.appendChild(todoDiv);
    }
  } catch (err) {
    console.log(err);
  }
};
