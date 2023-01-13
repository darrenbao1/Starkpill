import "../styles/globals.css";
import type { AppProps } from "next/app";
import { StarknetConfig, InjectedConnector } from "@starknet-react/core";
import { Navbar } from "../components/Navbar";
import Head from "next/head";
import { Toast } from "../components/Toasts/Toast";
import { ApolloProvider } from "@apollo/client";
import client from "../apollo-client";
export default function App({ Component, pageProps }: AppProps) {
	//starknet wallet options
	const connectors = [
		new InjectedConnector({
			options: { id: "braavos" },
		}),
		new InjectedConnector({
			options: { id: "argentX" },
		}),
	];
	return (
		<div style={{ position: "fixed" }}>
			<StarknetConfig connectors={connectors} autoConnect={true}>
				<ApolloProvider client={client}>
					<Head>
						<link rel="icon" href="/starkpill.PNG"></link>
						<title>getStarkpilled</title>
					</Head>
					<Navbar />
					<Component {...pageProps} />
					<Toast />
				</ApolloProvider>
			</StarknetConfig>
		</div>
	);
}
