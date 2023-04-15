import styles from "../styles/StarkPillCard.module.css";
import Image from "next/image";
import {
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
import PillDetailsIcon from "../public/svgs/PillDetailsIcon.svg";
import { useState, useEffect, useCallback } from "react";
interface Props {
	ownerAddress: string;
	imageUrl: string;
	mintPrice: string;
	tokenId: string;
	ingId?: number;
	bgId?: number;
	rank: number;
	isOwner?: boolean;
	fame: number;
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
		fame,
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
	const openMintSquareLink = () => {
		window.open(
			`https://mintsquare.io/asset/${NETWORK_FOR_API}/` +
				STARKPILL_CONTRACT_ADDRESS +
				"/" +
				tokenId,
			"_blank"
		);
	};
	//display Image Modal when menu option Pill Details is clicked
	const openImageModal = () => {
		setShowImageModal(true);
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

	const handleMenuToggle = useCallback(
		(event: any) => {
			if (event.detail !== tokenId) {
				setMenuId(null);
			}
		},
		[tokenId]
	);

	useEffect(() => {
		document.addEventListener("click", handleClickOutside);
		window.addEventListener("starkPillMenuToggle", handleMenuToggle);
		return () => {
			document.removeEventListener("click", handleClickOutside);
			window.removeEventListener("starkPillMenuToggle", handleMenuToggle);
		};
	}, [handleMenuToggle]);
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
					<div
						className={`${styles.kebabIcon} ${
							isOwner ? `${styles.kebabIconMyPills} ` : ""
						}`}
						onClick={toggleMenu}>
						<KebabIcon style={{ color: "#FF4F0A" }} />
					</div>

					{menuId === tokenId && (
						<div
							className={`${styles.menuOptions} ${
								isOwner ? styles.menuOptionsMyPills : ""
							}`}>
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
							<div className={styles.menuItem} onClick={openImageModal}>
								<PillDetailsIcon style={{ marginRight: "8px" }} /> Pill Details
							</div>
							<div className={styles.menuItem} onClick={openMintSquareLink}>
								<ExternalLinksIcon style={{ marginRight: "8px" }} /> Mint Square
							</div>
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
						<div className={styles.contentRankTitle}>TestPill #{tokenId}</div>
						<div>{Number(mintPrice) / Math.pow(10, 18)} ETH</div>
						<div>{fame} Fame</div>
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
					close={() => setShowImageModal(false)}
					fame={fame}
					ownerAddress={ownerAddress}
				/>
			)}
		</>
	);
};
