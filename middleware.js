const Listing = require("./models/listing.js");
const ExpressError = require('./utils/ExpressError.js');
const {listingSchema} = require('./schema.js');

module.exports.isLoggedIn=((req,res,next)=>{
    if(!req.isAuthenticated()){
        req.session.redirectUrl=req.originalUrl;//getting original url that where user want to visit
        req.flash("error","You must be login");
        return res.redirect("/login");
    }
    next();
})

//this code is because we cannot directly access session in passport so we use locals
module.exports.saveRedirectUrl=(req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl=req.session.redirectUrl;
    }
    next();
}


module.exports.validateListing = (req,res,next)=>{
    let {error} = listingSchema.validate(req.body);
    if(error){
        let errMsg = error.details.map((el)=>el.message).join(",");
        throw new ExpressError(400,errMsg);
    }else{
        next();
    }
}
