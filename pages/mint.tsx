import styles from "../styles/mint.module.css";
import Image from "next/image";
import { useAccount } from "@starknet-react/core";
import { ConnectWalletButton } from "../components/ConnectWalletButton";
import { useState } from "react";
import Cross from "../public/svgs/cross.svg";
import { FACE_TRAITS, BACKGROUND } from "../types/constants";
const Mint = () => {
	const { account } = useAccount();
	const [showTraitsModal, setShowTraitsModal] = useState(false);
	const [showBackgroundModal, setShowBackgroundModal] = useState(false);
	const [selectedTraitId, setSelectedTraitId] = useState(1);
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
							src={FACE_TRAITS[selectedTraitId - 1].link}
							alt=""
							fill
							className={styles.imageLayer}
						></Image>
					</div>
					<div className={styles.header}>prescribe yourself!</div>
					<div
						className={styles.button}
						onClick={() => {
							setShowTraitsModal(true);
							setShowBackgroundModal(false);
						}}
					>
						select facial traits
					</div>
					<div
						className={styles.button}
						onClick={() => {
							setShowBackgroundModal(true);
							setShowTraitsModal(false);
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
				{showTraitsModal && (
					<div className={styles.modalContainer}>
						<button
							className={styles.closeButton}
							onClick={() => setShowTraitsModal(false)}
						>
							<Cross />
						</button>
						<div className={styles.header}>select facial trait</div>
						<div className={styles.selectionContainer}>
							{FACE_TRAITS.map((faceTrait, index) => (
								<div
									className={
										index == selectedTraitId - 1
											? styles.selectionIconActive
											: styles.selectionIcon
									}
									key={index}
									style={{ backgroundColor: "white" }}
								>
									<Image
										src={faceTrait.link}
										width={90}
										height={90}
										alt={faceTrait.name}
										onClick={() => setSelectedTraitId(faceTrait.id)}
										className={styles.centreTrait}
									></Image>
									<div className={styles.tooltiptext}>{faceTrait.name}</div>
								</div>
							))}
						</div>
					</div>
				)}
				{showBackgroundModal && (
					<div className={styles.modalContainer}>
						<button
							className={styles.closeButton}
							onClick={() => setShowBackgroundModal(false)}
						>
							<Cross />
						</button>
						<div className={styles.header}>select background</div>
						<div className={styles.selectionContainer}>
							{BACKGROUND.map((background, index) => (
								<div
									className={
										index == selectedBackgroundId - 1
											? styles.selectionIconActive
											: styles.selectionIcon
									}
									key={index}
								>
									<Image
										src={background.link}
										width={90}
										height={90}
										alt={background.name}
										onClick={() => setBackgroundId(background.id)}
									></Image>
									<div className={styles.tooltiptext}>{background.name}</div>
								</div>
							))}
						</div>
					</div>
				)}
			</div>
		</div>
	);
};
export default Mint;
