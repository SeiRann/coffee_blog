"use client"
import Navbar from "./components/navbar"
import "./globals.css"
import { ApolloProvider } from "@apollo/client"
import client from "./apollo-client"
import StoreProvider from "./StoreProvider"

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<StoreProvider>
			<html lang="en">
				<body>
					<ApolloProvider client={client}>
						<Navbar />
						{children}
					</ApolloProvider>
				</body>
			</html>
		</StoreProvider>
	)
}
