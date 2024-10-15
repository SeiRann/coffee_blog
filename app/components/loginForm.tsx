import { useForm } from "react-hook-form"
import { LOGIN_USER } from "../constants"
import { useLazyQuery } from "@apollo/client"

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

	return (
		<div>
			<form onSubmit={handleSubmit(onSubmit)}>
				<input type="text" placeholder="Username" {...register("username", { required: true })} />
				<input type="password" placeholder="Password" {...register("password", { required: true })} />
				<button>Login</button>
			</form>
			{data && (
				<div>
					<h1>Welcome, {data.login.username}</h1>
					<p>With the email: {data.login.email}</p>
				</div>
			)}
		</div>
	)
}
