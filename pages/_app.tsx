import "../styles/globals.css";
import type { AppProps } from "next/app";
import { StarknetConfig, InjectedConnector } from "@starknet-react/core";
import { Navbar } from "../components/Navbar";
import Head from "next/head";
import { Toast } from "../components/Toasts/Toast";
import { ApolloProvider } from "@apollo/client";
import client from "../apollo-client";
import { Provider } from "react-redux";
import { store } from "../features/store";
import { StarkpillTheme } from "../types/appTheme";
import { ThemeProvider } from "styled-components";
import {
	EthereumClient,
	w3mConnectors,
	w3mProvider,
} from "@web3modal/ethereum";
import { Web3Modal } from "@web3modal/react";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { arbitrum, mainnet, polygon } from "wagmi/chains";
import { get } from "lodash";
import { getWeb3ConnectId } from "../types/utils";
const chains = [arbitrum, mainnet, polygon];
const projectId = getWeb3ConnectId();

const { publicClient } = configureChains(chains, [w3mProvider({ projectId })]);
const wagmiConfig = createConfig({
	autoConnect: true,
	connectors: w3mConnectors({ projectId, version: 2, chains }),
	publicClient,
});
const ethereumClient = new EthereumClient(wagmiConfig, chains);
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
				<WagmiConfig config={wagmiConfig}>
					<StarknetConfig connectors={connectors} autoConnect={true}>
						<ApolloProvider client={client}>
							<Head>
								<link rel="icon" href="/starkpill.PNG"></link>
								<title> getStarkpilled </title>

								<script
									dangerouslySetInnerHTML={{
										__html: `
            window.danteEmbed = "https://chat.dante-ai.com/embed?kb_id=a9bcad50-3f83-439d-8208-9822d3e20d78&token=d89ae89a-b19f-40dc-9a8b-07e5bc963f96&modeltype=gpt-4&mode=undefined&bubble=true&image=null&bubbleopen=false";
          `,
									}}
								/>
								<script src="https://chat.dante-ai.com/bubble-embed.js" />
							</Head>
							<ThemeProvider theme={StarkpillTheme}>
								<Navbar />
								<Component {...pageProps} />
								<Toast />
							</ThemeProvider>
						</ApolloProvider>
					</StarknetConfig>
				</WagmiConfig>
			</Provider>
			<Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
		</div>
	);
}
