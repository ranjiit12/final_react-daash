const mongoose = require("mongoose");

var attendanceSchema = new mongoose.Schema({
    event: String,
    date: String,
    isSeen: false

});

module.exports = mongoose.model("Holiday", attendanceSchema);
