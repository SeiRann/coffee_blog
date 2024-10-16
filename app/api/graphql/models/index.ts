// User Model Creation
const mongoose = require("mongoose")
const { Schema } = mongoose

const userSchema = new Schema({
	username: { type: String, required: true, unique: true },
	email: { type: String, required: true, unique: true },
	passwordHash: { type: String, required: true, unique: true },
	interests: [{ type: String }],
	posts: [{ type: String }],
	socials: [
		{
			github: { type: String },
			linkedin: { type: String },
			discord: { type: String },
			telegram: { type: String },
			instagram: { type: String },
			facebook: { type: String },
		},
	],
	dateCreated: { type: Date, required: true, default: Date.now() },
})

export default mongoose.models.UserModel || mongoose.model("UserModel", userSchema)
