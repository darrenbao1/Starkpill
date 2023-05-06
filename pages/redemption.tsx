import Image from "next/image";
import { getNFTs } from "../components/Web3Wallet/api/getNFTs";
import {
	IWeb3Context,
	useWeb3Context,
} from "../components/Web3Wallet/provider/Web3ContextProvider";
import { useEffect, useState } from "react";
import styles from "../styles/redemption.module.css";
import sharedBackgroundStyles from "../styles/sharedBackground.module.css";
export default function Redemption() {
	const [nfts, setNfts] = useState([]);
	const {
		connectWallet,
		disconnect,
		state: { isAuthenticated, address, currentChain, provider },
	} = useWeb3Context() as IWeb3Context;

	const handleGetNfts = async () => {
		try {
			const fetchedNfts = await getNFTs(address!);
			setNfts(fetchedNfts);
		} catch (error) {
			console.error(error);
		}
	};
	useEffect(() => {
		if (address) {
			handleGetNfts();
		}
	}, [isAuthenticated]);
	Image;
	return (
		<div className={`container ${sharedBackgroundStyles.sharedBackground}`}>
			<div className="contentContainer">
				<h1 style={{ textAlign: "center", paddingTop: "2rem" }}>Redemption</h1>
				{!isAuthenticated ? (
					<button onClick={connectWallet} className="connectWalletButton">
						Connect Wallet
					</button>
				) : (
					<button onClick={disconnect} className="connectWalletButton">
						Disconnect Wallet:
					</button>
				)}
				{!isAuthenticated ? (
					<p>Please connect wallet.</p>
				) : nfts.length > 0 ? (
					nfts.map((nft: any, index) => (
						<div key={index} className={styles.nftCard}>
							<picture>
								<img
									className={styles.nftCardImage}
									src={nft.imageUrl}
									alt={nft.name}
								/>
							</picture>
							<h2>{nft.name}</h2>
							<h2>token Id: {nft.collectionTokenId}</h2>
						</div>
					))
				) : (
					<p>You do not own any Stellar NFTs.</p>
				)}
			</div>
		</div>
	);
}
