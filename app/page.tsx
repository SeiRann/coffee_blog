import BlogPost from "./components/BlogPost"

export default function Home() {
	const post = {
		title: "Coding 24/7",
		text: "I have been coding 24/7 straight I don't even remember when I last ate or drank coffee or ate food or shit. Well no I drink coffee continously so that I can code even more.",
		author: "Seiran",
		category: "Coding",
		datePosted: new Date(),
	}

	return (
		<div id="FeedWrapper" className="flex flex-col items-center">
			<div
				id="Feed"
				className="flex flex-col border-t-2 border-t-yellow-900 w-3/4 shadow-2xl drop-shadow-2xl rounded-xl"
			>
				<BlogPost {...post} />
				<BlogPost {...post} />
				<BlogPost {...post} />
			</div>
		</div>
	)
}
