const express = require("express"),
    router = express.Router();

const User = require("../models/user.js"),
    { auth } = require("../middle_wares/auth");


router.get('/get_employee',(req,res)=>{
        let id = req.query.id;
        console.log(id);
        User.findById(id,(err,doc)=>{
            if(err) return res.json({err:err, message:"err"});
            res.json({employee:doc});
        })
    });
    

router.get("/employees", (req, res) => {
    User.find({ isAdmin: false }, (err, foundUsers) => {
        if (err) res.send({ err: true, message: "got error" });
        res.json({ employees: foundUsers });
    });
});

router.get('/auth',auth,(req,res)=>{
    res.json({
        isAuth:true,
        id:req.user._id,
        isAdmin: req.user.isAdmin,
        email:req.user.email,
    })
})

router.post("/users/register", (req, res) => {
    const user = new User({
        email: req.body.email,
        password: req.body.password,
        isAdmin: false,
        isEmployee: true,
        name: req.body.name,
        deparment: req.body.deparment
    });


    user.save((err, createdUser) => {
        if (err) {
            console.log(err);
            return res.status(400).send(err);

        }
        res.status(200).send({ message: "Successfully registered" });
    })

});

router.post("/users/login", (req, res) => {
    console.log("request body",req.body);
    User.findOne({email:req.body.email},(err,user)=>{
        if(!user) return res.json({isAuth:false,message:'Auth failed, email not found'})

        user.comparePassword(req.body.password,(err,isMatch)=>{
            if(!isMatch) return res.json({
                isAuth:false,
                message:'Wrong password'
            });

            user.generateToken((err,user)=>{
                if(err) return res.status(400).send(err);
                res.cookie('auth',user.token).json({
                    isAuth:true,
                    id:user._id,
                    email:user.email,
                    isAdmin: user.isAdmin
                })
            })
        })
    })
});

router.get("/users/logout", auth, (req, res) => {
    req.user.deleteToken(req.token, (err, user) => {
        if (err) return res.status(400).send(err);
        res.sendStatus(200)
    })
});

module.exports = router;
