const resolvers = {
	Query: {
		users: async (_: any, __: any, context: { dataSources: { users: { getAllUsers: () => any } } }) => {
			try {
				return await context.dataSources.users.getAllUsers()
			} catch (error) {
				throw new Error("Failed to fetch users")
			}
		},
		user: async (_: any, { username }: any, context: any) => {
			try {
				return await context.dataSources.users.findOne(username)
			} catch (error) {
				throw new Error(`Failed to fetch user with username: ${username}`)
			}
		},
		login: async (_: any, { input }: any, context: any) => {
			try {
				return await context.dataSources.users.login(input)
			} catch (err) {
				throw new Error("Failed login:" + err)
			}
		},
	},
	Mutation: {
		createUser: async (_: any, { input }: any, context: any) => {
			try {
				const newUser = await context.dataSources.users.createUser({
					input,
				})
				return newUser
			} catch (error) {
				throw new Error("Failed to create user")
			}
		},
		updateUser: async (_: any, { input }: any, context: any) => {
			try {
				return await context.dataSources.users.updateUser({ input })
			} catch (error) {
				throw new Error("Failed to update user")
			}
		},
		deleteUser: async (_: any, { id }: any, context: any) => {
			try {
				return await context.dataSources.users.deleteUser({ id })
			} catch (error) {
				throw new Error("Failed to delete user")
			}
		},
	},
}

export default resolvers
