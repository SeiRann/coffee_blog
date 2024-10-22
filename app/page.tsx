"use client"
import BlogPost from "./components/BlogPost"
import { useQuery } from "@apollo/client"
import { FETCH_POSTS } from "./constants"
import { useEffect } from "react"

interface Post {
	__typename: string
	postid: string
	title: string
	text: string
	author: string
	category: string
	dateCreated: Date
}

export default function Home() {
	const { loading, data, error, refetch } = useQuery(FETCH_POSTS)

	useEffect(() => {
		console.log(data)
	}, [data])

	return (
		<div id="FeedWrapper" className="flex flex-col items-center">
			<div
				id="Feed"
				className="flex flex-col border-t-2 border-t-yellow-900 w-3/4 shadow-2xl drop-shadow-2xl rounded-xl"
			>
				{data?.posts?.map((post: Post) => {
					return <BlogPost {...post} />
				})}
			</div>
		</div>
	)
}
