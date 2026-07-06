const express = require("express");

const router = express.Router();
const todos = [];
let nextId = 1;

router.get("/", (_req, res) => {
  res.json(todos);
});

router.post("/", (req, res) => {
  const title = String(req.body?.title ?? "").trim();
  if (!title) {
    return res.status(400).json({ error: "title is required" });
  }
  const todo = { id: nextId++, title, completed: false };
  todos.push(todo);
  return res.status(201).json(todo);
});

router.patch("/:id", (req, res) => {
  const id = Number(req.params.id);
  const todo = todos.find((entry) => entry.id === id);
  if (!todo) {
    return res.status(404).json({ error: "not found" });
  }
  if (typeof req.body?.completed === "boolean") {
    todo.completed = req.body.completed;
  }
  if (typeof req.body?.title === "string" && req.body.title.trim()) {
    todo.title = req.body.title.trim();
  }
  return res.json(todo);
});

router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = todos.findIndex((entry) => entry.id === id);
  if (index < 0) {
    return res.status(404).json({ error: "not found" });
  }
  todos.splice(index, 1);
  return res.status(204).send();
});

module.exports = router;
