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
	viewedPosts: JSON
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

interface addViewedPostInput {
	id: string
	viewedPost: {
		postid: string
		value: string
	}
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

interface getPostInput {
	postid: string
}

interface interactionInput {
	postid: string
	interactionType: string
}

interface PostDocument {
	_id: ObjectId
	postid: string
	title: string
	text: string
	author: string
	category: string
	dateCreated: Date
	likes: number
	dislikes: number
	views: number
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

	async addViewedPost(input: addViewedPostInput) {
		try {
			const user = await UserModel.findById(input.id)
			// console.log(input.viewedPost.value)
			user.viewedPosts.set(input.viewedPost.postid, input.viewedPost.value)
			const updatedUser = await UserModel.findByIdAndUpdate(input.id, { ...user }, { new: true })
			return updatedUser
		} catch (err) {
			throw new Error("Failed to add viewedPost " + err)
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

	async getPost(input: getPostInput) {
		try {
			return await PostModel.findOne({ postid: input.postid })
		} catch (err) {
			console.log("Couldn't get post" + err)
		}
	}

	async addInteraction(input: interactionInput) {
		try {
			const post = await PostModel.findOne({ postid: input.postid })
			switch (input.interactionType) {
				case "V":
					post.views += 1
					return await PostModel.findByIdAndUpdate(post.id, { ...post }, { new: true })
				case "D":
					post.dislikes += 1
					return await PostModel.findByIdAndUpdate(post.id, { ...post }, { new: true })
				case "L":
					post.likes += 1
					return await PostModel.findByIdAndUpdate(post.id, { ...post }, { new: true })
			}
		} catch (err) {
			throw new Error("Failed to add interaction " + err)
		}
	}

	async removeInteraction(input: interactionInput) {
		try {
			const post = await PostModel.findOne({ postid: input.postid })
			switch (input.interactionType) {
				case "V":
					if (post.views > 0) {
						post.views -= 1
						return await PostModel.findByIdAndUpdate(post.id, { ...post }, { new: true })
					} else {
						throw new Error("Cannot subtract from 0 views")
					}
				case "D":
					if (post.dislikes > 0) {
						post.dislikes -= 1
						return await PostModel.findByIdAndUpdate(post.id, { ...post }, { new: true })
					} else {
						throw new Error("Cannot subtract from 0 dislikes")
					}
				case "L":
					if (post.likes > 0) {
						post.likes -= 1
						return await PostModel.findByIdAndUpdate(post.id, { ...post }, { new: true })
					} else {
						throw new Error("Cannot subtract from 0 likes")
					}
			}
		} catch (err) {
			throw new Error("Failed to add interaction " + err)
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
