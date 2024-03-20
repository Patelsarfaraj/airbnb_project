const express = require("express");

const router = express.Router();
const { storage } = require("../cludyConfig.js");
const multer = require('multer')
const upload = multer({ storage })

const { isLogedIn } = require("../midelwere.js");
const listingcontroller = require("../controllers/listingcontroller.js")
const { isOwner, validatelisting } = require("../midelwere.js")
const wrapasync = require("../utils/wrapasync.js");
router.route("/")
    .get(wrapasync(listingcontroller.index))
    .post(isLogedIn, upload.single('list[image]'), validatelisting, wrapasync(listingcontroller.createlisting));
router.get("/new", isLogedIn, wrapasync(listingcontroller.renderForm));



router.get("/filter/:categorys", wrapasync(listingcontroller.filterList));
router.post("/filter", wrapasync(listingcontroller.searchFilter));


router.route("/:id")
    .get(wrapasync(listingcontroller.showlisting))
    .put(isLogedIn, isOwner, upload.single('list[image]'), validatelisting, wrapasync(listingcontroller.editlisting))
    .delete(isLogedIn, isOwner, wrapasync(listingcontroller.deletelisting));



router.get("/:id/edit", isLogedIn, isOwner, wrapasync(listingcontroller.editform));

module.exports = router;