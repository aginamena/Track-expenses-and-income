const mongoose = require("mongoose");
//url from mongodb atlis using compass

console.log(process.env.MONGO_URL);
function dbConnect() {
    mongoose.connect(process.env.MONGO_URL, {
        useUnifiedTopology: true,
        useNewUrlParser: true
    })
        .then(() => console.log("Connected to database"))
        .catch(error => console.log(error));
}
module.exports = dbConnect;