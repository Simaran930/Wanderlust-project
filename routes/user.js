const express = require("express");
const router=express.Router();
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const {saveRedirectUrl}=require("../middleware.js");

const UserController=require("../controllers/users.js");

router
    .route("/signup")
    .get(UserController.renderSignUp)
    .post(wrapAsync(UserController.SignUp));


router
    .route("/login")
    .get(UserController.renderLogin)
    .post( 
        saveRedirectUrl, 
        passport.authenticate('local',
            {failureRedirect:'/login', 
            failureFlash:true
        }), 
        wrapAsync(UserController.Login));


router.get("/logout",UserController.Logout);

module.exports=router;