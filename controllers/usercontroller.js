const usermodal = require("../models/user.js");


module.exports.renderSignup = (req, res) => {
    res.render("users/singup.ejs");
    // res.send("formm")
}
module.exports.renderSignin = (req, res) => {
    res.render("users/login.ejs");

}
module.exports.createSignup = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const newuser = new usermodal({ email, username });
        const registuser = await usermodal.register(newuser, password);
        req.login(registuser, (err) => {
            if (err) {

                return next(err);
            }
            req.flash("sucess", "Werlcome Wonderlus");
            res.redirect("/listings");

        })

    } catch (error) {
        req.flash("error", error.message);
        res.redirect("/signup");
    }

}
module.exports.login = async (req, res) => {
    req.flash("sucess", "Welcome to wonderlus");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
}
module.exports.logout = (req, res, next) => {
    req.logOut((err) => {
        if (err) {

            return next(err)
        }
        req.flash("sucess", "Your logout");
        res.redirect("/listings")
    });

}