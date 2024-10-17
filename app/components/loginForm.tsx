"use client"
import { useForm } from "react-hook-form"
import { LOGIN_USER } from "../constants"
import { useLazyQuery } from "@apollo/client"
import { useEffect } from "react"
import { useAppDispatch } from "../lib/hooks"
import { setUser } from "../lib/features/user/userSlice"
import { redirect } from "next/navigation"
import Link from "next/link"

type Inputs = {
	username: string
	password: string
}

export default function LoginAccountForm() {
	const dispatch = useAppDispatch()
	const [loginUser, { loading, data, error }] = useLazyQuery(LOGIN_USER)
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Inputs>()

	const onSubmit = async (formData: Inputs) => {
		const { username, password } = formData || {}

		await loginUser({
			variables: {
				input: {
					username,
					password,
				},
			},
		})
	}

	// This effect listens for the result of the login query
	useEffect(() => {
		if (data?.login) {
			const { __typename, ...filteredLoginData } = data.login
			dispatch(setUser(filteredLoginData))

			redirect("/account")
		}
	}, [data, dispatch])

	return (
		<div className="flex flex-col items-center justify-center w-2/3 h-72 bg-slate-50 shadow-xl rounded-md p-4">
			<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center justify-center gap-3">
				{loading && <p>Loading...</p>}
				{error && <p>Error: {error.message}</p>}
				<h1 className="text-3xl">Login</h1>
				<input
					type="text"
					placeholder="Username"
					{...register("username", { required: true })}
					className="rounded-md border-2 p-2 w-60 focus:outline-none focus:border-yellow-900 focus:bg-yellow-200 "
				/>
				{errors.username && <p>Username is required</p>}
				<input
					type="password"
					placeholder="Password"
					{...register("password", { required: true })}
					className="rounded-md border-2 p-2 w-60 focus:outline-none focus:border-yellow-900 focus:bg-yellow-200 "
				/>
				{errors.password && <p>Password is required</p>}
				<div className="flex flex-row gap-6 justify-center items-center">
					<Link
						href={"/register"}
						className="flex align-middle items-center justify-center text-blue-400 bg-white border-2 rounded-md w-28 h-11"
					>
						Register
					</Link>
					<button type="submit" className="bg-blue-400 text-white rounded-md w-28 h-11">
						Login
					</button>
				</div>
			</form>
		</div>
	)
}
