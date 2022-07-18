'use strict';
// Import mongoose
    const mongoose = require("mongoose");

// Declare schema and assign Schema class
    const Schema = mongoose.Schema;

// Create Schema Instance and add schema propertise
    const ToiletSchema = new Schema({
        id:{
            type:Number,
            required:true
        },
        isHandicappedAccessible:{
            type:Boolean
        }
    },
    {
        collection: "Toilets"
    });

// create and export model
module.exports = mongoose.model("toiletModel", ToiletSchema);