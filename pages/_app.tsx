import "../styles/globals.css";
import type { AppProps } from "next/app";
import { StarknetConfig, InjectedConnector } from "@starknet-react/core";
// import { Navbar } from "../components/Navbar/components";<<Previous Navbar
import { Navbar } from "../components/Navbar";
import Head from "next/head";
import { Toast } from "../components/Toasts/Toast";
import { ApolloProvider } from "@apollo/client";
import client from "../apollo-client";
import { Provider } from "react-redux";
import { store } from "../features/store";
import Web3ContextProvider from "../components/Web3Wallet/provider/Web3ContextProvider";
import { StarkpillTheme } from "../types/appTheme";
import { ThemeProvider } from "styled-components";
export default function App({ Component, pageProps }: AppProps) {
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
			<Provider store={store}>
				<Web3ContextProvider>
					<StarknetConfig connectors={connectors} autoConnect={true}>
						<ApolloProvider client={client}>
							<Head>
								<link rel="icon" href="/starkpill.PNG"></link>
								<title> getStarkpilled </title>
							</Head>
							<ThemeProvider theme={StarkpillTheme}>
								<Navbar />
								<Component {...pageProps} />
								<Toast />
							</ThemeProvider>
						</ApolloProvider>
					</StarknetConfig>
				</Web3ContextProvider>
			</Provider>
		</div>
	);
}
