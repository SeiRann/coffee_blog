"use client"
import React from "react"
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
	password: string
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
		}
	})

	const onSubmit = async (data: inputs) => {
		try {
			const { username, email, password } = data || {}
			const id = user.id

			const updatedUser = await updateUser({
				variables: { input: { id, username, email, password } },
			})

			// console.log(updatedUser.data.updateUser)

			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const { __typename, ...filteredUser } = updatedUser.data.updateUser

			dispatch(setUser(filteredUser))
		} catch (err) {
			reset()
			throw new Error("Failed to update user" + err)
		} finally {
			reset()
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
					{errors.username ? <p>Username error</p> : <></>}
					<input
						type="text"
						placeholder="Email"
						defaultValue={user?.email}
						{...register("email", { required: true })}
						className="rounded-md border-2 p-2 w-60 focus:outline-none focus:border-yellow-900 focus:bg-yellow-200"
					/>
					{errors.email ? <p>Email error</p> : <></>}
					<input
						type="password"
						placeholder="New Password"
						{...register("password", { required: true })}
						className="rounded-md border-2 p-2 w-60 focus:outline-none focus:border-yellow-900 focus:bg-yellow-200"
					/>
					{errors.password ? <p>Password error</p> : <></>}
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
