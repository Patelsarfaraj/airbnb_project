const listingall = require("./models/init.js");
const review = require("./models/review.js");

const { listingscema, reviewschema } = require("./schema.js");

module.exports.isLogedIn = (req, res, next) => {
    console.log(req.originalUrl)
    req.session.redirectUrl = req.originalUrl;
    if (!req.isAuthenticated()) {
        req.flash("error", "You must be logged in");
        return res.redirect("/login");
    }
    next();
}
module.exports.saveRedirectUrl = (req, res, next) => {
    if (req.session.redirectUrl) {
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
}
module.exports.isOwner = async (req, res, next) => {
    const { id } = req.params;
    const listing = await listingall.findById(id);
    if (!listing.owner.equals(res.locals.curentUser._id)) {
        req.flash("error", "You Not Have Permission");
        return res.redirect("/listings");
    }

    next();
}
module.exports.isauthor = async (req, res, next) => {
    const { id, reviewId } = req.params;
    const reviews = await review.findById(reviewId);
    if (!reviews.author.equals(res.locals.curentUser._id)) {
        req.flash("error", "You Not Have Permission");
        return res.redirect("/listings");
    }

    next();
}
module.exports.validatelisting = (req, res, next) => {
    const { error } = listingscema.validate(req.body);
    console.log(listingscema.validate(req.body));
    if (error) {
        const errMsg = error.details.map(el, () => el.message).join(",");
        throw new ExpressError(400, errMsg);
    } else {
        next();
    }
}
module.exports.validatereview = (req, res, next) => {
    const { error } = reviewschema.validate(req.body);
    if (error) {
        const errMsg = error.details.map(el, () => el.message).join(",");
        throw new ExpressError(400, errMsg);
    } else {
        next();
    }
}
