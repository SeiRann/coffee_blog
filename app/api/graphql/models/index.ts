const mongoose = require("mongoose")
const { Schema } = mongoose

// Interfaces
interface GeneralComment {
	commentAuthor?: string
	commentText: string
	commentLikes: number
}

interface Social {
	github?: string
	linkedin?: string
	discord?: string
	telegram?: string
	instagram?: string
	facebook?: string
}

interface IStatistics {
	totalPosts: number
	totalAccounts: number
	totalComments: number
	totalLikes: number
	onlineUsers: number
	mostVisitedCategory: string
}

// Schemas
const statsSchema = new Schema({
	totalPosts: Number,
	totalAccounts: Number,
	totalComments: Number,
	totalLikes: Number,
	onlineUsers: Number,
	mostVisitedCategory: String,
})

interface IReply extends GeneralComment {
	commentCode: string
	replies: IReply[]
}

const replySchema = new Schema({
	commentCode: { type: String, required: true },
	commentAuthor: String,
	commentText: { type: String, required: true },
	commentLikes: { type: Number, default: 0 },
	replies: [{ type: Schema.Types.ObjectId, ref: "Reply" }], // Nested replies
})

interface IComment extends GeneralComment {
	postCode: string
	replies: IReply[]
}

const commentSchema = new Schema({
	postCode: { type: String, required: true },
	commentAuthor: String,
	commentText: { type: String, required: true },
	commentLikes: { type: Number, default: 0 },
	replies: [{ type: Schema.Types.ObjectId, ref: "Reply" }],
})

interface IPost {
	postCode: string
	title: string
	text: string
	authorUsername?: string
	category: string
	datePosted: Date
	comments: IComment[]
	likes: number
	views: number
	images?: string[]
	thumbnail?: string
}

const postSchema = new Schema({
	postCode: { type: String, required: true },
	title: { type: String, required: true },
	text: { type: String, required: true },
	authorUsername: String,
	category: { type: String, required: true },
	datePosted: { type: Date, required: true },
	comments: [commentSchema],
	likes: { type: Number, default: 0 },
	views: { type: Number, default: 0 },
	images: [{ type: String }],
	thumbnail: String,
})

interface IUser extends Document {
	username: string
	email: string
	passwordHash: string
	interests: string[]
	posts: IPost[]
	socials?: Social
	accountAge: Date
}

const userSchema = new Schema({
	username: { type: String, required: true },
	email: { type: String, required: true },
	// passwordHash: { type: String, required: true },
	// interests: [String],
	// posts: [{ type: Schema.Types.ObjectId, ref: "Post" }],
	// socials: {
	// 	github: { type: String },
	// 	linkedin: { type: String },
	// 	discord: { type: String },
	// 	telegram: { type: String },
	// 	instagram: { type: String },
	// 	facebook: { type: String },
	// },
	// accountAge: { type: Date, required: true, default: Date.now },
})

// Model Exports
const UserModel = mongoose.models.UserModel || mongoose.model("UserModel", userSchema)
const PostModel = mongoose.models.PostModel || mongoose.model("PostModel", postSchema)
const CommentModel = mongoose.models.CommentModel || mongoose.model("CommentModel", commentSchema)
const ReplyModel = mongoose.models.ReplyModel || mongoose.model("ReplyModel", replySchema)
const StatisticsModel = mongoose.models.StatisticsModel || mongoose.model("StatisticsModel", statsSchema)
// export default UserModel
export { UserModel, PostModel, CommentModel, ReplyModel, StatisticsModel }
