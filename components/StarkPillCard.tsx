import styles from "../styles/StarkPillCard.module.css";
import Image from "next/image";
import {
	isBrightArray,
	NETWORK_FOR_API,
	STARKPILL_CONTRACT_ADDRESS,
} from "../types/constants";
import { shortenAddress } from "../types/utils";

import { EditPillModal } from "./Modals/EditPillModal";
import Href from "../public/hrefIcon.svg";
import { ImageModal } from "./Modals/ImageModal";
import KebabIcon from "../public/svgs/kebab.svg";
import EditPillIcon from "../public/svgs/EditPillIcon.svg";
import ExternalLinksIcon from "../public/svgs/ExternalLinks.svg";
import { useState, useEffect } from "react";
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
	const [menuId, setMenuId] = useState<string | null>(null);
	const value = imageUrl.substring(
		imageUrl.lastIndexOf("_") + 1,
		imageUrl.lastIndexOf(".")
	);
	const ingImageId = parseInt(value.substring(0, 3));
	const bgImageId = parseInt(value.substring(3));
	const isWhiteBg = isBrightArray.includes(bgImageId) ? true : false;
	const openMintSquareLink = () => {
		window.open(
			`https://mintsquare.io/asset/${NETWORK_FOR_API}/` +
				STARKPILL_CONTRACT_ADDRESS +
				"/" +
				tokenId,
			"_blank"
		);
	};
	const [showMenu, setShowMenu] = useState(false);

	const borderColor =
		props.rank === 1 ? "#FFC107" : props.rank === 2 ? "#E0E0E0" : "#FF9838";
	const isTop3 = props.rank <= 3 && props.rank > 0;

	const toggleMenu = () => {
		setMenuId((prevMenuId) => {
			const newMenuId = prevMenuId === tokenId ? null : tokenId;
			const event = new CustomEvent("starkPillMenuToggle", {
				detail: newMenuId,
			});
			window.dispatchEvent(event);
			return newMenuId;
		});
	};

	const handleClickOutside = (event: any) => {
		if (
			event.target.closest(".menuOptions") ||
			event.target.closest("." + styles.kebabIcon)
		) {
			return;
		}
		setMenuId(null);
	};

	const handleMenuToggle = (event: any) => {
		if (event.detail !== tokenId) {
			setMenuId(null);
		}
	};

	useEffect(() => {
		document.addEventListener("click", handleClickOutside);
		window.addEventListener("starkPillMenuToggle", handleMenuToggle);
		return () => {
			document.removeEventListener("click", handleClickOutside);
			window.removeEventListener("starkPillMenuToggle", handleMenuToggle);
		};
	}, []);
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
					<div className={styles.kebabIcon} onClick={toggleMenu}>
						<KebabIcon
							style={isWhiteBg ? { color: "#35358F" } : { color: "#FFFFFF" }}
						/>
					</div>
					{menuId === tokenId && (
						<div className={styles.menuOptions}>
							<div className={styles.menuItem} onClick={openMintSquareLink}>
								<ExternalLinksIcon style={{ marginRight: "8px" }} /> External
								Links
							</div>
							{isOwner && (
								<div
									className={styles.menuItem}
									onClick={() => {
										setShowModal(true);
									}}>
									{" "}
									<EditPillIcon style={{ marginRight: "8px" }} /> Edit pill
								</div>
							)}
						</div>
					)}
					<Image
						src={imageUrl}
						className={isTop3 ? styles.imageRank : styles.image}
						style={isTop3 ? { borderColor: borderColor } : {}}
						width={300}
						height={300}
						alt=""
						onClick={() => setShowImageModal(true)}
					/>

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
