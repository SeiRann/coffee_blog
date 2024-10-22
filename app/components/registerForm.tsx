"use client"
import React from "react"
import { useMutation } from "@apollo/client"
import { CREATE_USER } from "../constants"
import { useForm } from "react-hook-form"
import Link from "next/link"

type inputs = {
	username: string
	email: string
	password: string
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function RegisterAccountForm({ refetch }: any) {
	const [createUser] = useMutation(CREATE_USER)
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<inputs>()

	const onSubmit = async (data: inputs) => {
		const { username, email, password } = data || {}

		await createUser({
			variables: { input: { username, email, password } },
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
					{...register("password", { required: true })}
				/>
				{errors.password && <span>This field is required</span>}
				<div className="flex flex-row gap-6 justify-center items-center">
					<Link
						href={"/login"}
						className="flex align-middle items-center justify-center text-blue-400 bg-white border-2 rounded-md w-28 h-11"
					>
						Login
					</Link>
					<button type="submit" className="bg-blue-400 text-white rounded-md w-28 h-11">
						Register
					</button>
				</div>
			</form>
		</div>
	)
}
