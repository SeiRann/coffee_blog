const resolvers = {
	Query: {
		users: async (_: any, __: any, context: { dataSources: { users: { getAllUsers: () => any } } }) => {
			try {
				return await context.dataSources.users.getAllUsers()
			} catch (err) {}
		},
	},
	Mutation: {
		createUser: async (_: any, { input }: any, context: any) => {
			try {
				const newUser = await context.dataSources.users.createUser({ input })
				return newUser
			} catch (err) {
				throw new Error("Failed to create user")
			}
		},
	},
}

export default resolvers
