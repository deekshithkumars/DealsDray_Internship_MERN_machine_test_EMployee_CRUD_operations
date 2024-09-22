if(process.env.NODE_ENV != "production"){
    require('dotenv').config()
}
console.log(process.env.CLOUD_NAME)

const express = require("express");
const app = express();
const mongoose = require("mongoose");

const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require('ejs-mate');

const ExpressError = require('./utils/ExpressError.js');

const session = require("express-session");
const flash = require("connect-flash");

const listingsRouter= require("./routes/listing.js");
const userRouter= require("./routes/user.js");

const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");

app.use(express.urlencoded({extended:true}));

app.use(methodOverride("_method"));

app.engine('ejs', ejsMate);

app.use(express.static(path.join(__dirname,"public")));

main()
.then((res)=>{
    console.log("connected to DB");
})
.catch((err)=>{
    console.log(err)
})

async function main(){
    mongoose.connect('mongodb://127.0.0.1:27017/DealsDray');
}

app.get("/",(req,res)=>{
    res.send("main route working")
})

app.use(session({
    secret:"mysecretkey",
    resave:false,
    saveUninitialized:true,
    cookie:{
        expires : Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge:7 * 24 * 60 * 60 * 1000,
        httpOnly:true
    }
}));

app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

app.use((req,res,next)=>{
    res.locals.successMsg=req.flash("success");
    res.locals.errorMsg=req.flash("error");
    //to check user is loggedin or not 
    res.locals.currUser=req.user;
    next();
})

app.use("/listing",listingsRouter);

app.use("/",userRouter);

app.all("*",(req,res,next)=>{
    next(new ExpressError(404,"Page not found"))
})

app.use((err,req,res,next)=>{
    let{statusCode=500,message="something is wrong"}=err
    // res.status(statusCode).send(message);
    res.status(statusCode).render("listings/error.ejs",{message});
});

app.listen(8080,(req,res)=>{
    console.log("server listening to port 8080")
})
