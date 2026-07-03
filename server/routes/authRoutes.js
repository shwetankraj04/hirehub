const express = require("express");
const { protect, authorizeRoles } = require("../middleware/authMiddleware");
const { registerUser, loginUser } = require("../controllers/authController");

const router = express.Router();

//register route
router.post("/register", registerUser);

//login route
router.post("/login", loginUser);

router.get("/profile", protect, (req, res) => {
  res.status(200).json({
    message: "Protected route accessed",
    user: req.user,
  });
});

router.get(
  "/recruiter-dashboard",
  protect,
  authorizeRoles("recruiter"),
  (req, res) => {
    res.status(200).json({
      message: "Welcome Recruiter",
    });
  },
);

module.exports = router;
