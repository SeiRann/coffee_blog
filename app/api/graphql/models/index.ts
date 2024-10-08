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

interface IPostComment extends GeneralComment {
	postCode: string
	replies: IReply[]
}

const commentPostSchema = new Schema<IPostComment>({
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
	comments: IPostComment[]
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
	comments: [commentPostSchema],
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

const User = mongoose.model<IUser>("User", userSchema)
const Post = mongoose.model<IPost>("Post", postSchema)
const PostComment = mongoose.model<IPostComment>("Comment", commentPostSchema)
const Reply = mongoose.model<IReply>("Reply", replySchema)

export { User, Post, PostComment, Reply }
