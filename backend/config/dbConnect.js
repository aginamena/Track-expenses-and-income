const mongoose = require("mongoose");
//url from mongodb atlis using compass

function dbConnect() {
    const url = "mongodb+srv://menaagina:iaBaZiBeE1ClVCaQ@cluster0.fiw0d.mongodb.net/Track_expenses_and_income";
    console.log(process.env.MONGO_URL);
    mongoose.connect(url, {
        useUnifiedTopology: true,
        useNewUrlParser: true
    })
        .then(() => console.log("Connected to database"))
        .catch(error => console.log(error));
}
module.exports = dbConnect;