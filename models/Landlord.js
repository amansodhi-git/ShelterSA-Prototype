const mongoose = require('mongoose');

const LandlordSchema = new mongoose.Schema({
    email: {
        type: String,
        required: false
    },
    propertyAddress: {
        type: String,
        required: true
    },
    propertyUnitNum: {
        type: Number,
        required: true
    },
    propertyCategory: {
        type: String,
        required: true
    },
    propertyArea: {
        type: Number,
        required: true
    },
    propertyBedrooms: {
        type: Number,
        required: true
    },
    propertyLivingAreas: {
        type: Number,
        required: true
    },
    propertyToilets: {
        type: Number,
        required: true
    },
    propertyBathrooms: {
        type: Number,
        required: true
    },
    propertyGarage: {
        type: Number,
        required: true
    },
    propertyCarport: {
        type: Number,
        required: true
    },
    propertyDescription: {
        type: String,
        required: false
    },
    date: {
        type: Date,
        default: Date.now
    }

});

const Landlord = mongoose.model('Landlord', LandlordSchema);

module.exports = Landlord; 