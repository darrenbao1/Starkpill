import styles from "../styles/mint.module.css";
import Image from "next/image";
import { useAccount } from "@starknet-react/core";
import { ConnectWalletButton } from "../components/ConnectWalletButton";
import { useState } from "react";
import { FACE_TRAITS, BACKGROUND } from "../types/constants";
import { TraitsModal } from "../components/Modals/TraitsModal";
const Mint = () => {
	const { account } = useAccount();
	const [showFaceModal, setShowFaceModal] = useState(false);
	const [showBackgroundModal, setShowBackgroundModal] = useState(false);
	const [selectedFaceId, setSelectedFaceId] = useState(1);
	const [selectedBackgroundId, setBackgroundId] = useState(1);
	return (
		<div className="container">
			<div className={styles.backgroundFade}></div>
			<div className={styles.contentContainer}>
				<div className={styles.traitsContainer}>
					<div className={styles.imageContainer}>
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
					<div
						className={styles.button}
						onClick={() => {
							setShowFaceModal(true);
							setShowBackgroundModal(false);
						}}
					>
						select facial traits
					</div>
					<div
						className={styles.button}
						onClick={() => {
							setShowBackgroundModal(true);
							setShowFaceModal(false);
						}}
					>
						select background
					</div>
					{!account ? (
						<ConnectWalletButton />
					) : (
						<div className="connectWalletButton">Mint</div>
					)}
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
			</div>
		</div>
	);
};
export default Mint;
