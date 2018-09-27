// host:port/api/users to create new user

// host:port/api/auth/login to login with new users

// host:port/api/protected with login JWT to access
userSchema = {
	userName,
	firstName,
	lastName,
	password,
	dateJoined,
	avatar,
	bio,
	settings: {displayPerpage,etc},
	collection: []refernce setSchema
}

cardSchema = {
	name,
	setId,
	condition,
	image: url
}

setSchema = {
	name,
	collected: []refernce cardSchema
}
