const express = require("express");
const router = express.Router();

const auth = require("../middleware/authmiddleware");

const {
    shareTask,
    getSharedTasks,
    getCollaborators
} = require("../controllers/collaborationcontroller");

router.put("/:id/share", auth, shareTask);

router.get("/shared", auth, getSharedTasks);

router.get("/:id/collaborators", auth, getCollaborators);

module.exports = router;