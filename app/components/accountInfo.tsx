"use client"
import React from "react"
import { selectUser, selectStatus } from "../lib/features/user/userSlice"
import { useAppSelector } from "../lib/hooks"
import { useRouter } from "next/navigation"
import { resetUser } from "../lib/features/user/userSlice"
import { useAppDispatch } from "../lib/hooks"
import { useMutation } from "@apollo/client"
import { DELETE_USER } from "../constants"
import Link from "next/link"

export default function AccountInfo() {
	const user = useAppSelector(selectUser)
	const router = useRouter()
	const status = useAppSelector(selectStatus)
	const dispatch = useAppDispatch()
	const [deleteAccount] = useMutation(DELETE_USER)

	if (!status) {
		router.push("/login")
	}

	const onLogOut = () => {
		dispatch(resetUser())
		router.push("/")
	}

	const onDelete = async () => {
		dispatch(resetUser())
		await deleteAccount({ variables: { id: user.id } })

		router.push("/")
	}

	return (
		<div className="flex flex-col w-2/3 bg-slate-50 shadow-xl rounded-md p-5">
			<h1 className="text-3xl">Account Info</h1>
			<p>Username: {user?.username}</p>
			<p>Email: {user?.email}</p>
			<p>Interests: {user?.interests}</p>
			<p>Posts: {user?.posts}</p>
			<div>
				<h1>Status:{status ? "true" : "false"}</h1>
			</div>
			<div className="flex flex-row gap-2">
				<button onClick={() => onDelete()} className="bg-red-500 text-white rounded-md p-1.5">
					Delete Account
				</button>
				<Link href={"/updateAccount"} className="bg-green-500 text-white rounded-md p-1.5">
					Update
				</Link>
				<button onClick={() => onLogOut()} className="bg-yellow-900 text-white rounded-md p-1.5">
					Log out
				</button>
			</div>
		</div>
	)
}
