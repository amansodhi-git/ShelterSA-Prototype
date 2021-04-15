const express = require("express");
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require("../config/auth");

// Welcome Page
router.get("/", forwardAuthenticated, (req, res) => res.render("welcome"));
router.get("/ind", (req, res) => res.render("welcome"));

// Dashboard
router.get("/dashboard", ensureAuthenticated, (req, res) =>

  res.render("dashboard", {
    firstName: req.user.firstName,
    lastName: req.user.lastName,
  })
);

module.exports = router;
