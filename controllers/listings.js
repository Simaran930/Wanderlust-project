const Listing=require("../models/listing.js");


module.exports.index=async (req,res)=>{
    const allListings=await Listing.find({});
    res.render("listings/index.ejs",{allListings});

}

module.exports.rederNewForm=async (req,res)=>{
    res.render("listings/new.ejs")

}

module.exports.Show=async (req,res)=>{
    let {id}=req.params;
    const listing= await Listing.findById(id).populate({path:"reviews",
        populate:{
            path:"author",
        }
    }).populate("owner");
    if(!listing){
        req.flash("error","This listing does not exist!");
        res.redirect("/listings");
    }
    res.render("listings/show.ejs",{listing})

}

module.exports.Create=async(req,res,next)=>{
    let url=req.file.path;
    let filename=req.file.filename;
    const newListing= new Listing(req.body.listing);
    newListing.owner=req.user._id;
    newListing.image={url,filename};
    await newListing.save();
    req.flash("success","New Listing Created.");
    res.redirect("/listings");
    

}

module.exports.Edit=async (req,res)=>{
    let {id}=req.params;
    const listing= await Listing.findById(id);
    if(!listing){
        req.flash("error","This listing does not exist!");
        res.redirect("/listings");
    }
    let originalImageUrl=listing.image.url;
   originalImageUrl= originalImageUrl.replace("/upload","/upload/h_300,w_250");
    res.render("listings/edit.ejs",{listing,originalImageUrl});
}

module.exports.Update=async (req,res)=>{
    let {id}=req.params;
    const listing=await Listing.findByIdAndUpdate(id,{...req.body.listing});

    if(typeof req.file!=="undefined"){
        let url=req.file.path;
        let filename=req.file.filename;
        listing.image={url,filename};
        await listing.save();
    }
    req.flash("success","Listing Updated");
    res.redirect(`/listings/${id}`);
}

module.exports.Delete=async (req,res)=>{
    let {id}=req.params;
    const deletedlist=await Listing.findByIdAndDelete(id);
    req.flash("success","Listing Deleted.");
    res.redirect("/listings");
}