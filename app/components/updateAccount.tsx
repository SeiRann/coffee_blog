"use client"
import { useAppSelector } from "../lib/hooks"
import { selectUser } from "../lib/features/user/userSlice"
import Link from "next/link"

export default function UpdateForm() {
	const user = useAppSelector(selectUser)

	return (
		<div className="w-2/3">
			<form className=" bg-slate-50 shadow-xl rounded-md gap-5 items-left p-4">
				<h1 className="text-3xl">Update Account</h1>
				<div className="flex flex-col w-1/4 gap-3 p-2">
					<input
						type="text"
						placeholder="Username"
						defaultValue={user?.username}
						className="rounded-md border-2 p-2 w-60 focus:outline-none focus:border-yellow-900 focus:bg-yellow-200"
					/>
					<input
						type="text"
						placeholder="Email"
						defaultValue={user?.email}
						className="rounded-md border-2 p-2 w-60 focus:outline-none focus:border-yellow-900 focus:bg-yellow-200"
					/>
					<input
						type="password"
						placeholder="New Password"
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
