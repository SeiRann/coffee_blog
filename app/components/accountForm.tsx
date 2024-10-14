"use client"
import { useMutation } from "@apollo/client"
import { CREATE_USER } from "../constants"
import { useForm } from "react-hook-form"

type inputs = {
	username: String
	email: String
}

export default function AccountForm({ refetch }: any) {
	const [createUser] = useMutation(CREATE_USER)
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isSubmitting },
	} = useForm<inputs>()

	const onSubmit = async (data: any) => {
		const { username, email } = data || {}

		await createUser({
			variables: { input: { username, email } },
		})
		refetch()
		reset()
	}

	return (
		<div className="flex flex-col justify-center items-center bg-slate-500">
			<form onSubmit={handleSubmit(onSubmit)} className="w-1/4 h-1/4 flex flex-col">
				<input type="text" placeholder="Username" defaultValue={"user"} {...register("username")} />
				<input
					type="text"
					placeholder="Email"
					defaultValue={"email"}
					{...register("email", { required: true })}
				/>
				{errors.email && <span>This field is required</span>}
				<button>Submit</button>
			</form>
		</div>
	)
}
