import { getNFTs } from "../components/Web3Wallet/api/getNFTs";
import { useEffect, useState } from "react";
import styles from "../styles/redemption.module.css";
import sharedBackgroundStyles from "../styles/sharedBackground.module.css";
import { NFTData } from "../types/interfaces";
import { Web3Button } from "@web3modal/react";
import { useAccount } from "wagmi";
export default function Redemption() {
	const [nfts, setNfts] = useState<NFTData[]>([]);
	const wallet = useAccount();

	const handleGetNfts = async () => {
		try {
			const fetchedNfts = await getNFTs(wallet.address!);
			setNfts(fetchedNfts);
		} catch (error) {
			console.error(error);
		}
	};

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
	useEffect(() => {
		if (wallet.address) {
			handleGetNfts();
		} else {
			setNfts([]);
		}
	}, [wallet.isConnected, wallet.address]);
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
					<div className={styles.connectButton}>
						<Web3Button />
					</div>
				</h1>

				<div className={styles.container}>
					{nfts.length > 0 ? nftCards : <p>You do not own any Stellar NFTs.</p>}
				</div>
			</div>
		</div>
	);
}
