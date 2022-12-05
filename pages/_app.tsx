import "../styles/globals.css";
import type { AppProps } from "next/app";
import { StarknetConfig, InjectedConnector } from "@starknet-react/core";
import { Navbar } from "../components/Navbar";
import Head from "next/head";
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
			<StarknetConfig connectors={connectors}>
				<Head>
					<link rel="icon" href="/starkpill.PNG"></link>
					<title>getStarkpilled</title>
				</Head>
				<Navbar />
				<Component {...pageProps} />
			</StarknetConfig>
		</div>
	);
}