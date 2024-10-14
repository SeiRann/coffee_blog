"use client"
import AccountForm from "../components/accountForm"

export default function Home() {
	return (
		<div>
			<AccountForm
				refetch={() => {
					console.log("refetch")
				}}
			/>
		</div>
	)
}
