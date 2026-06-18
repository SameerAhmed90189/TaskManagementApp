const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
  {
    recipientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    taskId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task"
    },
    type: {
      type: String,
      enum: ["TASK_SHARED", "STATUS_UPDATED", "TASK_ASSIGNED"],
      required: true
    },
    message: {
      type: String,
      required: true
    },
    isRead: {
      type: Boolean,
      default: false
    },
    actionUrl: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Notification", notificationSchema);
