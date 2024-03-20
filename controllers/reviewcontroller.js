
const ReviewAll = require("../models/review.js");
const listingall = require("../models/init.js");
const review = require("../models/review.js");

module.exports.createReview = async (req, res) => {
    let list = await listingall.findById(req.params.id);
    let review = new ReviewAll(req.body.review);
    review.author = req.user._id;
    console.log(review)
    list.reviews.push(review);
    await review.save();
    await list.save();
    // res.send("done");
    req.flash("sucess", "add Comment sucess");

    res.redirect(`/listings/${list._id}`);

}
module.exports.destroyReview = async (req, res) => {
    const { id, reviewId } = req.params;
    await listingall.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });

    await review.findByIdAndDelete(reviewId);
    req.flash("sucess", "Delete Reviews");

    res.redirect(`/listings/${id}`);
}