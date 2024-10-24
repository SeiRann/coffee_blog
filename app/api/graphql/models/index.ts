// User Model Creation
import mongoose from "mongoose"
const { Schema } = mongoose

const userSchema = new Schema({
	username: { type: String, required: true, unique: true },
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true, unique: true },
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

const postSchema = new Schema({
	postid: { type: String, required: true },
	title: { type: String, required: true },
	text: { type: String, required: true },
	author: { type: String, required: true },
	category: { type: String },
	dateCreated: { type: Date, required: true },
	likes: { type: Number, default: 0 },
	dislikes: { type: Number, default: 0 },
})

const UserModel = mongoose.models.UserModel || mongoose.model("UserModel", userSchema)
const PostModel = mongoose.models.PostModel || mongoose.model("PostModel", postSchema)

export { UserModel, PostModel }
