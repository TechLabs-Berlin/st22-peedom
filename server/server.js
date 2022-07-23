'use strict'

// require express and bodyParser
const  express = require("express");
const  bodyParser = require("body-parser");
const cors = require("cors")
const axios = require('axios');
const  Toilet = require("../server/api/models/toiletModel");

// create express app
const  app = express();

// define port to run express app
const  port = process.env.PORT || 3000;

// middleware on express app
app.use(bodyParser.urlencoded({ extended:true }));
app.use(bodyParser.json());
app.use(cors());

// Endpoint that calls DS algorithm and returns results
app.get("/toilet", (req, res) => {
    const userParams = req.query
    axios.get('http://127.0.0.1:5000/toilets', 
    {params: userParams})
  .then((response) => {
    res.send(response.data)
    // console.log(response.status);
    // console.log(response.statusText);
    // console.log(response.headers);
    // console.log(response.config);
  })
  .catch(err => {
    console.log(err);
    // if no params are given due to user location not being shared all toilets endpoint is called
    axios.get("http://localhost:3000/toilets-all")
    .then((response) => {
        res.send(response.data)
    })
  })

})

// endpoint to get just one toilet based on ID
app.get("/toilet/:id", async (req, res) => {
    const { id } = req.params.id
    console.log(id);
    const toilet = await Toilet.findOne(id);
    console.log(toilet);
    res.send(toilet)

})
// endpoint for review to be added to MongoDB document
app.post("/toilet/:id", async (req, res) => {
  const { id } = req.params.id
  const update = { Comments: req.body };
  let toilet = await Toilet.findOneAndUpdate(id, {$push: update}, {
    new: true
  });
  res.send(toilet)
})


// // Pervious method used to request DS algorithm based on child-process - functional
// // A get request will require a python file, in this case pp.py and use the sys.dout.flush to get the result
// //
// app.get('/toilet', (req, res) => {
//     let dataTest = ""
//     // turn query parameters into string that will be passed to pp.py
//     let paramString = JSON.stringify(req.query)

//     const spawn = require("child_process").spawn;
//     const childPython = spawn("python", ["pp.py", paramString]);
//     childPython.stdout.on("data", (data) => {
//         const dataToSend = data.toString()
//         dataTest += dataToSend
//     })
//     childPython.stdout.on("close", (code) => {
//         // console.log("Hello");
//         //convert dataTest to JSON
//         let myData = JSON.parse(dataTest);
//         //extract Data form Object
//         console.log(myData.Message);
//         res.status(200).json(myData.Data)
//     })
//   });

// Listen to server
app.listen(port, () => {

console.log(`Server running at http://localhost:${port}`);
});

// Import DB Connection
require("./config/db");

// Import API route
var routes = require('./api/routes/toiletRoutes'); //importing route
routes(app);
