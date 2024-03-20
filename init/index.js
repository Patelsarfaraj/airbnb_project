const mongoose = require("mongoose");
const listing = require("../models/init.js");
const datainit = require("./data.js");


main().then(() => {
    console.log("connect db");

}).catch((err) => {
    console.log(err);

})
async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/wonderlus")
}
const initdb = async () => {
    await listing.deleteMany({});
    datainit.data = datainit.data.map((obj) => ({ ...obj, owner: "65f000f2f97ebf5e96bca141" }))
    // console.log(datainit.data)
    await listing.insertMany(datainit.data);
    // await listing.save();
    console.log("saved");
}
initdb();