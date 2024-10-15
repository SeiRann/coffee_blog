"use client"
import { useForm } from "react-hook-form"
import { LOGIN_USER } from "../constants"
import { useLazyQuery } from "@apollo/client"
import { useEffect } from "react"

type inputs = {
	username: string
	password: string
}

export default function LoginAccountForm() {
	const [loginUser, { loading, data, error }] = useLazyQuery(LOGIN_USER)
	const {
		register,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm<inputs>()

	const onSubmit = async (data: any) => {
		const { username, password } = data || {}

		await loginUser({
			variables: {
				input: {
					username,
					password,
				},
			},
		})
	}

	useEffect(() => {
		if (data?.login != null) {
			localStorage.setItem("user", JSON.stringify(data.login))
		}
	}, [data])

	return (
		<div>
			<form onSubmit={handleSubmit(onSubmit)}>
				<input type="text" placeholder="Username" {...register("username", { required: true })} />
				<input type="password" placeholder="Password" {...register("password", { required: true })} />
				<button>Login</button>
			</form>
		</div>
	)
}
