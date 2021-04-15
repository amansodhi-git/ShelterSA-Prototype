const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
// Load User model
const User = require('../models/User');
const {forwardAuthenticated} = require('../config/auth');
const { ensureAuthenticated} = require('../config/auth');
const Landlord = require('../models/Landlord');
// const { db } = require('../models/User');
const { db } = require('../models/Landlord');
const { mongo, connect } = require('mongoose');
// var url = 'mongodb://localhost:5000/ShelterSA';


// Login Page
router.get('/login', forwardAuthenticated, (req, res) => res.render('login'));

// Register Page
router.get('/register', forwardAuthenticated, (req, res) => res.render('register'));

// Landlord User Profile
router.get('/landlord_profile', ensureAuthenticated, (req, res) => res.render('landlord_profile', {
    firstName: req.user.firstName,
    lastName: req.user.lastName,
    email: req.user.email,
    currentAddress: req.user.currentAddress,
    userType: req.user.userType,
    
}));

// Landlord Manage Property 
router.get('/manageProperty', ensureAuthenticated, function(req, res, next) {

    firstName = req.user.firstName,
    lastName = req.user.lastName,
    email = req.user.email,
    currentAddress = req.user.currentAddress,
    userType = req.user.userType
    
    // propertyAddress = landlord


    db = connect("localhost:5000/ShelterSA");
    propertyAddress = db.find();

    
    // mongo.connect(function(err, db) {
    //     assert.equal(null, err);
    //     var propertyAddress = db.collection('landlords').find({propertyAddress});

    //     res.render('manageProperty',{items: firstName,lastName,email,currentAddress,userType,propertyAddress});

    // });

    res.render('manageProperty',{items: firstName,lastName,email,currentAddress,userType,propertyAddress});
});




// Add new Property (redirection)

router.get('/newProperty', ensureAuthenticated, (req, res) => res.render('newProperty', {
    firstName: req.user.firstName,
    lastName: req.user.lastName,
    email: req.user.email,
    currentAddress: req.user.currentAddress,
    userType: req.user.userType
}));

// Adding new Property (LandLord)
router.post('/newProperty', (req, res) => {

    const {
        email,
        firstName,
        lastName,
        userType,
        propertyAddress,
        propertyUnitNum,
        propertyCategory,
        propertyArea,
        propertyBedrooms,
        propertyLivingAreas,
        propertyToilets,
        propertyBathrooms,
        propertyGarage,
        propertyCarport,
        propertyDescription
        
    } = req.body;
    let errorsProperty = [];

    if(!propertyUnitNum || !propertyArea) {
        errorsProperty.push({msg: 'Please fill all the required fields'});
    }

    if (errorsProperty.length > 0) {
        res.render('newProperty', {
            errorsProperty,
            email,
            firstName,
            lastName,
            userType,
            propertyAddress,
            propertyUnitNum,
            propertyCategory,
            propertyArea,
            propertyBedrooms,
            propertyLivingAreas,
            propertyToilets,
            propertyBathrooms,
            propertyGarage,
            propertyCarport,
            propertyDescription
        });

    } else {

        const newLandlord = new Landlord({
            email,
            propertyAddress,
            propertyUnitNum,
            propertyCategory,
            propertyArea,
            propertyBedrooms,
            propertyLivingAreas,
            propertyToilets,
            propertyBathrooms,
            propertyGarage,
            propertyCarport,
            propertyDescription
        });
    
        
    
        newLandlord.save().then(user => {
            req.flash('success_msg', 'Your new property is successfully added! ');
            res.redirect('/');
            // req.alert('gg well played');
        }).catch(err => console.log(err));
    
        console.log(email + " " + propertyAddress);

    }
        
});

// Register
router.post('/register', (req, res) => {
    const {
        firstName,
        lastName,
        email,
        userType,
        currentAddress,
        password,
        password2
    } = req.body;
    let errors = [];

    if (!firstName || !lastName || !email || !password || !password2 || !currentAddress) {
        errors.push({msg: 'Please enter all fields'});
    }

    if (password != password2) {
        errors.push({msg: 'Passwords do not match'});
    }

    if (password.length < 6) {
        errors.push({msg: 'Password must be at least 6 characters'});
    }

    if (userType == 'default') {
        errors.push({msg: 'Please select a valid option for user type'});
    }
    if (errors.length > 0) {
        res.render('register', {
            errors,
            firstName,
            lastName,
            email,
            currentAddress,
            userType,
            password,
            password2
        });
    } else {
        User.findOne({email: email}).then(user => {
            if (user) {
                errors.push({msg: 'Email already exists'});
                res.render('register', {
                    errors,
                    firstName,
                    lastName,
                    email,
                    currentAddress,
                    userType,
                    password,
                    password2
                });
            } else {
                const newUser = new User({firstName, lastName, email, userType, currentAddress, password});

                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) 
                            throw err;
                        
                        newUser.password = hash;
                        newUser.save().then(user => {
                            req.flash('success_msg', 'You are now registered and can log in');
                            res.redirect('/users/login');
                        }).catch(err => console.log(err));
                    });
                });
            }
        });
    }
});

// Login
router.post('/login', (req, res, next) => {
    
    passport.authenticate('local', {

        successRedirect: '/dashboard',
        failureRedirect: '/users/login',
        failureFlash: true
    })(req, res, next);
});

// Logout
router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/users/login');
});

module.exports = router;
