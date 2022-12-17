import styles from "../styles/mint.module.css";
import Image from "next/image";
import { useAccount } from "@starknet-react/core";
import { ConnectWalletButton } from "../components/ConnectWalletButton";
import { useState } from "react";
import { FACE_TRAITS, BACKGROUND } from "../types/constants";
import { TraitsModal } from "../components/Modals/TraitsModal";
import EditIcon from "../public/svgs/Edit.svg";
import { MintModal } from "../components/Modals/MintModal";
const Mint = () => {
	const { account } = useAccount();
	const [showFaceModal, setShowFaceModal] = useState(false);
	const [showBackgroundModal, setShowBackgroundModal] = useState(false);
	const [selectedFaceId, setSelectedFaceId] = useState(0);
	const [selectedBackgroundId, setBackgroundId] = useState(0);
	const [hasEditedFace, setHasEditedFace] = useState(false);
	const [hasEditedBackground, setHasEditedBackground] = useState(false);
	const [showMintModal, setShowMintModal] = useState(false);
	const closeAllModals = () => {
		setShowFaceModal(false);
		setShowBackgroundModal(false);
		setShowMintModal(false);
	};
	const selectFaceButton = (
		<div
			className={hasEditedFace ? styles.editButton : styles.button}
			onClick={() => {
				if (!hasEditedFace) {
					setHasEditedFace(true);
				}
				closeAllModals();
				setShowFaceModal(true);
			}}
		>
			{hasEditedFace ? FACE_TRAITS[selectedFaceId].name : "ingredient #1"}
			{hasEditedFace && (
				<div
					style={{
						marginRight: "0",
						marginLeft: "auto",
					}}
				>
					<EditIcon />
				</div>
			)}
		</div>
	);
	const selectBackgroundButton = (
		<div
			className={hasEditedBackground ? styles.editButton : styles.button}
			onClick={() => {
				if (!hasEditedBackground) {
					setHasEditedBackground(true);
				}
				closeAllModals();
				setShowBackgroundModal(true);
			}}
		>
			{hasEditedBackground
				? BACKGROUND[selectedBackgroundId].name
				: "ingredient #2"}
			{hasEditedBackground && (
				<div
					style={{
						marginRight: "0",
						marginLeft: "auto",
					}}
				>
					<EditIcon />
				</div>
			)}
		</div>
	);
	const mintButton = !showMintModal && (
		<div
			className="connectWalletButton"
			style={{ padding: "1rem 2rem" }}
			onClick={() => {
				closeAllModals();
				setShowMintModal(true);
			}}
		>
			mint
		</div>
	);

	return (
		<div className="container">
			<div className={styles.backgroundFade}></div>
			<div className={styles.contentContainer}>
				<div className={styles.traitsContainer}>
					<div className={styles.imageContainer}>
						{/* background trait */}
						<Image
							src={BACKGROUND[selectedBackgroundId].link}
							alt=""
							fill
							sizes="100%"
							className={styles.imageLayer}
						></Image>
						{/* base pill */}
						<Image
							src="/Base_StarkPill.PNG"
							alt=""
							fill
							sizes="100%"
							className={styles.imageLayer}
						></Image>
						{/* face trait */}
						<Image
							src={FACE_TRAITS[selectedFaceId].link}
							alt=""
							fill
							sizes="100%"
							className={styles.imageLayer}
						></Image>
					</div>
					{selectFaceButton}
					{selectBackgroundButton}
					{!account ? <ConnectWalletButton /> : mintButton}
				</div>
				{showFaceModal && (
					<TraitsModal
						traitName="face trait"
						trait={FACE_TRAITS}
						selectedId={selectedFaceId}
						close={() => setShowFaceModal(false)}
						select={setSelectedFaceId}
					/>
				)}
				{showBackgroundModal && (
					<TraitsModal
						traitName="background"
						trait={BACKGROUND}
						selectedId={selectedBackgroundId}
						close={() => setShowBackgroundModal(false)}
						select={setBackgroundId}
					/>
				)}
				{showMintModal && (
					<MintModal
						close={() => setShowMintModal(false)}
						faceId={selectedFaceId}
						backgroundId={selectedBackgroundId}
					/>
				)}
			</div>
		</div>
	);
};
export default Mint;
