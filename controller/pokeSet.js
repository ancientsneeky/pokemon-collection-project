"use strict"

const {PokeSet} = require('../model/cardModel');

// Should be no reason to update a card as they are generated from API meta data

// const updatePokeSetData = async (req, res) => {
// 	if (!(req.params.id && req.body.id && req.params.id === req.body.id)) {
// 		    const message =
// 		      `Request path id (${req.params.id}) and request body id ` +
// 		      `(${req.body.id}) must match`;
// 		    console.error(message);
// 		    return res.status(400).json({ message: message });
// 		}
// 	try{
// 		const toUpdate = {};
// 		const updateableFields = ["name","setID", "image","rarity","nationalPokeNum"];

// 		updateableFields.forEach(field => {
// 		if (field in req.body) {
// 		  toUpdate[field] = req.body[field];
// 		}
// 		}); 
// 		const id = req.params.id;
// 		if(!id) return res.status(404).send({message:"id not found"})
// 		if(!toUpdate) return res.status(404).send({message:"text not found"})
// 		const updatedData = await PokeSet.findByIdAndUpdate(id, toUpdate, {new: true});
// 		res.status(200).send(updatedData.serialize());
// 	}
// 	catch(err){
// 	  res.status(500).send({message:"unable to update data"})
// 	}
// }

const getPokeSetData = async (req, res) => {
	try{
	  const {id} = req.params;
	  if(id){
	    const specificData = await PokeSet.findById(id)
	    //we need to return it to end promise
	    return res.status(200).send(specificData.serialize())
	  }
	  //if id is null or undefined, GET all
	  const data = await PokeSet.find({})

	  res.status(200).json(data.map(item => item.serialize()));
	}
	catch(err){
		console.log(err);
	  res.status(500).send({message:"was not able to fetch data from the database"})
	}
}

const createNewPokeSetData = async (req,res) => {
	try{
	  const {name} = req.body;
	  //front-end developer forgot to add text field
	  if(!name){
	    return res.status(404).send({message:"something is undefined"})
	  }
	  //has to save it in object
	  const newPokeSet = new PokeSet({
	    name
	  });
	  const result = await newPokeSet.save();
	  res.status(200).send(result)
	}
	catch(err){
	  console.log(err)
	  res.status(500).send({message:"was not able to save data"});
	}
}

const deletePokeSetData = async (req,res) => {
  try{
    const {id} = req.params;
    //delete specific PokeSet by ID
    if(id){
      //https://mongoosejs.com/docs/api.html#model_Model.findByIdAndDelete
      const deletedData = await PokeSet.findByIdAndRemove(id);
      return res.status(200).send({message: `Deleting PokeSet "${deletedData.name}"`});
    }
  }
  catch(err){
  	console.log(err);
    res.status(500).send({message:"unable to delete data", error: err})
  }
}



module.exports = {
	deletePokeSetData,
	createNewPokeSetData,
	getPokeSetData
}