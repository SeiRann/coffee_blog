"use client"
import { useAppSelector } from "../lib/hooks"
import { selectUser } from "../lib/features/user/userSlice"
import { Post } from "./BlogPost"
import { useForm } from "react-hook-form"
import { useMutation } from "@apollo/client"
import { CREATE_POST } from "../constants"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function CreatePost() {
	const user = useAppSelector(selectUser)
	const router = useRouter()
	const [createPost] = useMutation(CREATE_POST)

	const {
		register,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm<Post>()

	const onSubmit = async (data: any) => {
		const { title, text, category } = data || {}
		const author = user.username

		await createPost({
			variables: { input: { title, text, author, category } },
		})

		router.push("/")
	}

	return (
		<div className="flex flex-col w-2/3 items-left bg-slate-50 shadow-xl rounded-md p-4 mb-4">
			<h1 className="text-3xl">Create Post</h1>
			<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
				<input
					type="text"
					placeholder="Title"
					{...register("title", { required: true })}
					className="rounded-md border-2 p-2 w-60 focus:outline-none focus:border-yellow-900 focus:bg-yellow-200 "
				/>
				<input
					type="text"
					placeholder="Category"
					{...register("category", { required: true })}
					className="rounded-md border-2 p-2 w-60 focus:outline-none focus:border-yellow-900 focus:bg-yellow-200 "
				/>
				<textarea
					placeholder="Post Text..."
					{...register("text", { required: true })}
					className="rounded-md border-2 p-2 w-full min-h-64 focus:outline-none focus:border-yellow-900 focus:bg-yellow-200 "
				/>
				<div className="flex gap-4">
					<button className="bg-blue-500 w-32 text-white rounded-md p-1.5">Post</button>
					<Link href={"/"} className="bg-red-500 text-white rounded-md p-1.5">
						Cancel
					</Link>
				</div>
			</form>
		</div>
	)
}
