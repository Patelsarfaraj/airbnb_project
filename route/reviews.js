const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapasync = require("../utils/wrapasync.js");
const reviewcontroller = require("../controllers/reviewcontroller.js")
const { isLogedIn, isauthor, validatereview } = require("../midelwere.js");

router.post("/", isLogedIn, validatereview, wrapasync(reviewcontroller.createReview));
router.delete("/:reviewId", isLogedIn, isauthor, reviewcontroller.destroyReview);
module.exports = router;