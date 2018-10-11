"use strict"

const {User} = require('../model/userModel');

const updateUserData = async (req, res) => {
	if (!(req.params.id && req.body.id && req.params.id === req.body.id)) {
		    const message =
		      `Request path id (${req.params.id}) and request body id ` +
		      `(${req.body.id}) must match`;
		    console.error(message);
		    return res.status(400).json({ message: message });
		}
	try{
		const toUpdate = {};
		const updateableFields = ["username","firstName", "lastName","bio","settings","cardCollection", "avatar"];

		updateableFields.forEach(field => {
		if (field in req.body) {
		  toUpdate[field] = req.body[field];
		}
		}); 
		const id = req.params.id;
		if(!id) return res.status(404).send({message:"id not found"})
		if(!toUpdate) return res.status(404).send({message:"text not found"})
		const updatedData = await User.findByIdAndUpdate(id, toUpdate, {new: true});
		res.status(200).send(updatedData.serialize());
	}
	catch(err){
	  res.status(500).send({message:"unable to update data"})
	}
}

const getUserData = async (req, res) => {
	try{
	  const {id} = req.params;
	  if(id){
	    const specificData = await User.findById(id)
	    //we need to return it to end promise
	    return res.status(200).send(specificData)
	  }
	  //if id is null or undefined, GET all
	  const data = await User.find({})
	  res.status(200).json(data.map(user => user.serialize()))
	}
	catch(err){
	  res.status(500).send({message:"was not able to fetch data from the database"})
	}
}

const createNewUserData = async (req, res) => {
	try{
		const requiredFields = ['username', 'password'];
		const missingField = requiredFields.find(field => !(field in req.body));

		if (missingField) {
		  return res.status(422).json({
		    code: 422,
		    reason: 'ValidationError',
		    message: 'Missing field',
		    location: missingField,
		    sentForms: req.body
		  });
		}

		const stringFields = ['username', 'password', 'firstName', 'lastName'];
		const nonStringField = stringFields.find(
		  field => field in req.body && typeof req.body[field] !== 'string'
		);

		if (nonStringField) {
		  return res.status(422).json({
		    code: 422,
		    reason: 'ValidationError',
		    message: 'Incorrect field type: expected string',
		    location: nonStringField
		  });
		}

		// If the username and password aren't trimmed we give an error.  Users might
		// expect that these will work without trimming (i.e. they want the password
		// "foobar ", including the space at the end).  We need to reject such values
		// explicitly so the users know what's happening, rather than silently
		// trimming them and expecting the user to understand.
		// We'll silently trim the other fields, because they aren't credentials used
		// to log in, so it's less of a problem.
		const explicityTrimmedFields = ['username', 'password'];
		const nonTrimmedField = explicityTrimmedFields.find(
		  field => req.body[field].trim() !== req.body[field]
		);

		if (nonTrimmedField) {
		  return res.status(422).json({
		    code: 422,
		    reason: 'ValidationError',
		    message: 'Cannot start or end with whitespace',
		    location: nonTrimmedField
		  });
		}

		const sizedFields = {
		  username: {
		    min: 1
		  },
		  password: {
		    min: 10,
		    // bcrypt truncates after 72 characters, so let's not give the illusion
		    // of security by storing extra (unused) info
		    max: 72
		  }
		};
		const tooSmallField = Object.keys(sizedFields).find(
		  field =>
		    'min' in sizedFields[field] &&
		          req.body[field].trim().length < sizedFields[field].min
		);
		const tooLargeField = Object.keys(sizedFields).find(
		  field =>
		    'max' in sizedFields[field] &&
		          req.body[field].trim().length > sizedFields[field].max
		);

		if (tooSmallField || tooLargeField) {
		  return res.status(422).json({
		    code: 422,
		    reason: 'ValidationError',
		    message: tooSmallField
		      ? `Must be at least ${sizedFields[tooSmallField]
		        .min} characters long`
		      : `Must be at most ${sizedFields[tooLargeField]
		        .max} characters long`,
		    location: tooSmallField || tooLargeField
		  });
		}

		let {username, password, firstName = '', lastName = ''} = req.body;
		// Username and password come in pre-trimmed, otherwise we throw an error
		// before this
		firstName = firstName.trim();
		lastName = lastName.trim();

		return User.find({username})
		  .count()
		  .then(count => {
		    if (count > 0) {
		      // There is an existing user with the same username
		      return Promise.reject({
		        code: 422,
		        reason: 'ValidationError',
		        message: 'Username already taken',
		        location: 'username'
		      });
		    }
		    // If there is no existing user, hash the password
		    return User.hashPassword(password);
		  })
		  .then(hash => {
		    return User.create({
		      username,
		      password: hash,
		      firstName,
		      lastName
		    });
		  })
		  .then(user => {
		    return res.status(201).json(user.serialize());
		  })
		  .catch(err => {
		    // Forward validation errors on to the client, otherwise give a 500
		    // error because something unexpected has happened
		    if (err.reason === 'ValidationError') {
		      return res.status(err.code).json(err);
		    }
		    res.status(500).json({code: 500, message: 'Internal server error'});
		    console.error(err);
		  });
	}
	catch(err){
		console.log(err);
	  	res.status(500).send({message:"unable to create user", error: err})
	}
}

const deleteUserData = async (req,res) => {
  try{
    const {id} = req.params;
    //delete specific User by ID
    if(id){
      //https://mongoosejs.com/docs/api.html#model_Model.findByIdAndDelete
      const deletedData = await User.findByIdAndRemove(id)
      return res.status(200).send({message: `Deleting User ${deletedData.username}`})
    }
  }
  catch(err){
  	console.log(err);
    res.status(500).send({message:"unable to delete data", error: err})
  }
}



module.exports = {
	deleteUserData,
	createNewUserData,
	getUserData,
	updateUserData
}