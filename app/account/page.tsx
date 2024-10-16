"use client"
import { selectUser, selectStatus } from "../lib/features/user/userSlice"
import { useAppSelector } from "../lib/hooks"

export default function Account() {
	const user = useAppSelector(selectUser)
	const status = useAppSelector(selectStatus)

	if (status) {
	}
	return (
		<div>
			<h1>Account Info</h1>
			<p>Username: {user?.username}</p>
			<p>Email: {user?.email}</p>
			<p>Interests: {user?.interests}</p> {/* Convert array to string */}
			<p>Posts: {user?.posts}</p> {/* Convert array to string */}
			<div>
				<h1>Status:{status}</h1>
			</div>
		</div>
	)
}
