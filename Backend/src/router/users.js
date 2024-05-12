const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");
const { verifyToken } = require("../middleware/verifyToken");
const { isAdmin } = require("../middleware/verifyRole");
const passport = require("passport");
const session = require("express-session");

router
  .post("/auth/register", authController.handleRegister)
  .post("/auth/login", authController.handleLogin)
  .post("/auth/refresh-token", authController.handleRefreshToken)
  .get("/auth/user", verifyToken, userController.handleGetUser)
  .get("/auth/all-user", verifyToken, isAdmin, userController.handleGetAllUser)
  .put("/auth/user/update/:id", userController.handleUpdateUser)
  // initial google ouath login
  .get(
    "/auth/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
  )
  .get(
    "/auth/google/callback",
    passport.authenticate("google", {
      //successRedirect:"http://localhost:3000",
      failureRedirect: "https://shop-datn.netlify.app/login",
    }),
    function (req, res) {
      session.user = req.user;
     res.redirect("https://shop-datn.netlify.app/auth/oauth2/login");
    //  console.log(res);
    }
  )
  .get("/login/success", authController.handleLoginSuccess)
  .post("/auth/logout",authController.handleLogout)
  .post("/auth/forgot/password",authController.handleForgotPassword)

module.exports = router;
