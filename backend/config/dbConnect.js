const mongoose = require("mongoose");
//url from mongodb atlis using compass
const url = "mongodb+srv://menaagina:iaBaZiBeE1ClVCaQ@cluster0.fiw0d.mongodb.net/Track_expenses_and_income";
// const url2 = process.env;
// console.log(url2.MONGO_URL);
function dbConnect() {
    mongoose.connect(url, {
        useUnifiedTopology: true,
        useNewUrlParser: true
    })
        .then(() => console.log("Connected to database"))
        .catch(error => console.log(error));
}
module.exports = dbConnect;