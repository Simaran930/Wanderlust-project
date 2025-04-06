const express = require("express");
const router=express.Router();
const wrapAsync=require("../utils/wrapAsync.js");
const Listing=require("../models/listing.js");
const {isLoggedIn}=require("../middleware.js");
const {isOwner}=require("../middleware.js");
const {validateListing}=require("../middleware.js");

const multer= require("multer");
const {storage}=require("../cloudconfig.js");
const upload=multer({storage}); 

const listingController=require("../controllers/listings.js");

//Index Route & create route
router
    .route("/")
        .get(wrapAsync(listingController.index))
        .post(isLoggedIn, upload.single('listing[image]'), validateListing, wrapAsync(listingController.Create));
        


//new route
router.get("/new", isLoggedIn, wrapAsync(listingController.rederNewForm));

//show route //update route //delete route
router
    .route("/:id")
    .get(wrapAsync(listingController.Show))
    .put(isLoggedIn, isOwner,upload.single('listing[image]'), validateListing, wrapAsync(listingController.Update))
    .delete(isLoggedIn,isOwner, wrapAsync(listingController.Delete));



//edit route
router.get("/:id/edit",isLoggedIn,isOwner, wrapAsync(listingController.Edit));

module.exports=router;