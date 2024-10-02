const express = require("express");
const router = express.Router();
const {
  getRouter,
  postRouter,
  updateRouter,
  deleteRouter,
  getUserRouter,
} = require("../controller/contactController");
const validateToken = require("../middleware/validateTokenHandler");

router.use(validateToken);
router.route("/").get(getRouter).post(postRouter);
router.route("/:id").put(updateRouter).delete(deleteRouter).get(getUserRouter);

module.exports = router;
