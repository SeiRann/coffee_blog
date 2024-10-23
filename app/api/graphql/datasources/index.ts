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

interface loginInput {
	username: string
	password: string
}

interface createUserInput {
	username: string
	password: string
	email: string
}

interface updateUserInput extends createUserInput {
	id: string
}

// interface socials {
// 	github: string
// 	linkedin: string
// 	discord: string
// 	telegram: string
// 	instagram: string
// 	facebook: string
// }

interface postInput {
	title: string
	text: string
	authorid: string
	category: string
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

	async findOneWithUsername(input: string) {
		try {
			return await UserModel.findOne({ username: input })
		} catch (error) {
			throw new Error("Failed to find user: " + error)
		}
	}

	async login(input: loginInput) {
		try {
			const user = await this.findOneWithUsername(input.username)
			if (user != null) {
				if (await compare(input.password, user.password)) {
					return user
				} else {
					return null
				}
			}
		} catch (err) {
			throw new Error("Failed to login " + err)
		}
	}

	// Function to create a new user
	async createUser(input: createUserInput) {
		try {
			const password = await hash(input.password, 10)
			input.password = password

			return await UserModel.create({ ...input })
		} catch (error) {
			throw new Error("Failed to create user" + error)
		}
	}

	// Function to update existing user
	async updateUser(input: updateUserInput) {
		try {
			const password = await hash(input.password, 10)
			input.password = password
			const updatedUser = await UserModel.findByIdAndUpdate(
				input.id,
				{ ...input },
				{
					new: true,
				}
			)
			return updatedUser
		} catch (error) {
			throw new Error("Failed to update user" + error)
		}
	}

	// Function to delete existing user
	async deleteUser({ id }: { id: string }): Promise<string> {
		try {
			await UserModel.findByIdAndDelete(id)
			return "User deleted successfully"
		} catch (error) {
			throw new Error("Failed to delete user" + error)
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

	async createPost(input: postInput) {
		try {
			const { authorid, ...importantInfo } = input
			const user = await UserModel.findById(authorid)
			const author = user.username
			const postid = generatePostCode(6)
			const dateCreated = Date.now()

			const newPost = await PostModel.create({ ...importantInfo, author, postid, dateCreated })

			await UserModel.findByIdAndUpdate(authorid, { posts: [...user.posts, postid] }, { new: true })

			return newPost
		} catch (err) {
			throw new Error("Failed to create post" + err)
		}
	}
}
