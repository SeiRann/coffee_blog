"use client"
import React from "react"
import { useQuery } from "@apollo/client"
import { FETCH_POST } from "@/app/constants"
import BlogPost from "@/app/components/BlogPost"

export default function PostPage({ params }: { params: { id: string } }) {
	const { loading, data, error } = useQuery(FETCH_POST, {
		variables: {
			input: {
				postid: params.id,
			},
		},
	})

	console.log(params.id)
	return (
		<div className="flex items-center justify-center">
			{loading && <p>loading...</p>}
			{error && <p>{error.message}</p>}
			{/* <p>{JSON.stringify(data?.post)}</p> */}
			<div className="w-2/3">
				<BlogPost {...data?.post} />
			</div>
		</div>
	)
}
