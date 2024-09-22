const Listing = require("../models/listing")

module.exports.index = async(req,res)=>{
    let allListings = await Listing.find();
    res.render("listings/listing.ejs",{allListings});
}

module.exports.renderNewListingForm = (req,res)=>{
    res.render("listings/new.ejs")
}

module.exports.createNewListing = async(req,res,next)=>{
    let url = req.file.path;
    let filename = req.file.filename;

    let newListing = new Listing(req.body.listing);
    console.log(newListing);
   //storing owner id while creating
    newListing.image={url,filename};//storing url and filename
    await newListing.save();
    req.flash('success',"New Employee created");
    res.redirect("/listing");
}

module.exports.showListing = async(req,res)=>{
    let {id}=req.params;
    let listing = await Listing.findById(id)
    if(!listing){
        req.flash('error',"Employee you are searching for does not exist");
        res.redirect("/listing");
    }
    res.render("listings/show.ejs",{listing});
}

module.exports.renderEditListingForm = async(req,res)=>{
    let{id}=req.params;
    let listing = await Listing.findById(id);
    if(!listing){
        req.flash('error',"Employee you are searching for does not exist");
        res.redirect("/listing");
    }
    let OriginalImageUrl = listing.image.url;
    OriginalImageUrl=OriginalImageUrl.replace("/upload","/upload/h_20,w_20")
    res.render("listings/edit.ejs",{listing,OriginalImageUrl})
}

module.exports.updateListing = async(req,res)=>{
    let {id}=req.params;
    let listing = await Listing.findByIdAndUpdate(id,{...req.body.listing});
    if(typeof req.file!== "undefined"){
        let url = req.file.path;
        let filename = req.file.filename;
        listing.image={url,filename};
        await listing.save();
    }
    
    req.flash('success',"Employee details updated");
    res.redirect(`/listing/${id}`);
}

module.exports.destroyListing = async (req,res)=>{
    let {id}=req.params;
    await Listing.findByIdAndDelete(id);
    req.flash('success',"Employee details deleted");
    res.redirect("/listing");
}