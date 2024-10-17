// MongoDB Data Source for Users
import { UserModel, PostModel } from "../models"
import { MongoDataSource } from "apollo-datasource-mongodb"
import { ObjectId } from "mongodb"
import { hash, compare } from "bcrypt"
import generatePostCode from "../serverFunctions/postCodeGen"

interface UserDocument {
	_id: ObjectId
	username: string
	password: string
	email: string
	interests: [string]
	socials: [
		{
			github: string
			linkedin: string
			discord: string
			telegram: string
			instagram: string
			facebook: string
		}
	]
	dateCreated: Date
}

interface PostDocument {
	_id: ObjectId
	postid: string
	title: string
	text: string
	author: string
	category: string
	dateCreated: Date
}

export class Users extends MongoDataSource<UserDocument> {
	async getAllUsers() {
		try {
			return await UserModel.find()
		} catch (error) {
			throw new Error("Failed to fetch users" + error)
		}
	}

	async findOne(input: string) {
		try {
			return await UserModel.findOne({ username: input })
		} catch (error) {
			throw new Error("Failed to find user: " + error)
		}
	}

	async login(input: any) {
		try {
			const user = await this.findOne(input.username)
			if (user != null) {
				if (await compare(input.password, user.passwordHash)) {
					return user
				} else {
					return null
				}
			}
		} catch (err) {
			throw new Error("Failed to login" + err)
		}
	}

	// Function to create a new user
	async createUser({ input }: any) {
		try {
			const passwordHash = await hash(input.passwordHash, 10)
			input.passwordHash = passwordHash

			return await UserModel.create({ ...input })
		} catch (error) {
			throw new Error("Failed to create user")
		}
	}

	// Function to update existing user
	async updateUser({ input }: any) {
		try {
			const updatedUser = await UserModel.findByIdAndUpdate(
				input.id,
				{ ...input },
				{
					new: true,
				}
			)
			return updatedUser
		} catch (error) {
			throw new Error("Failed to update user")
		}
	}

	// Function to delete existing user
	async deleteUser({ id }: { id: string }): Promise<string> {
		try {
			await UserModel.findByIdAndDelete(id)
			return "User deleted successfully"
		} catch (error) {
			throw new Error("Failed to delete user")
		}
	}
}

export class Posts extends MongoDataSource<PostDocument> {
	async getAllPosts() {
		try {
			return await PostModel.find()
		} catch (err) {
			throw new Error("Failed to find posts" + err)
		}
	}

	async createPost({ input }: any) {
		try {
			const postid = generatePostCode(6)
			input.postid = postid

			const post = await PostModel.create({ ...input })
			return post
		} catch (err) {
			throw new Error("Failed to create post" + err)
		}
	}
}
