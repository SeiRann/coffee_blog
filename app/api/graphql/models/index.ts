import mongoose, { Schema, Document } from "mongoose"

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

interface IStatistics extends Document {
	totalPosts: number
	totalAccounts: number
	totalComments: number
	totalLikes: number
	onlineUsers: number
	mostVisitedCategory: string
}

const statsSchema = new Schema<IStatistics>({
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

const replySchema = new Schema<IReply>({
	commentCode: { type: String, required: true },
	commentAuthor: String,
	commentText: { type: String, required: true },
	commentLikes: { type: Number, default: 0 },
	replies: [{ type: Schema.Types.ObjectId, ref: "Reply" }],
})

interface IComment extends GeneralComment {
	postCode: string
	replies: IReply[]
}

const commentSchema = new Schema<IComment>({
	postCode: { type: String, required: true },
	commentAuthor: String,
	commentText: { type: String, required: true },
	commentLikes: { type: Number, default: 0 },
	replies: [{ type: Schema.Types.ObjectId, ref: "Reply" }],
})

interface IPost extends Document {
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

const postSchema = new Schema<IPost>({
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

const userSchema = new Schema<IUser>({
	username: { type: String, required: true },
	email: { type: String, required: true },
	passwordHash: { type: String, required: true },
	interests: [String],
	posts: [{ type: Schema.Types.ObjectId, ref: "Post" }],
	socials: {
		github: { type: String },
		linkedin: { type: String },
		discord: { type: String },
		telegram: { type: String },
		instagram: { type: String },
		facebook: { type: String },
	},
	accountAge: { type: Date, required: true },
})

const UserModel = mongoose.model<IUser>("User", userSchema)
const PostModel = mongoose.model<IPost>("Post", postSchema)
const CommentModel = mongoose.model<IComment>("Comment", commentSchema)
const ReplyModel = mongoose.model<IReply>("Reply", replySchema)
const StatisticsModel = mongoose.model<IStatistics>("Statistics", statsSchema)

export { UserModel, PostModel, CommentModel, ReplyModel, StatisticsModel }
