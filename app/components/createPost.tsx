"use client"
import { useAppSelector } from "../lib/hooks"
import { selectUser } from "../lib/features/user/userSlice"
import { Post } from "./BlogPost"
import { useForm } from "react-hook-form"

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
		const dateCreated = Date.now()

		await createPost({
			variables: { input: { title, text, author, category, dateCreated } },
		})
	}

	return (
		<div className="flex flex-col w-2/3 items-center bg-slate-50 shadow-xl rounded-md">
			<h1 className="text-3xl">Create Post</h1>
			<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
				<input type="text" placeholder="Title" />
				<input type="text" placeholder="Post Text..." />
				<input type="text" placeholder="Category" />
				<button>Post</button>
			</form>
		</div>
	)
}
