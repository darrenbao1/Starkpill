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
	const [selectedFaceId, setSelectedFaceId] = useState(1);
	const [selectedBackgroundId, setBackgroundId] = useState(1);
	const [hasEditedFace, setHasEditedFace] = useState(false);
	const [hasEditedBackground, setHasEditedBackground] = useState(false);
	const [showMintModal, setShowMintModal] = useState(false);

	const selectFaceButton = (
		<div
			className={hasEditedFace ? styles.editButton : styles.button}
			onClick={() => {
				if (!hasEditedFace) {
					setHasEditedFace(true);
				}
				setShowFaceModal(true);
				setShowBackgroundModal(false);
			}}
		>
			{hasEditedFace
				? FACE_TRAITS[selectedFaceId - 1].name
				: "select facial traits"}
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
				setShowBackgroundModal(true);
				setShowFaceModal(false);
			}}
		>
			{hasEditedBackground
				? BACKGROUND[selectedBackgroundId - 1].name
				: "select background"}
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
	const mintButton = (
		<div className="connectWalletButton" style={{ padding: "1rem 2rem" }}>
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
							src={BACKGROUND[selectedBackgroundId - 1].link}
							alt=""
							fill
							className={styles.imageLayer}
						></Image>
						{/* base pill */}
						<Image
							src="/Base_StarkPill.PNG"
							alt=""
							fill
							className={styles.imageLayer}
						></Image>
						{/* face trait */}
						<Image
							src={FACE_TRAITS[selectedFaceId - 1].link}
							alt=""
							fill
							className={styles.imageLayer}
						></Image>
					</div>
					<div className={styles.header}>prescribe yourself!</div>
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
				{!showMintModal && <MintModal />}
			</div>
		</div>
	);
};
export default Mint;
