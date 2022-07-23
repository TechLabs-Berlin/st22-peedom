'use strict';
// Import mongoose
    const mongoose = require("mongoose");

// Declare schema and assign Schema class
    const Schema = mongoose.Schema;

// Create Schema Instance and add schema propertise
    const ToiletSchema = new Schema({
        Price:{
            type:String
        },
        Comments:[{
            type:String
        }],
        City:{
            type:String
        },
        isHandicappedAccessible: {
            type:String
        },
        opening_hours:{
            type:String
        },
        Street:{
            type:String
        }
    },
    {
        collection: "Toilet_Data"
    });

// Data for the MongoDB comes from a csv file prepared by DS
// The code to enter the CSV into Mongo is following:
// mongoimport --uri mongodb+srv://admin:pass@PeedomDB.gr9rk.mongodb.net/test --collection Toilet_Data --type CSV --headerline --file C:/programming1/peedom/st22-peedom/Data/draft_peedom.csv

// create and export model
module.exports = mongoose.model("toiletModel", ToiletSchema);