"use client"
import React from "react"
import { useEffect } from "react"
import { selectUser, selectStatus } from "../lib/features/user/userSlice"
import { useAppSelector } from "../lib/hooks"
import { redirect } from "next/navigation"
import Link from "next/link"

export default function AccountInfo() {
	const user = useAppSelector(selectUser)
	const status = useAppSelector(selectStatus)

	useEffect(() => {
		if (!status) {
			redirect("/login")
		}
	})

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
				<button className="bg-red-500 text-white rounded-md p-1.5">Delete Account</button>
				<Link href={"/updateAccount"} className="bg-green-500 text-white rounded-md p-1.5">
					Update
				</Link>
			</div>
		</div>
	)
}
