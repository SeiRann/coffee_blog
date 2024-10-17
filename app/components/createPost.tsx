"use client"
import { useAppSelector } from "../lib/hooks"
import { selectUser } from "../lib/features/user/userSlice"
import { Post } from "./BlogPost"
import { useForm } from "react-hook-form"
import { useMutation } from "@apollo/client"
import { CREATE_POST } from "../constants"

export default function CreatePost() {
	const user = useAppSelector(selectUser)
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
	}

	return (
		<div className="flex flex-col w-2/3 items-center bg-slate-50 shadow-xl rounded-md">
			<h1 className="text-3xl">Create Post</h1>
			<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
				<input type="text" placeholder="Title" {...register("title", { required: true })} />
				<input type="text" placeholder="Post Text..." {...register("text", { required: true })} />
				<input type="text" placeholder="Category" {...register("category", { required: true })} />
				<button>Post</button>
			</form>
		</div>
	)
}
