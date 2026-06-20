const mongoose = require("mongoose");
const Task = require("../models/Task");

exports.getOverview = async (req, res) => {
  try {
    const query = {
      $or: [
        { owner: req.user.id },
        { "sharedWith.userId": req.user.id }
      ]
    };

    const [total, completed, pending, inProgress, overdue] = await Promise.all([
      Task.countDocuments(query),
      Task.countDocuments({ ...query, status: "Completed" }),
      Task.countDocuments({ ...query, status: "Pending" }),
      Task.countDocuments({ ...query, status: "In Progress" }),
      Task.countDocuments({
        ...query,
        status: { $ne: "Completed" },
        dueDate: { $lt: new Date() }
      })
    ]);

    res.json({
      total,
      completed,
      pending,
      inProgress,
      overdue
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getTrends = async (req, res) => {
  try {
    const userObjectId = new mongoose.Types.ObjectId(req.user.id);

    const trends = await Task.aggregate([
      {
        $match: {
          $or: [
            { owner: userObjectId },
            { "sharedWith.userId": userObjectId }
          ]
        }
      },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
            status: "$status"
          },
          count: { $sum: 1 }
        }
      },
      {
        $sort: {
          "_id.year": 1,
          "_id.month": 1
        }
      }
    ]);

    res.json(trends);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
