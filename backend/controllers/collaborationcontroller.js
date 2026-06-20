const Task = require("../models/Task");
const User = require("../models/User");
const Notification = require("../models/Notification");

// Share task with another user
exports.shareTask = async (req, res) => {
  try {
    const { userId, permission = "view" } = req.body;
    const taskId = req.params.id;

    // Validate input
    if (!userId) {
      return res.status(400).json({ message: "userId is required" });
    }

    if (![["view", "edit"]].includes(permission)) {
      return res.status(400).json({ message: "Invalid permission level" });
    }

    // Check if task exists and belongs to current user
    const task = await Task.findOne({
      _id: taskId,
      owner: req.user.id
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // Check if user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if already shared
    const alreadyShared = task.sharedWith.some(
      (share) => share.userId.toString() === userId
    );

    if (alreadyShared) {
      return res.status(400).json({ message: "Task already shared with user" });
    }

    // Add to sharedWith array
    task.sharedWith.push({
      userId,
      permission,
      sharedAt: new Date()
    });

    // Update shares tracking
    task.shares.totalShares += 1;
    task.shares.lastSharedAt = new Date();
    task.shares.sharedBy.push({
      userId: req.user.id,
      sharedAt: new Date()
    });

    await task.save();

    // Create notification for recipient
    const notification = await Notification.create({
      recipientId: userId,
      senderId: req.user.id,
      taskId: taskId,
      type: "TASK_SHARED",
      message: `Task "${task.title}" has been shared with you`,
      actionUrl: `/tasks/${taskId}`
    });

    // Update user's shared tasks history
    await User.findByIdAndUpdate(userId, {
      $push: {
        sharedTasksHistory: {
          taskId,
          sharedAt: new Date(),
          sharedBy: req.user.id
        }
      }
    });

    res.status(200).json({
      message: "Task shared successfully",
      task,
      notification
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Unshare task
exports.unshareTask = async (req, res) => {
  try {
    const { userId } = req.params;
    const taskId = req.params.id;

    // Check if task exists and belongs to current user
    const task = await Task.findOne({
      _id: taskId,
      owner: req.user.id
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // Remove from sharedWith array
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

// Get tasks shared with current user
exports.getSharedTasks = async (req, res) => {
  try {
    const { page = 1, limit = 10, status } = req.query;
    const skip = (page - 1) * limit;

    let query = {
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
      .limit(parseInt(limit))
      .populate("owner", "email firstName lastName")
      .populate("sharedWith.userId", "email firstName lastName");

    const total = await Task.countDocuments(query);

    res.status(200).json({
      tasks,
      pagination: {
        total,
        pages: Math.ceil(total / limit),
        currentPage: parseInt(page)
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get task collaborators
exports.getTaskCollaborators = async (req, res) => {
  try {
    const taskId = req.params.id;

    const task = await Task.findOne({
      _id: taskId,
      owner: req.user.id
    }).populate("sharedWith.userId", "email firstName lastName avatar");

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    const collaborators = task.sharedWith.map((share) => ({
      user: share.userId,
      permission: share.permission,
      sharedAt: share.sharedAt
    }));

    res.status(200).json({
      taskId,
      collaborators,
      totalCollaborators: collaborators.length
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update collaboration permission
exports.updatePermission = async (req, res) => {
  try {
    const { userId } = req.params;
    const { permission } = req.body;
    const taskId = req.params.id;

    if (![["view", "edit"]].includes(permission)) {
      return res.status(400).json({ message: "Invalid permission level" });
    }

    const task = await Task.findOne({
      _id: taskId,
      owner: req.user.id
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    const share = task.sharedWith.find(
      (s) => s.userId.toString() === userId
    );

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
