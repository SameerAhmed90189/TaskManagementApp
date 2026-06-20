const Task = require("../models/Task");
const User = require("../models/User");
const Notification = require("../models/Notification");

exports.shareTask = async (req, res) => {
  try {
    const { userId, permission = "view" } = req.body;
    const taskId = req.params.id;

    if (!userId) {
      return res.status(400).json({ message: "userId is required" });
    }

    if (!["view", "edit"].includes(permission)) {
      return res.status(400).json({ message: "Invalid permission level" });
    }

    if (userId === req.user.id) {
      return res.status(400).json({ message: "You cannot share a task with yourself" });
    }

    const task = await Task.findOne({
      _id: taskId,
      owner: req.user.id
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const alreadyShared = task.sharedWith.some(
      (share) => share.userId.toString() === userId
    );

    if (alreadyShared) {
      return res.status(400).json({ message: "Task already shared with user" });
    }

    task.sharedWith.push({
      userId,
      permission,
      sharedAt: new Date()
    });

    task.shares.totalShares += 1;
    task.shares.lastSharedAt = new Date();
    task.shares.sharedBy.push({
      userId: req.user.id,
      sharedAt: new Date()
    });

    await task.save();

    const notification = await Notification.create({
      recipientId: userId,
      senderId: req.user.id,
      taskId,
      type: "TASK_SHARED",
      message: `Task "${task.title}" has been shared with you`,
      actionUrl: `/tasks/${taskId}`
    });

    await User.findByIdAndUpdate(userId, {
      $push: {
        sharedTasksHistory: {
          taskId,
          sharedAt: new Date(),
          sharedBy: req.user.id
        }
      }
    });

    const io = req.app.get("io");
    if (io) {
      io.to(`user-${userId}`).emit("notification", notification);
    }

    res.status(200).json({
      message: "Task shared successfully",
      task,
      notification
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.unshareTask = async (req, res) => {
  try {
    const { userId } = req.params;
    const taskId = req.params.id;

    const task = await Task.findOne({
      _id: taskId,
      owner: req.user.id
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    task.sharedWith = task.sharedWith.filter(
      (share) => share.userId.toString() !== userId
    );

    task.shares.totalShares = Math.max(0, task.shares.totalShares - 1);
    await task.save();

    res.status(200).json({
      message: "Task unshared successfully",
      task
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getSharedTasks = async (req, res) => {
  try {
    const { page = 1, limit = 10, status } = req.query;
    const skip = (Number(page) - 1) * Number(limit);

    const query = {
      sharedWith: {
        $elemMatch: { userId: req.user.id }
      }
    };

    if (status) {
      query.status = status;
    }

    const tasks = await Task.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit))
      .populate("owner", "email")
      .populate("sharedWith.userId", "email");

    const total = await Task.countDocuments(query);

    res.status(200).json({
      tasks,
      pagination: {
        total,
        pages: Math.ceil(total / Number(limit)),
        currentPage: Number(page)
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getTaskCollaborators = async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      owner: req.user.id
    }).populate("sharedWith.userId", "email");

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    const collaborators = task.sharedWith.map((share) => ({
      user: share.userId,
      permission: share.permission,
      sharedAt: share.sharedAt
    }));

    res.status(200).json({
      taskId: req.params.id,
      collaborators,
      totalCollaborators: collaborators.length
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updatePermission = async (req, res) => {
  try {
    const { userId } = req.params;
    const { permission } = req.body;

    if (!["view", "edit"].includes(permission)) {
      return res.status(400).json({ message: "Invalid permission level" });
    }

    const task = await Task.findOne({
      _id: req.params.id,
      owner: req.user.id
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    const share = task.sharedWith.find((item) => item.userId.toString() === userId);

    if (!share) {
      return res.status(404).json({ message: "Task not shared with user" });
    }

    share.permission = permission;
    await task.save();

    res.status(200).json({
      message: "Permission updated successfully",
      task
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
