const express = require("express"),
    router = express.Router();

const Holyday = require("../models/holydays"),
      Leave   = require("../models/leaves");
      User    = require("../models/user");

      

router.get("/timetable", (req, res) => {
    res.render("admin/holiday");
});



router.get("/leaves", (req, res) => {
    Leave.find({}, (err, foundLeaves) => {
        if(err) res.json({message:"error occured"});
        res.json({leaves:foundLeaves});
    })
});



router.post("/timetable", (req, res) => {
    User.findOne({email:"ATIYA@GMAIL.COM"}, (err, foundUser)=> {
        if(err) res.send(err);
        if(foundUser){
            res.json({message:"event already aded"});
        } else {
            var newHolyday = new Holyday({
                event: req.body.event,
                date: req.body.date,
                isSeen: false
            });
            newHolyday.save((err, savedHolyday) => {
                if (err) res.status(200).json({ message: "error", error: true });
                res.json({ message: "event added successfully", error: false, holyday: savedHolyday });
        
            });
        
        }
    })
    
});;



router.delete("/delete_employee", (req, res) => {
    const id = req.query.id;
    User.findByIdAndRemove(id,(err,doc)=>{
        if(err) return res.status(400).send(err);
        res.json(true)
    });
});









module.exports = router;





















































// / const express = require("express"),
//     router = express.Router();
// const { auth } = require("../middle_wares/auth");
// const Holiday = require("../models/holydays");



// router.get("/login", (req, res) => {
//     res.render("admin/login");
// });

// router.get("/register", (req, res) => {
//     res.render("admin/register");
// });

// router.post("/register", (req, res) => {
//     const user = new User({
//         email: req.body.email,
//         password: req.body.password,
//         isAdmin: true,
//         isEmployee: false
//     });


//     user.save((err, createdUser) => {
//         if (err) {
//             console.log(err);
//             return res.status(400).send(err);

//         }
//         res.status(200).send({ message: "Successfully registered" });
//     })

// });


// router.get("/something", (req, res) => {
//     res.send("something");
// });

// router.post("/timetable", (req, res) => {
//     var newHoliday = new Holiday({
//         event: req.body.event,
//         date: req.body.date,
//         isSeen: false
//     });
//     newHoliday.save((err, savedHoliday) => {
//         if (err) res.status(200).json({ message: "error", error: true });
//         res.json({ message: "event added successfully", error: false });

//     });
// });



// router.get("/", checkAdmin, (req, res) => {

//     res.render("admin/attendance");
// });




// // to check if user is Admins
// function checkAdmin(req, res, next) {
//     // check if user is logged in
//     if (req.isAuthenticated()) {
//         // find campground

//         User.findById(req.user._id, function(err, foundUser) {
//             if (err) {
//                 res.redirect("back");
//             }
//             else {
//                 if (foundUser != null) {
//                     if (foundUser.isAdmin & !(foundUser.isEmployee)) {
//                         return next();
//                     }
//                     else {
//                         res.redirect("back");
//                     }

//                 }
//                 else {
//                     console.log(`theere is not user ${req.user}`);
//                     res.redirect("back");
//                 }

//             }
//         });
//     }
//     else {
//         res.redirect("back");
//     }

// }


// module.exports = router;
