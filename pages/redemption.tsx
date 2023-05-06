import Image from "next/image";
import { getNFTs } from "../components/Web3Wallet/api/getNFTs";
import {
	IWeb3Context,
	useWeb3Context,
} from "../components/Web3Wallet/provider/Web3ContextProvider";
import { useEffect, useState } from "react";
import styles from "../styles/redemption.module.css";
import sharedBackgroundStyles from "../styles/sharedBackground.module.css";
import { NFTData } from "../types/interfaces";
import { shortenAddress } from "../types/utils";

export default function Redemption() {
	const [nfts, setNfts] = useState<NFTData[]>([]);
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

	const nftsByCollection = nfts.reduce(
		(acc: { [key: string]: NFTData[] }, nft) => {
			if (!acc[nft.collectionName]) {
				acc[nft.collectionName] = [];
			}
			acc[nft.collectionName].push(nft);
			return acc;
		},
		{}
	);

	const nftCards = Object.entries(nftsByCollection).map(
		([collectionName, nfts]) => (
			<div key={collectionName} className={styles.collectionContainer}>
				<h2>{collectionName}</h2>
				<div className={styles.nftCardContainer}>
					{nfts.map((nft: NFTData) => (
						<div key={nft.collectionTokenId} className={styles.nftCard}>
							<picture>
								<img
									className={styles.nftCardImage}
									src={nft.imageUrl}
									alt={nft.name}
								/>
							</picture>
							<span>Name:</span>
							<h1>{nft.name}</h1>
						</div>
					))}
				</div>
			</div>
		)
	);

	return (
		<div className={`container ${sharedBackgroundStyles.sharedBackground}`}>
			<div className="contentContainer">
				<h1
					style={{ textAlign: "center", paddingTop: "2rem", display: "flex" }}>
					Redemption
					{!isAuthenticated ? (
						<button onClick={connectWallet} className={styles.connectButton}>
							Connect Wallet
						</button>
					) : (
						<button onClick={disconnect} className={styles.connectButton}>
							{address && shortenAddress(address)}
						</button>
					)}
				</h1>

				<div className={styles.container}>
					{!isAuthenticated ? (
						<p>Please connect wallet.</p>
					) : nfts.length > 0 ? (
						nftCards
					) : (
						<p>You do not own any Stellar NFTs.</p>
					)}
				</div>
			</div>
		</div>
	);
}
