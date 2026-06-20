const express = require("express");
const router = express.Router();

const auth = require("../middleware/authmiddleware");

const {
  shareTask,
  getTaskCollaborators,
  unshareTask,
  updatePermission
} = require("../controllers/collaborationcontroller");

router.put("/:id/share", auth, shareTask);
router.get("/:id/collaborators", auth, getTaskCollaborators);
router.delete("/:id/share/:userId", auth, unshareTask);
router.put("/:id/share/:userId", auth, updatePermission);

module.exports = router;
