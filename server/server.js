'use strict'

// require express and bodyParser
const  express = require("express");
const  bodyParser = require("body-parser");
const cors = require("cors")

// create express app
const  app = express();

// define port to run express app
const  port = process.env.PORT || 3000;

// use bodyParser middleware on express app
app.use(bodyParser.urlencoded({ extended:true }));
app.use(bodyParser.json());
app.use(cors());

// Add endpoint
app.get('/toilet', (req, res) => {
    let dataTest = ""
    // turn query parameters into string that will be passed to pp.py
    let paramString = JSON.stringify(req.query)

    const spawn = require("child_process").spawn;
    // const childPython = spawn("python", ["../../../server/pp.py", req.query.lat, req.query.lng]);
    const childPython = spawn("python", ["pp.py", paramString]);
    childPython.stdout.on("data", (data) => {
        const dataToSend = data.toString()
        dataTest += dataToSend
    })
    childPython.stdout.on("close", (code) => {
        // console.log("Hello");
        //convert dataTest to JSON
        let myData = JSON.parse(dataTest)
        //extract Data form Object
        console.log(myData.Message);
        res.status(200).json(myData.Data)
    })
  });

// Listen to server
app.listen(port, () => {

console.log(`Server running at http://localhost:${port}`);
});

// Import DB Connection
require("./config/db");

// Import API route
var routes = require('./api/routes/toiletRoutes'); //importing route
routes(app);