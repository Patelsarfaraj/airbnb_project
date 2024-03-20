const express = require("express");
const router = express.Router();
const wrapasync = require("../utils/wrapasync.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../midelwere.js");
const usercontroller = require("../controllers/usercontroller.js");


router.route("/signup").get(usercontroller.renderSignup)
.post(wrapasync(usercontroller.createSignup));


router.route("/login")
.get(usercontroller.renderSignin)
.post( saveRedirectUrl, passport.authenticate("local", { failureRedirect: '/login', failureFlash: true }), wrapasync(usercontroller.login));
router.get("/logout", usercontroller.logout)
module.exports = router;