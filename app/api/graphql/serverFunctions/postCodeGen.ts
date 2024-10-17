export default function generatePostCode(length: number) {
	const seed = "qwertyuiopasdfghjklzxcvbnm"
	let text = ""

	for (let i = 0; i < length; i++) {
		switch (Math.floor(Math.random() * 3)) {
			case 0:
				text += seed[Math.floor(Math.random() * seed.length)].toUpperCase()
				break
			case 1:
				text += seed[Math.floor(Math.random() * seed.length)].toLowerCase()
				break
			case 2:
				text += Math.floor(Math.random() * 10).toString()
				break
		}
	}

	return text
}
