const mongoose = require("mongoose");
const { listingscema } = require("../schema");
const review = require('./review.js');
const Schema = mongoose.Schema;

const listschema = Schema({
    title: {
        type: String,
        required: true

    }, dec: {
        type: String

    }, image: {
        url: String,
        fileName: String
        // type: String,
        // default: "https://images.unsplash.com/photo-1480796927426-f609979314bd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHRva3lvfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
        // set: (v) => v === "" ? "https://images.unsplash.com/photo-1480796927426-f609979314bd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHRva3lvfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60" : v,

    }, price: {
        type: Number

    }, location: {
        type: String

    }, country: {
        type: String

    },
    reviews: [{
        type: Schema.Types.ObjectId,
        ref: "review"
    }],
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    category: {
        type: String,
        enum: ["trends", "tooms", "boat", "farms", "castle", "arctic", "amazing pools", "islands", "beach"]
    }
});
listschema.pre('save', function (next) {
    this.category = this.category.toLowerCase();
    next();
});

// Define a pre-insertMany middleware to lowercase the category field
listschema.pre('insertMany', function (next, docs) {
    docs.forEach(doc => {
        if (doc.category) {
            doc.category = doc.category.toLowerCase();
        }
    });
    next();
});
listschema.post("findOneAndDelete", async (listing) => {
    if (listing) {

        await review.deleteMany({ _id: { $in: listing.reviews } })
    }

});

const listing = mongoose.model("listing", listschema);
module.exports = listing;