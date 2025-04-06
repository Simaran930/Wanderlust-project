const express = require("express");
const router=express.Router({mergeParams:true});
const wrapAsync=require("../utils/wrapAsync.js");
const Listing=require("../models/listing.js");
const Review=require("../models/Reviews.js");
const {validateReview,isLoggedIn,isReviewAuthor}=require("../middleware.js");

const ReviewController=require("../controllers/reviews.js");

//Reviews
//post route
router.post("/", isLoggedIn, validateReview,wrapAsync(ReviewController.CreateReview));
  
//Reviews
//delete route
router.delete("/:reviewId",isLoggedIn, isReviewAuthor, wrapAsync(ReviewController.DeleteReview));
  
module.exports=router;