const User=require("../models/User.js");

module.exports.renderSignUp=(req,res)=>{
    res.render("user/signup.ejs");
}

module.exports.SignUp=async(req,res)=>{
    try{
        let {username,email,password}=req.body;
        const newUser=new User({
         email,
         username
        })
       const registeruser= await User.register(newUser,password);
       req.login(registeruser,(err)=>{
        if(err){
            return next(err);
        }
        req.flash("success","Welcome to Wanderlust.");
       res.redirect("/listings");
       });
    }
    catch(e){
        req.flash("error",e.message);
        res.redirect("/signup");
    }
}

module.exports.renderLogin=(req,res)=>{
    res.render("user/login.ejs");
}

module.exports.Login=async(req,res)=>{
    req.flash("success","Welcome back to Wanderlust!");
    let redirectUrl=res.locals.redirectUrl  || "/listings";
    res.redirect(redirectUrl);

}

module.exports.Logout=(req,res,next)=>{
    req.logout((err)=>{
        if(err){
           return next(err);
        }
        req.flash("success","you are logged out!")
        res.redirect("/listings");
    })
}