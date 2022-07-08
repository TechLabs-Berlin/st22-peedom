'use strict'

// require express and bodyParser
const  express = require("express");
const cors = require('cors');
const fs = require("fs");
const  bodyParser = require("body-parser");

// create express app
const  app = express();

// define port to run express app
const  port = process.env.PORT || 3000;

// use bodyParser middleware on express app
app.use(bodyParser.urlencoded({ extended:true }));
app.use(bodyParser.json());
app.use(express.static("public"));
app.use(express.json)


// Add endpoint
app.get('/', (req, res) => {
res.send(await fs.readFile("st22-peedom\Web\map.html", "utf-8"));
});
// Add endpoint for user location
app.post('/location', (req, res) => {
    console.log(request.body);
    const data = request.body;
    response.json({
        latitude: data.lat,
        longitutude: data.lng
    });
  });

// Listen to server
app.listen(port, () => {

console.log(`Server running at http://localhost:${port}`);
});

// Import DB Connection
require("./config/db");

// Import API route
var routes = require('./api/routes/toiletRoutes'); //importing route
const { response } = require("express");
routes(app);