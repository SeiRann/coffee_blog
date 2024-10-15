"use client"
import { useMutation } from "@apollo/client"
import { CREATE_USER } from "../constants"
import { useForm } from "react-hook-form"

type inputs = {
	username: String
	email: String
	passwordHash: String
}

export default function RegisterAccountForm({ refetch }: any) {
	const [createUser] = useMutation(CREATE_USER)
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<inputs>()

	const onSubmit = async (data: any) => {
		const { username, email, passwordHash } = data || {}

		await createUser({
			variables: { input: { username, email, passwordHash } },
		})
		refetch()
		reset()
	}

	return (
		<div className="flex flex-col w-2/3 rounded border items-center justify-center shadow-2xl p-5">
			<form onSubmit={handleSubmit(onSubmit)} className="w-1/4 h-1/4 flex flex-col items-center gap-5">
				<h1 className="text-3xl">Create User</h1>
				<input
					className="rounded-md border-2 p-2 w-60 focus:outline-none focus:border-yellow-900 focus:bg-yellow-200"
					type="text"
					placeholder="Username"
					{...register("username", { required: true })}
				/>
				<input
					className="rounded-md border-2 p-2 w-60 focus:outline-none focus:border-yellow-900 focus:bg-yellow-200"
					type="text"
					placeholder="Email"
					{...register("email", { required: true })}
				/>
				<input
					className="rounded-md border-2 p-2 w-60 focus:outline-none focus:border-yellow-900 focus:bg-yellow-200"
					type="password"
					placeholder="Password"
					{...register("passwordHash", { required: true })}
				/>
				{errors.email && <span>This field is required</span>}
				<button className="bg-teal-500 text-white rounded-md border-2 w-48 p-1.5">Submit</button>
			</form>
		</div>
	)
}
