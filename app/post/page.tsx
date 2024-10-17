"use client"
import { useEffect } from "react"
import { selectStatus } from "../lib/features/user/userSlice"
import { useAppSelector } from "../lib/hooks"
import { useRouter } from "next/navigation"
import CreatePost from "../components/createPost"

export default function Post() {
	const router = useRouter()
	const status = useAppSelector(selectStatus)

	useEffect(() => {
		if (!status) {
			router.push("/login")
		}
	})

	return (
		<div className="flex flex-col items-center">
			<CreatePost />
		</div>
	)
}
