const mongoose = require("mongoose");
const Schema = mongoose.Schema
const listingSchema = new Schema({
    f_Name:{
        type:String,
        require:true,
    },
    f_Email:{
        type:String,
        require:true,
    },
    f_Mobile:{
        type:Number,
        require:true,
    },
    f_Designation:{
        type:String,
        require:true,
    },
    f_Gender:{
        type:String,
        require:true,
    },
    f_Course:{
        type:String,
    },
    image:{
        url:String,
        filename:String,
    },
})

const Listing = mongoose.model("Listing",listingSchema);
module.exports = Listing;