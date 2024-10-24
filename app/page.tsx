"use client"
import React from "react"
// import BlogPost from "./components/BlogPost"
import PostPreview from "./components/postPreview"
import { IPostPreview } from "./components/postPreview"
import { useQuery } from "@apollo/client"
import { FETCH_POSTS_PREVIEWS } from "./constants"
// import { useEffect } from "react"

// const examplePostPreview: IPostPreview = {
// 	title: "Test Very Long Title For Reference",
// 	author: "test",
// 	dateCreated: new Date(),
// 	likes: 99,
// 	dislikes: 99,
// 	category: "test",
// 	postid: "CODEEE",
// }

export default function Home() {
	const { loading, data, error, refetch } = useQuery(FETCH_POSTS_PREVIEWS)

	refetch()

	return (
		<div id="FeedWrapper" className="flex flex-col items-center">
			<header className="p-3 w-2/3">
				<h1 className="text-4xl">Feed</h1>
			</header>
			{loading && <p>Loading...</p>}
			{error && <p>Error: {error.message}</p>}
			<div
				id="Feed"
				className="flex flex-col border-t-2 border-b-2 border-t-yellow-900 border-b-yellow-900 w-3/4 rounded-md shadow-xl"
			>
				{data?.posts?.map((post: IPostPreview) => {
					return <PostPreview {...post} key={post.postid} />
				})}
			</div>
		</div>
	)
}
