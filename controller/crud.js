const Crud = require('../model/crud');


//seperate actual logic from routing
const saveData = async (req,res) => {
  try{
    const {text} = req.body;
    //front-end developer forgot to add text field
    if(!text){
      return res.status(404).send({message:"text is undefined"})
    }
    //has to save it in object
    const newCrud = new Crud({
      text
    });
    const result = await newCrud.save();
    res.status(200).send(result)
  }
  catch(err){
    console.log(err)
    res.status(500).send({message:"was not able to save data"})
  }
}

const getData = async (req,res) => {
  try{
    const {id} = req.params;
    if(id){
      const specificData = await Crud.findById(id)
      //we need to return it to end promise
      return res.status(200).send(specificData)
    }
    //if id is null or undefined, it means a front-end
    //developer wants all data
    const data = await Crud.find({})
    res.status(200).send(data)
  }
  catch(err){
    res.status(500).send({message:"was not able to fetch data from the database"})
  }
}

const deleteData = async (req,res) => {
  try{
    const {id} = req.params;
    //delete specific data
    if(id){
      //https://mongoosejs.com/docs/api.html#model_Model.findByIdAndDelete
      const deletedData = await Crud.findByIdAndRemove(id)
      return res.status(200).send({deletedData})
    }
    //delete all data, not sure if I want to have a powerful command like this... but for Science I guess
    //this funciton does not return any response because
    await Crud.remove()
    return res.status(200).send({message:"removed all data in CRUD collection"})
  }
  catch(err){
    res.status(500).send({message:"unable to delete data"})
  }
}

const updateData = async (req,res) => {
  try{
    const {id} = req.params;
    const {text} = req.body;
    if(!id) return res.status(404).send({message:"id not found"})
    if(!text) return res.status(404).send({message:"text not found"})
    const updatedData = await Crud.findByIdAndUpdate(id, {text})
    res.status(200).send({updatedData})
  }
  catch(err){
    res.status(500).send({message:"unable to update data"})
  }
}

module.exports = {
  saveData,
  getData,
  deleteData,
  updateData
}
