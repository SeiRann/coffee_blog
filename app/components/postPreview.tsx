"use client"
import { useRouter } from "next/navigation"
import React from "react"

export interface IPostPreview {
	__typename?: string
	title: string
	author: string
	dateCreated: Date
	likes: number
	dislikes: number
	category: string
	postid: string
}

export default function PostPreview(postPreview: IPostPreview) {
	const router = useRouter()

	const handleClick = () => {
		router.push("/posts/" + postPreview.postid)
	}

	return (
		<div
			onClick={() => handleClick()}
			className="flex justify-between shadow-yellow-900 shadow-sm first:rounded-t-md last:rounded-b-md border-b-yellow-900 w-full h-20 p-1.5"
		>
			<div>
				<div className="flex flex-row gap-2">
					<h3>Author: {postPreview.author}</h3>
					<h3>Category: {postPreview.category}</h3>
					<h3>
						Date Posted:
						{new Date(Number(postPreview.dateCreated)).toLocaleString("en-US", {
							year: "numeric",
							month: "numeric",
							day: "numeric",
							hour: "2-digit",
							minute: "2-digit",
						})}
					</h3>
				</div>
				<div>
					<h1 className="text-3xl">{postPreview.title}</h1>
				</div>
			</div>
			<div className="flex flex-col">
				<div className="flex h-1/2 justify-end">
					<h1 className="text-gray-500">{postPreview.postid}</h1>
				</div>
				<div className="flex h-1/2 gap-3">
					<h1>Likes:{postPreview.likes}</h1>
					<h1>Dislikes:{postPreview.dislikes}</h1>
				</div>
			</div>
		</div>
	)
}
