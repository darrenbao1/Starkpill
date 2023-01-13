import styles from "../styles/StarkPillCard.module.css";
import Image from "next/image";
import { STARKPILL_CONTRACT_ADDRESS } from "../types/constants";
import { shortenAddress } from "../types/utils";
interface Props {
	ownerAddress: string;
	imageUrl: string;
	mintPrice: string;
	tokenId: string;
	rank?: number;
}

export const StarkPillCard = (props: Props) => {
	const { ownerAddress, imageUrl, mintPrice, tokenId } = props;
	const borderColor =
		props.rank === 1 ? "#FFC107" : props.rank === 2 ? "#E0E0E0" : "#FF9838";
	if (props.rank) {
		return (
			<>
				<a
					href={
						"https://mintsquare.io/asset/starknet-testnet/" +
						STARKPILL_CONTRACT_ADDRESS +
						"/" +
						tokenId
					}
					target="_blank"
					rel="noreferrer"
				>
					<div className={styles.cardRank}>
						<Image
							src={imageUrl}
							className={styles.imageRank}
							style={{ borderColor: borderColor }}
							width={300}
							height={300}
							alt=""
						></Image>
						<div
							className={styles.contentRank}
							style={{ borderColor: borderColor }}
						>
							<div style={{ color: "#FF4F0A" }}>
								TestPill #{tokenId}{" "}
								<Image
									src={"/svgs/medal" + props.rank + ".svg"}
									alt=""
									width={50}
									height={50}
									style={{ float: "right" }}
								></Image>
							</div>
							<div>{Number(mintPrice) / Math.pow(10, 18)} ETH</div>
							<div>Owned By: {shortenAddress(ownerAddress)}</div>
						</div>
					</div>
				</a>
			</>
		);
	}

	return (
		<>
			<a
				href={
					"https://mintsquare.io/asset/starknet-testnet/" +
					STARKPILL_CONTRACT_ADDRESS +
					"/" +
					tokenId
				}
				target="_blank"
				rel="noreferrer"
			>
				<div className={styles.card}>
					<Image
						src={imageUrl}
						className={styles.image}
						width={200}
						height={200}
						alt=""
					></Image>
					<div className={styles.content}>
						<div style={{ color: "#FF4F0A" }}>TestPill #{tokenId}</div>
						<div>{Number(mintPrice) / Math.pow(10, 18)} ETH</div>
						<div>Owned By: {shortenAddress(ownerAddress)}</div>
					</div>
				</div>
			</a>
		</>
	);
};
