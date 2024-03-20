const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const reviewSchema = Schema({
    comments: String,
    rating: {
        type: Number,
        min: 1,
        max: 5
    },
    createDate: {
        default: Date.now(),
        type: Date
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: "User"

    }

});
const review = mongoose.model("review", reviewSchema);
module.exports = review;
