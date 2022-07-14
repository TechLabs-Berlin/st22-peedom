'use strict'

// require express and bodyParser
const  express = require("express");
const  bodyParser = require("body-parser");
const fs = require("fs")
const cors = require("cors")
// const axios = require("axios")

// create express app
const  app = express();

// const spawn = require("child_process").spawn;
// const childPython = spawn("python", ["--version"])
// const childPython = spawn("python", ["pp.py"])
// childPython.stdout.on("data", (data) => {
//     console.log(`stdout: ${data}`);
// })
// childPython.stderr.on("data", (data) => {
//     console.log(`stderr: ${data}`);
// })
// childPython.on("close", (code) => {
//     console.log(`exited with: ${code}`);
// })
// define port to run express app
const  port = process.env.PORT || 3000;

// use bodyParser middleware on express app
app.use(bodyParser.urlencoded({ extended:true }));
app.use(bodyParser.json());
app.use(cors());

// let runPy = new Promise(function(success, nosuccess) {

//   const { spawn } = require('child_process');
//   const pyprog = spawn('python', ['./../pypy.py']);

//   pyprog.stdout.on('data', function(data) {

//       success(data);
//   });

//   pyprog.stderr.on('data', (data) => {

//       nosuccess(data);
//   });
// });

// Add endpoint
app.get('/toilet', (req, res) => {
    let dataTest = ""
    //for (const [key, value] of mySearchParams.entries()) {}
    const spawn = require("child_process").spawn;
    // const childPython = spawn("python", ["../../../server/pp.py", req.query.lat, req.query.lng]);
    const childPython = spawn("python", ["pp.py"]);
    childPython.stdout.on("data", (data) => {
        const dataToSend = data.toString()
        dataTest += dataToSend
    })
    childPython.stdout.on("close", (code) => {
        console.log("Hello");
        //convert dataTest to JSON
        let myData = JSON.parse(dataTest)
        //extract Data form Object
        res.status(200).json(myData.Data)
    })
  });
//   childPython.stdout.on("data", (err, data) => {
//     console.log(data);
    // if (data) {

    //     // const dataToSend = data.toString()
    //     // testData += dataToSend
    // }
    // if (err) {
    //     res.status(500).send(err);
    //     return
    // }
    // console.log("Hello")
    // res.send(data);
    // return

// childPython.stdout.on("close", (code) => {
//     res.send(testData)
// })
// Listen to server
app.listen(port, () => {

console.log(`Server running at http://localhost:${port}`);
});

// Import DB Connection
require("./config/db");

// Import API route
var routes = require('./api/routes/toiletRoutes'); //importing route
routes(app);