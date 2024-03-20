const listingall = require("../models/init.js");
const listing = require("../models/init.js");

module.exports.index = async (req, res) => {
    const alllist = await listingall.find({});
    res.render("listings/index.ejs", { alllist });
}
module.exports.renderForm = async (req, res) => {
    // const categories = await listingall.find({});
    // console.log(categories.category);
    const enumValues = listingall.schema.path('category').enumValues
    res.render("listings/new.ejs", { enumValues });
}
module.exports.showlisting = async (req, res) => {
    const { id } = req.params;
    const userlist = await listingall.findById(id).populate({ path: "reviews", populate: { path: "author" } }).populate("owner");
    if (!userlist) {
        req.flash("error", "listing not exist");
        res.redirect("/listings");
    }
    res.render("listings/showlist.ejs", { userlist });
}
module.exports.createlisting = async (req, res) => {

    const url = req.file.path;
    const filename = req.file.filename;
    // console.log(url, "...", filename)
    // const { title, dec, image, price, location, country } = req.body;
    console.log(req.body.list)
    const newList = new listing(req.body.list);
    newList.owner = req.user._id;
    newList.image = { url, filename };

    await newList.save();
    req.flash("sucess", "new listing created");
    res.redirect("/listings");

    // res.render("listings/new.ejs");
}
module.exports.editform = async (req, res) => {
    const { id } = req.params;
    const listingid = await listingall.findById(id);
    if (!listingid) {
        req.flash("error", "Listing not exist")
        res.redirect("/listings")
    }
    let originalurl = listingid.image.url;
    originalurl = originalurl.replace("/upload", "/upload/w_200");
    res.render("listings/editlist.ejs", { listingid, originalurl });
}
module.exports.editlisting = async (req, res) => {
    const { id } = req.params;


    const list = await listingall.findByIdAndUpdate(id, { ...req.body.list });
    if (typeof req.file != "undefined") {
        const url = req.file.path;
        const filename = req.file.filename;
        list.image = { url, filename };
        await list.save();


    }

    req.flash("sucess", "Updated listing");

    res.redirect(`/listings/${id}`);

}
module.exports.deletelisting = async (req, res) => {
    console.log(req.params)
    const { id } = req.params;

    await listingall.findByIdAndDelete(id);
    req.flash("sucess", "Delete listing");

    res.redirect("/listings");

}
module.exports.filterList = async (req, res) => {
    let { categorys } = req.params;
    categorys = decodeURIComponent(categorys);
    filterCat = categorys.toLowerCase();
    console.log(categorys);

    const alllist = await listingall.find({ category: filterCat });
    console.log(alllist);
    res.render("listings/index.ejs", { alllist });
}
module.exports.searchFilter = async (req, res) => {
    let { filter } = req.body;
    filter = filter.toLowerCase();
    // categorys = decodeURIComponent(categorys);
    console.log(filter);

    const alllist = await listingall.find({ category: filter });
    console.log(alllist);
    res.render("listings/index.ejs", { alllist });
}