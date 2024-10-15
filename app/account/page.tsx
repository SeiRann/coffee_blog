"use client"
export default function Account() {
	const userString = localStorage.getItem("user")

	// Parse the user data from JSON string to JavaScript object
	const user = userString ? JSON.parse(userString) : null
	return (
		<div>
			<h1>Account Info</h1>
			<p>Username: {user?.username}</p>
			<p>Email: {user?.email}</p>
			<p>Interests: {user?.interests}</p>
			<p>Posts: {user?.posts}</p>
		</div>
	)
}
