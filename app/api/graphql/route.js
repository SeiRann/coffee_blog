/* eslint-disable */
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
	resolvers,
	typeDefs,
})

const handler =
	startServerAndCreateNextHandler <
	NextRequest >
	(server,
	{
		context: async (req, res) => ({
			req,
			res,
			dataSources: {
				users: new Users({ modelOrCollection: UserModel }),
				posts: new Posts({ modelOrCollection: PostModel }),
			},
		}),
	})
export async function GET(request) {
	return handler(request)
}
export async function POST(request) {
	return handler(request)
}
