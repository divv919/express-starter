import express from "express";
import cors from "cors";

const PORT = process.env.PORT || 3000;

let todos: { name: string; status: "done" | "pending" | "ongoing" }[] = [];
const app = express();

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
  res
    .status(200)
    .json({ message: "This is a get route of the staging branch" });
});

app.get("/get-all-todo", (_, res) => {
  res.status(200).json({
    message: "All todos fetched",
    allTodos: todos,
  });
});

app.post("/add-todo", (req, res) => {
  const { name } = req.body;

  todos = [
    ...todos,
    {
      name: name,
      status: "pending",
    },
  ];
  res.status(200).json({ message: "Added todo", name });
});

app.put("/update-todo", (req, res) => {
  const { name, status } = req.body;
  todos = todos.map((todo) => {
    if (todo.name === name) {
      return { name, status };
    }
    return todo;
  });

  res.status(200).json({
    message: "Updated todo",
    todo: {
      name,
      status,
    },
  });
});

app.delete("/delete-todo", (req, res) => {
  const { name } = req.body;
  todos = todos.filter((todo) => todo.name !== name);

  res.status(200).json({
    message: "Deleted todo",
    name,
  });
});

app.get("/throw-error", (req, res) => {
  setTimeout(() => {
    throw new Error();
  }, 0);
});

app.listen(PORT, () => {
  console.log("Server running at port " + PORT);
});
