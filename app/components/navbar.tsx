import Image from "next/image"
import Link from "next/link"

export default function Navbar() {
	return (
		<div className="flex flex-col justify-center items-center">
			<div
				id="Navbar"
				className="flex flex-col gap-10 border-b-2 w-2/3 border-yellow-900"
			>
				<div
					id="NavBarTitle"
					className="flex items-center justify-center mt-5 gap-10"
				>
					<Image
						src="/logo.png"
						alt="Coffee Logo"
						height={128}
						width={128}
					/>
					<h1 className="text-7xl">Coffee Blog</h1>
				</div>
				<div
					id="NavBarButtons"
					className="flex flex-row gap-10 justify-around m-2 font-semibold"
				>
					<Link
						href="/"
						className="duration-200 hover:text-yellow-800"
					>
						Home
					</Link>
					<Link
						href="/cofi"
						className="duration-200 hover:text-yellow-800"
					>
						Coffee
					</Link>
					<Link
						href="/ket"
						className="duration-200 hover:text-yellow-800"
					>
						Cats
					</Link>
					<Link
						href="/cookie"
						className="duration-200 hover:text-yellow-800"
					>
						Cookies
					</Link>
				</div>
			</div>
		</div>
	)
}
