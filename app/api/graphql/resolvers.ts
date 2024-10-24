/* eslint-disable @typescript-eslint/no-explicit-any */
const resolvers = {
	Query: {
		users: async (_: any, __: any, context: { dataSources: { users: { getAllUsers: () => any } } }) => {
			try {
				return await context.dataSources.users.getAllUsers()
			} catch (error) {
				throw new Error("Failed to fetch users" + error)
			}
		},
		user: async (_: any, { username }: any, context: any) => {
			try {
				return await context.dataSources.users.findOneWithUsername(username)
			} catch (error) {
				throw new Error(`Failed to fetch user with username: ${username}` + error)
			}
		},
		login: async (_: any, { input }: any, context: any) => {
			try {
				return await context.dataSources.users.login(input)
			} catch (err) {
				throw new Error("Failed login:" + err)
			}
		},
		posts: async (_: any, __: any, context: { dataSources: { posts: { getAllPosts: () => any } } }) => {
			try {
				return await context.dataSources.posts.getAllPosts()
			} catch (err) {
				throw new Error("Failed to create get posts" + err)
			}
		},
		post: async (_: any, { input }: any, context: any) => {
			try {
				return await context.dataSources.posts.getPost(input)
			} catch (err) {
				throw new Error("Failed to get Post " + err)
			}
		},
	},
	Mutation: {
		createUser: async (_: any, { input }: any, context: any) => {
			try {
				const newUser = await context.dataSources.users.createUser(input)
				return newUser
			} catch (error) {
				throw new Error("Failed to create user" + error)
			}
		},
		updateUser: async (_: any, { input }: any, context: any) => {
			try {
				return await context.dataSources.users.updateUser(input)
			} catch (error) {
				throw new Error("Failed to update user" + error)
			}
		},
		deleteUser: async (_: any, { id }: any, context: any) => {
			try {
				return await context.dataSources.users.deleteUser({ id })
			} catch (error) {
				throw new Error("Failed to delete user" + error)
			}
		},
		createPost: async (_: any, { input }: any, context: any) => {
			try {
				const newPost = await context.dataSources.posts.createPost(input)
				return newPost
			} catch (err) {
				throw new Error("Failed to create Post" + err)
			}
		},
	},
}

export default resolvers
