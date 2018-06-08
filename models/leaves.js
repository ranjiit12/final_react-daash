const mongoose = require("mongoose");

var attendanceSchema = new mongoose.Schema( {
    leaveDate: String,
    leaveReaon: String,
    isApproved: Boolean,
    isSeen    : Boolean,
    email:   String
        
});

module.exports  =  mongoose.model("Leave", attendanceSchema);