// import Toilet Model
const  Toilet = require("../models/toiletModel");

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