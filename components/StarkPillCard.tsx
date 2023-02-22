import styles from "../styles/StarkPillCard.module.css";
import Image from "next/image";
import { STARKPILL_CONTRACT_ADDRESS } from "../types/constants";
import { shortenAddress } from "../types/utils";
import { useState } from "react";
import { EditPillModal } from "./Modals/EditPillModal";
import Href from "../public/hrefIcon.svg";
import { ImageModal } from "./Modals/ImageModal";
interface Props {
	ownerAddress: string;
	imageUrl: string;
	mintPrice: string;
	tokenId: string;
	ingId?: number;
	bgId?: number;
	rank: number;
	isOwner?: boolean;
}
export const StarkPillCard = (props: Props) => {
	const {
		ownerAddress,
		imageUrl,
		mintPrice,
		tokenId,
		isOwner,
		ingId,
		bgId,
		rank,
	} = props;
	const [showModal, setShowModal] = useState(false);
	const [showImageModal, setShowImageModal] = useState(false);
	const value = imageUrl.substring(
		imageUrl.lastIndexOf("_") + 1,
		imageUrl.lastIndexOf(".")
	);
	const ingImageId = parseInt(value.substring(0, 3));
	const bgImageId = parseInt(value.substring(3));
	const openMintSquareLink = () => {
		window.open(
			"https://mintsquare.io/asset/starknet-testnet/" +
				STARKPILL_CONTRACT_ADDRESS +
				"/" +
				tokenId,
			"_blank"
		);
	};
	const borderColor =
		props.rank === 1 ? "#FFC107" : props.rank === 2 ? "#E0E0E0" : "#FF9838";
	const isTop3 = props.rank <= 3 && props.rank > 0;
	return (
		<>
			<div
				style={
					isTop3
						? {
								border: "5px solid " + borderColor,
								borderRadius: "12px",
								width: "fit-content",
								margin: "auto",
						  }
						: {}
				}>
				<div className={isTop3 ? styles.cardRank : styles.card}>
					<div className={styles.buttonContainer}>
						<Href
							style={{ color: "black", float: "right", cursor: "pointer" }}
							onClick={openMintSquareLink}
						/>
					</div>
					<Image
						src={imageUrl}
						className={isTop3 ? styles.imageRank : styles.image}
						style={isTop3 ? { borderColor: borderColor } : {}}
						width={300}
						height={300}
						alt=""
						onClick={() => setShowImageModal(true)}></Image>
					<div
						className={isTop3 ? styles.contentRank : styles.content}
						style={isTop3 ? { borderColor: borderColor } : {}}>
						<div className={styles.contentRankTitle}>
							TestPill #{tokenId}
							{isTop3 && (
								<Image
									src={"/svgs/medal" + props.rank + ".svg"}
									alt=""
									width={50}
									height={50}
									style={{ float: "right" }}></Image>
							)}
							{isOwner && (
								<div
									className="connectWalletButton"
									style={{
										color: "white",
										width: "fit-content",
										float: "right",
									}}
									onClick={() => {
										setShowModal(true);
									}}>
									edit pill
								</div>
							)}
						</div>
						<div>{Number(mintPrice) / Math.pow(10, 18)} ETH</div>
						{!isOwner && <div>Owned By: {shortenAddress(ownerAddress)}</div>}
					</div>
				</div>
			</div>
			{showModal && (
				<EditPillModal
					tokenId={Number(tokenId)}
					ingId={ingId!}
					bgId={bgId!}
					ingImageId={ingImageId}
					bgImageId={bgImageId}
					close={() => setShowModal(false)}
					oldImage={imageUrl}
				/>
			)}
			{showImageModal && (
				<ImageModal
					imageUrl={imageUrl}
					tokenId={tokenId}
					ingImageId={ingImageId}
					bgImageId={bgImageId}
					rank={rank}
					close={() => setShowImageModal(false)}
				/>
			)}
		</>
	);
};
