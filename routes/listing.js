const express = require("express");
const router = express.Router();
const Listing = require("../models/listing.js")
const wrapAsync = require('../utils/wrapAsync.js');
const ListingController = require("../controllers/listing.js");
const {isLoggedIn,validateListing} = require('../middleware.js');
const multer  = require('multer')
const {storage}= require('../cloudConfig.js')
const upload = multer({ storage })


router.route("/")
.get(wrapAsync(ListingController.index))
.post(isLoggedIn,upload.single('listing[image]'),validateListing,wrapAsync(ListingController.createNewListing));


router.get("/new",isLoggedIn,ListingController.renderNewListingForm)

router.route("/:id")
.get(wrapAsync(ListingController.showListing))
.put(isLoggedIn,upload.single('listing[image]'),validateListing,wrapAsync(ListingController.updateListing))
.delete(isLoggedIn,wrapAsync(ListingController.destroyListing))

router.get("/:id/edit",isLoggedIn,wrapAsync(ListingController.renderEditListingForm))


module.exports = router;