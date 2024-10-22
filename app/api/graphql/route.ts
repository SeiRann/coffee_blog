/* eslint-disable @typescript-eslint/no-explicit-any, no-unused-vars */

import { startServerAndCreateNextHandler } from "@as-integrations/next"
import mongoose from "mongoose"
import { ApolloServer } from "@apollo/server"
import { NextRequest } from "next/server"
import typeDefs from "./schema"
import resolvers from "./resolvers"
import { Users, Posts } from "./datasources"
import { UserModel, PostModel } from "./models"

const uri = process.env.MONGODB_URI

const connectDB = async () => {
	try {
		if (uri) {
			await mongoose.connect(uri)
			console.log("🎉 connected to database successfully")
		}
	} catch (error) {
		console.error(error)
	}
}
connectDB()

const server = new ApolloServer({
	resolvers: resolvers as any,
	typeDefs: typeDefs as any,
})

const handler = startServerAndCreateNextHandler<NextRequest>(server, {
	context: async (req, res) => ({
		req,
		res,
		dataSources: {
			users: new Users({ modelOrCollection: UserModel as any }),
			posts: new Posts({ modelOrCollection: PostModel as any }),
		},
	}),
})
export async function GET(request: NextRequest) {
	return handler(request)
}
export async function POST(request: NextRequest) {
	return handler(request)
}
