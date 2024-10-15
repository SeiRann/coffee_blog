"use client"
interface Post {
	title: string
	text: string
	author: string
	category: string
	datePosted: Date
}

export default function BlogPost(post: Post) {
	return (
		<div id="Blog" className="w-full rounded-xl p-3 border-yellow-900 border-b-2">
			<header className="flex flex-col">
				<div className="flex gap-3 items-center">
					<h6 className="bg-yellow-900 text-white rounded-md p-1">{post.author}</h6>
					<h6>{post.category}</h6>
					<h6>
						{post.datePosted.toLocaleString("en-US", {
							year: "numeric",
							month: "short",
							day: "numeric",
							hour: "2-digit",
							minute: "2-digit",
						})}
					</h6>
				</div>
				<h1 className="text-5xl m-2">{post.title}</h1>
			</header>
			<main>
				<p className="text-wrap">{post.text}</p>
			</main>
			<footer>{post.author}</footer>
		</div>
	)
}
