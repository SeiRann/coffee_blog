"use client"
import RegisterAccountForm from "../components/registerForm"

export default function Register() {
	return (
		<div className="w-full flex flex-col items-center">
			<RegisterAccountForm
				refetch={() => {
					console.log("refetch")
				}}
			/>
		</div>
	)
}
