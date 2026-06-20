const Task = require("../models/Task");
const Notification = require("../models/Notification");

const canAccessTask = (task, userId) => {
  const ownerId = task.owner && task.owner._id ? task.owner._id : task.owner;
  return (
    ownerId.toString() === userId ||
    task.sharedWith.some((share) => {
      const shareUserId = share.userId && share.userId._id ? share.userId._id : share.userId;
      return shareUserId.toString() === userId;
    })
  );
};

exports.createTask = async (req, res) => {
  try {
    const task = await Task.create({
      ...req.body,
      owner: req.user.id
    });

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({
      $or: [
        { owner: req.user.id },
        { "sharedWith.userId": req.user.id }
      ]
    })
      .sort({ createdAt: -1 })
      .populate("owner", "email");

    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getSharedTasks = async (req, res) => {
  try {
    const tasks = await Task.find({
      "sharedWith.userId": req.user.id
    })
      .sort({ createdAt: -1 })
      .populate("owner", "email")
      .populate("sharedWith.userId", "email");

    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id)
      .populate("owner", "email")
      .populate("sharedWith.userId", "email");

    if (!task) {
      return res.status(404).json({ message: "Task not Found" });
    }

    if (!canAccessTask(task, req.user.id)) {
      return res.status(403).json({ message: "Access denied" });
    }

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not Found" });
    }

    const isOwner = task.owner.toString() === req.user.id;
    const hasEditPermission = task.sharedWith.some(
      (share) => share.userId.toString() === req.user.id && share.permission === "edit"
    );

    if (!isOwner && !hasEditPermission) {
      return res.status(403).json({ message: "Edit permission denied" });
    }

    const oldStatus = task.status;
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    }).populate("owner", "email");

    const io = req.app.get("io");
    if (req.body.status && req.body.status !== oldStatus) {
      const recipients = task.sharedWith.map((share) => share.userId.toString());

      await Notification.insertMany(
        recipients.map((recipientId) => ({
          recipientId,
          senderId: req.user.id,
          taskId: task._id,
          type: "STATUS_UPDATED",
          message: `Task "${task.title}" status changed to ${req.body.status}`,
          actionUrl: `/tasks/${task._id}`
        }))
      );

      if (io) {
        recipients.forEach((recipientId) => {
          io.to(`user-${recipientId}`).emit("notification", {
            type: "STATUS_UPDATED",
            taskId: task._id,
            message: `Task "${task.title}" status changed to ${req.body.status}`,
            oldStatus,
            newStatus: req.body.status
          });
        });
      }
    }

    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not Found" });
    }

    if (task.owner.toString() !== req.user.id) {
      return res.status(403).json({ message: "Only owner can delete task" });
    }

    await Task.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Task deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
