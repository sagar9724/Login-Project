const express = require('express')
const router = new express.Router();
const User = require("../models/login")
const bcrypt = require("bcryptjs");



router.get("/", (req, res) => {
    res.render("index")
})

router.get("/about", (req, res) => {
    res.render("about")
})

router.get("/services", (req, res) => {
    res.render("services")
})

router.get("/contact", (req, res) => {
    res.render("contact")
})

router.get("/login", (req, res) => {
    res.render("login")
})

router.post("/login", async (req, res) => {

    try {
        const name = req.body.name;
        const email = req.body.email;
        const password = req.body.password;
        
        const result = await User.findOne({ name, email });

        // console.log(result.cpassword);
        const cpassword = result.cpassword;
        const isMatch = await bcrypt.compare(password,cpassword);
         

        if (!isMatch) {

            res.send("Wrong Username or Password");
        }
        else {
            const user = name;
            const token = await result.generateAuthToken();
            res.render("index", { user });
        }
    } catch (err) {
        res.status(400).send(err);
    }

})

router.get("/signup", (req, res) => {
    res.render("signup")
})

router.post("/signup", async (req, res) => {

    try {
        const password = req.body.password;
        const cpassword = req.body.cpassword;

        if (password === cpassword) {

            const data = new User({
                name: req.body.name,
                email: req.body.email,
                password: password,
                cpassword:cpassword
            });

            const token = await data.generateAuthToken();

            const result = await data.save();
            const user = req.body.name;
            res.render("index",{user});
        }
        else {
            res.send("Your data didn't save")
        }

    } catch (err) {
        res.send(err);
    }

})

module.exports = router;