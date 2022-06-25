'use strict';

// create App function
    module.exports = function(app) {
        var toiletList = require('../controllers/peedomController');

// toiletList Routes

// get and post request for /toilet endpoints
        app
        .route("/toilet")
        .get(toiletList.listAllToilets)
        .post(toiletList.createNewToilet);

// put and delete request for /toilet endpoints
        app
        .route("/toilet/:id")
        .put(toiletList.updateToilet)
        .delete(toiletList.deleteToilet);
    };