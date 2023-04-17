import styles from "../styles/mint.module.css";
import Image from "next/image";
import { useAccount } from "@starknet-react/core";
import { ConnectWalletButton } from "../components/ConnectWalletButton";
import { useEffect, useState } from "react";
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

	const [width, setWidth] = useState<number>(0);

	useEffect(() => {
		if (typeof window !== "undefined") {
			setWidth(window.innerWidth);
			window.addEventListener("resize", handleWindowSizeChange);
			return () => {
				window.removeEventListener("resize", handleWindowSizeChange);
			};
		}
	}, []);

	function handleWindowSizeChange() {
		if (typeof window !== "undefined") {
			setWidth(window.innerWidth);
		}
	}

	const isMobile = width <= 768;

	const selectFaceButton = (
		<div
			className={hasEditedFace ? styles.editButton : styles.button}
			onClick={() => {
				if (!hasEditedFace) {
					setHasEditedFace(true);
				}
				closeAllModals();
				setShowFaceModal(true);
			}}>
			{hasEditedFace
				? FACE_TRAITS[selectedFaceId].name
				: isMobile
				? "Ingredient"
				: "Select Ingredient"}
			{hasEditedFace && (
				<div
					style={{
						marginRight: "0",
						marginLeft: "auto",
					}}>
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
			}}>
			{hasEditedBackground
				? BACKGROUND[selectedBackgroundId].name
				: isMobile
				? "Background"
				: "Select Background"}
			{hasEditedBackground && (
				<div
					style={{
						marginRight: "0",
						marginLeft: "auto",
					}}>
					<EditIcon />
				</div>
			)}
		</div>
	);
	const mintButton = !showMintModal && (
		<div
			className="connectWalletButton"
			style={{
				padding: "1rem 4rem",
				fontSize: "32px",
			}}
			onClick={() => {
				closeAllModals();
				setShowMintModal(true);
			}}>
			Mint
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
							className={styles.imageLayer}></Image>
						{/* base pill */}
						<Image
							src="/Base_StarkPill.PNG"
							alt=""
							fill
							sizes="100%"
							className={styles.imageLayer}></Image>
						{/* face trait */}
						<Image
							src={FACE_TRAITS[selectedFaceId].link}
							alt=""
							fill
							sizes="100%"
							className={styles.imageLayer}></Image>
					</div>
					{selectFaceButton}
					{selectBackgroundButton}
					{!account ? <ConnectWalletButton /> : mintButton}
				</div>
				{showFaceModal && (
					<TraitsModal
						traitName="Ingredient"
						trait={FACE_TRAITS}
						selectedId={selectedFaceId}
						close={() => setShowFaceModal(false)}
						select={setSelectedFaceId}
						isMinting={true}
					/>
				)}
				{showBackgroundModal && (
					<TraitsModal
						traitName="Background"
						trait={BACKGROUND}
						selectedId={selectedBackgroundId}
						close={() => setShowBackgroundModal(false)}
						select={setBackgroundId}
						isMinting={true}
					/>
				)}
				{showMintModal && (
					<MintModal
						close={() => setShowMintModal(false)}
						faceId={selectedFaceId}
						backgroundId={selectedBackgroundId}
					/>
				)}
				<Image
					src="/companyLogo.png"
					height={40}
					width={136}
					alt="seraphLabs"
					className={styles.companyLogo}></Image>
			</div>
		</div>
	);
};
export default Mint;
