"use client"
import React from "react"
import { useQuery } from "@apollo/client"
import { FETCH_POST } from "@/app/constants"
import BlogPost from "@/app/components/BlogPost"
import { selectStatus, selectUser } from "@/app/lib/features/user/userSlice"
import { useAppSelector } from "@/app/lib/hooks"
import { useMutation } from "@apollo/client"

export default function PostPage({ params }: { params: { id: string } }) {
	const status = useAppSelector(selectStatus)
	const user = useAppSelector(selectUser)

	const { loading, data, error } = useQuery(FETCH_POST, {
		variables: {
			input: {
				postid: params.id,
			},
		},
	})

	if (status) {
		const viewedPosts = new Map(Object.entries(user.viewedPosts))

		if (viewedPosts.has(params.id)) {
			console.log("viewed")
		} else {
			console.log("not viewed")
		}
	}

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
