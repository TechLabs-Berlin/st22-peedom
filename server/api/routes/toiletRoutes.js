'use strict';

// create App function
    module.exports = function(app) {
        var toiletList = require('../controllers/peedomController');

// toilet-all endpoint is used for the DS algorithm and is returns every entry from MongoDB
        app
        .route("/toilets-all")
        .get(toiletList.listAllToilets);

    };