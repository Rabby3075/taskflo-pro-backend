import Task from "../models/Tasks.js";

// Get all tasks for logged-in user
export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user_id: req.user._id }).sort({
      createdAt: -1,
    });

    const formattedTasks = tasks.map((task) => ({
      id: task._id.toString(),
      title: task.title,
      description: task.description || "",
      status: task.status,
      dueDate: task.dueDate ? task.dueDate.toISOString().slice(0, 10) : null,
      createdAt: task.createdAt.toISOString(),
    }));

    res.status(200).json(formattedTasks);
  } catch (error) {
    console.error("Get Tasks Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Create a new task
export const createTask = async (req, res) => {
  try {
    const { title, description, status, dueDate } = req.body;


    const task = await Task.create({
      user_id: req.user._id,
      title,
      description: description || "",
      status: status || "pending",
      dueDate,
      createdAt: new Date(),
    });

    const formattedTask = {
      id: task._id.toString(),
      title: task.title,
      description: task.description,
      status: task.status,
      dueDate: task.dueDate ? task.dueDate.toISOString().slice(0, 10) : null ,
      createdAt: task.createdAt.toISOString(),
    };

    res.status(201).json(formattedTask);
  } catch (error) {
    console.error("Create Task Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Update a task
export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, status, dueDate } = req.body;

    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    if (task.user_id.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "Not authorized to update this task" });
    }

    if (title !== undefined) task.title = title;
    if (description !== undefined) task.description = description || "";
    if (status !== undefined) task.status = status;
    if (dueDate !== undefined) task.dueDate = dueDate;
    task.updatedAt = new Date();

    await task.save();

    const formattedTask = {
      id: task._id.toString(),
      title: task.title,
      description: task.description,
      status: task.status,
      dueDate: task.dueDate ? task.dueDate.toISOString().slice(0, 10) : null,
      createdAt: task.createdAt.toISOString(),
    };

    res.status(200).json(formattedTask);
  } catch (error) {
    console.error("Update Task Error:", error);
    if (error.name === "CastError") {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(500).json({ message: "Server Error" });
  }
};

// Delete a task
export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    if (task.user_id.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "Not authorized to delete this task" });
    }

    await Task.findByIdAndDelete(id);

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("Delete Task Error:", error);
    if (error.name === "CastError") {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(500).json({ message: "Server Error" });
  }
};
