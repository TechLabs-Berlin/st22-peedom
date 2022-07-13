// import Toilet Model
const  Toilet = require("../models/toiletModel");
const spawn = require("child_process").spawn;
// let runPy = new Promise(function(success, nosuccess) {

//     const { spawn } = require('child_process');
//     const pyprog = spawn('python', ['./../pypy.py']);

//     pyprog.stdout.on('data', function(data) {

//         success(data);
//     });

//     pyprog.stderr.on('data', (data) => {

//         nosuccess(data);
//     });
// });
// DEFINE CONTROLLER FUNCTIONS

// listToilets function - To list all toilets
exports.listAllToilets = (req, res) => {
Toilet.find({}, (err, toilet) => {
if (err) {
res.status(500).send(err);
}
res.status(200).json(toilet);
});
};

exports.listSomeToilets = (req, res) => {
    const pythonProcess = spawn('python',["C:\programming1\peedom\st22-peedom\server\pp.py", req.query.lat, req.query.lng]);
    console.log(req.query.lat);
    console.log(req.query.lng);
    pythonProcess.stdout.on('data', (err, data) => {
        if (err) {
            res.status(500).send(err);
        }
        res.status(200).json(data)
    });
};

exports.listOneToilet = (req, res) => {
    Toilet.findById({ _id:req.params.id }, (err, toilet) => {
    if (err) {
    res.status(500).send(err);
    }
    res.status(200).json(toilet);
    });
    };
    

// createNewToilet function - To create new Toilet
exports.createNewToilet  = (req, res) => {
let  newToilet = new Toilet (req.body);
newToilet.save((err, toilet) => {
if (err) {
res.status(500).send(err);
}
res.status(201).json(toilet);
});
};

// updateToilet function - To update toilet status by id
exports.updateToilet = (req, res) => {
Toilet.findOneAndUpdate({ _id:req.params.id }, req.body, { new:true }, (err, toilet) => {
if (err) {
res.status(500).send(err);
}
res.status(200).json(toilet);
});
};

// deleteToilet function - To delete toilet by id
exports.deleteToilet = async ( req, res) => {
await  Toilet.deleteOne({ _id:req.params.id }, (err) => {
if (err) {
return res.status(404).send(err);
}
res.status(200).json({ message:"Toilet successfully deleted"});
});
};