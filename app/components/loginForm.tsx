"use client"
import { useForm } from "react-hook-form"
import { LOGIN_USER } from "../constants"
import { useLazyQuery } from "@apollo/client"
import { useEffect } from "react"
import { useAppDispatch } from "../lib/hooks"
import { setUser } from "../lib/features/user/userSlice"
import { redirect } from "next/navigation"

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

		// Trigger login with provided username and password
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
		<div>
			<form onSubmit={handleSubmit(onSubmit)}>
				<input type="text" placeholder="Username" {...register("username", { required: true })} />
				{errors.username && <p>Username is required</p>}
				<input type="password" placeholder="Password" {...register("password", { required: true })} />
				{errors.password && <p>Password is required</p>}
				<button type="submit">Login</button>
			</form>
			{loading && <p>Loading...</p>}
			{error && <p>Error: {error.message}</p>}
		</div>
	)
}
