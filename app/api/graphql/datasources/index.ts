// MongoDB Data Source for Users
// import { UserModel } from "../models"
import { UserModel, PostModel, CommentModel, ReplyModel, StatisticsModel } from "../models"
import { MongoDataSource } from "apollo-datasource-mongodb"

// interface UserDocument {
// 	_id: ObjectId
// 	username: string
// 	password: string
// 	email: string
// 	interests: [string]
// }

interface Social {
	github?: string
	linkedin?: string
	discord?: string
	telegram?: string
	instagram?: string
	facebook?: string
}

interface UserDocument {
	username: string
	email: string
	passwordHash: string
	interests: string[]
	posts: PostDocument[]
	socials: Social
	accountAge: Date
}
interface PostDocument {
	postCode: string
	title: string
	text: string
	authorUsername?: string
	category: string
	datePosted: Date
	comments: CommentDocument[]
	likes: number
	views: number
	images?: string[]
	thumbnail?: string
}

interface ReplyDocument {
	commentCode: string
	commentAuthor?: string
	commentText: string
	commentLikes: number
	replies: this[]
}

interface CommentDocument {
	postCode: string
	commentAuthor?: string
	commentText: string
	commentLikes: number
	replies: ReplyDocument[]
}

interface StatsDocument {
	totalPosts: number
	totalAccounts: number
	totalComments: number
	totalLikes: number
	onlineUsers: number
	mostVisitedCategory: string
}

export default class Users extends MongoDataSource<UserDocument> {
	async getAllUsers() {
		try {
			return await UserModel.find()
		} catch (err) {
			throw new Error("Failed to fetch users")
		}
	}

	async createUser({ input }: any) {
		try {
			return await UserModel.create({ ...input })
		} catch (err) {
			throw new Error("Failed to create user:" + err)
		}
	}

	async updateUser({ input }: any) {
		try {
			const updatedUser = await UserModel.findById(
				input.id,
				{ ...input },
				{
					new: true,
				}
			)
			return updatedUser
		} catch (err) {
			throw new Error("Failed to update user")
		}
	}

	async deleteUser({ id }: { id: string }): Promise<string> {
		try {
			await UserModel.findByIdAndDelete(id)
			return "User deleted successfully"
		} catch (err) {
			throw new Error("Failed to delete user")
		}
	}
}
export class Posts extends MongoDataSource<PostDocument> {}
export class Comments extends MongoDataSource<CommentDocument> {}
export class Replies extends MongoDataSource<ReplyDocument> {}
export class Statistics extends MongoDataSource<StatsDocument> {}
