"use client"
import { useAppSelector, useAppDispatch } from "../lib/hooks"
import { selectStatus, selectUser, setUser } from "../lib/features/user/userSlice"
import Link from "next/link"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { useMutation } from "@apollo/client"
import { UPDATE_USER } from "../constants"

type inputs = {
	username: string
	email: string
	passwordHash: string
}

export default function UpdateForm() {
	const user = useAppSelector(selectUser)
	const status = useAppSelector(selectStatus)
	const router = useRouter()
	const dispatch = useAppDispatch()
	const [updateUser] = useMutation(UPDATE_USER)

	const {
		register,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm<inputs>()

	useEffect(() => {
		if (!status) {
			router.push("/login")
		} else {
		}
	})

	const onSubmit = async (data: any) => {
		try {
			const { username, email, passwordHash } = data || {}
			const id = user.id

			const updatedUser = await updateUser({
				variables: { input: { id, username, email, passwordHash } },
			})

			// console.log(updatedUser.data.updateUser)

			const { __typename, ...filteredUser } = updatedUser.data.updateUser

			dispatch(setUser(filteredUser))
		} catch (err) {
			throw new Error("Failed to update user")
		} finally {
			router.push("/account")
		}
	}

	return (
		<div className="w-2/3">
			<form onSubmit={handleSubmit(onSubmit)} className=" bg-slate-50 shadow-xl rounded-md gap-5 items-left p-4">
				<h1 className="text-3xl">Update Account</h1>
				<div className="flex flex-col w-1/4 gap-3 p-2">
					<input
						type="text"
						placeholder="Username"
						defaultValue={user?.username}
						{...register("username", { required: true })}
						className="rounded-md border-2 p-2 w-60 focus:outline-none focus:border-yellow-900 focus:bg-yellow-200"
					/>
					<input
						type="text"
						placeholder="Email"
						defaultValue={user?.email}
						{...register("email", { required: true })}
						className="rounded-md border-2 p-2 w-60 focus:outline-none focus:border-yellow-900 focus:bg-yellow-200"
					/>
					<input
						type="password"
						placeholder="New Password"
						{...register("passwordHash", { required: true })}
						className="rounded-md border-2 p-2 w-60 focus:outline-none focus:border-yellow-900 focus:bg-yellow-200"
					/>
				</div>
				<div className="flex gap-3 items-center">
					<button className="bg-blue-500 text-white rounded-md p-1.5">Update</button>
					<Link href={"/account"} className="bg-red-500 text-white rounded-md p-1.5">
						Cancel
					</Link>
				</div>
			</form>
		</div>
	)
}
