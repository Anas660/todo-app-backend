import express, { json } from "express";
import cors from "cors";
import { config } from "dotenv";
import { PrismaClient } from "@prisma/client";

config();

const prisma = new PrismaClient();
const app = express();
const PORT = process.env.PORT || 5050;

// Middleware
app.use(cors());
app.use(json());

// Routes
app.post("/api/tasks", async (req, res) => {
  try {
    const { title, color } = req.body;
    const newTask = await prisma.task.create({
      data: {
        title,
        color,
      },
    });
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ error: "Error creating task" });
  }
});

app.get("/api/tasks", async (req, res) => {
  try {
    const tasks = await prisma.task.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    res.status(200).json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching tasks" });
  }
});

app.get("/api/tasks/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const task = await prisma.task.findUnique({
      where: { id: Number(id) },
    });
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ error: "Error fetching task by ID" });
  }
});

app.put("/api/tasks/:id", async (req, res) => {
  const { id } = req.params;
  const { title, color, completed } = req.body;
  try {
    const updatedTask = await prisma.task.update({
      where: { id: Number(id) },
      data: { title, color, completed },
    });
    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ error: "Error updating task", error });
  }
});

app.delete("/api/tasks/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedTask = await prisma.task.delete({
      where: { id: Number(id) },
    });
    res.status(200).json({ message: "Task deleted", deletedTask });
  } catch (error) {
    res.status(500).json({ error: "Error deleting task" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
