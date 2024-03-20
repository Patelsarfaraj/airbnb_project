
if (process.env.NODE_ENV != "production") {
    require('dotenv').config();
}
const express = require("express");
const app = express();
const mongoose = require("mongoose");
var cookie = require('cookie');

const listingrouter = require("./route/listings.js");
const reviewsrouter = require("./route/reviews.js");
const userrouter = require("./route/user.js");
const path = require("path");
const methodoverride = require("method-override");
const engine = require('ejs-mate');
const ExpressError = require("./utils/ExpressError.js");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const user = require("./models/user.js")
const session = require("express-session");
const MongoStore = require('connect-mongo');

const flash = require("connect-flash");
const { error } = require('console');
app.engine('ejs', engine);
const dbUrl = process.env.ATLASDb;

const store = MongoStore.create({
    mongoUrl: dbUrl,
    crypto: {
        secret: process.env.secret
    },
    touchAfter: 24 * 3600
});
store.on("error", () => {
console.log("error in session store",error)
})
const sessionOptions = {
    store,
    secret: process.env.secret,
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 60 * 60 * 24 * 7,

        httpOnly: true,
    },

};

app.use(methodoverride("_method"));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));



app.use(session(sessionOptions));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(user.authenticate()));
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());


app.use((req, res, next) => {
    res.locals.msgS = req.flash("sucess");
    res.locals.msgE = req.flash("error");
    res.locals.curentUser = req.user;

    next();
});
main().then(() => {
    console.log("connect db");

}).catch((err) => {
    console.log(err);

});
async function main() {
    await mongoose.connect(dbUrl);
}

app.use("/listings", listingrouter);
app.use("/listings/:id/reviews", reviewsrouter);
app.use("/", userrouter);



app.all("*", (req, res, next) => {
    next(new ExpressError(404, "Page Not Found"));
})
app.use((err, req, res, next) => {
    const { statusCode = 404, message = "somethingWrong" } = err;
    res.render("error.ejs", { err });

})
app.listen(8080, () => {
    console.log("listen port 8080");
});
