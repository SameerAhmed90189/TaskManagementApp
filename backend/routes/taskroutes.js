const express = require("express");
const router = express.Router();
const { validationResult } = require("express-validator");

const authmiddleware = require("../middleware/authmiddleware");
const { createTaskValidator } = require("../validators/taskvalidator");
const collaborationRoutes = require("./collaborationroutes");

const {
  createTask,
  getTasks,
  getSharedTasks,
  getTaskById,
  updateTask,
  deleteTask
} = require("../controllers/taskcontroller");

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array()
    });
  }
  next();
};

router.get("/shared", authmiddleware, getSharedTasks);
router.use("/", collaborationRoutes);

router.post("/", authmiddleware, createTaskValidator, validate, createTask);
router.get("/", authmiddleware, getTasks);
router.get("/:id", authmiddleware, getTaskById);
router.put("/:id", authmiddleware, updateTask);
router.delete("/:id", authmiddleware, deleteTask);

module.exports = router;
