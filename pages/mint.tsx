import styles from "../styles/mint.module.css";
import Image from "next/image";
import { useAccount } from "@starknet-react/core";
import { ConnectWalletButton } from "../components/ConnectWalletButton";
import { useState } from "react";
import Cross from "../public/svgs/cross.svg";
import { FACE_TRAITS } from "../types/constants";
const Mint = () => {
	const { account } = useAccount();
	const [showTraitsModal, setShowTraitsModal] = useState(false);
	const [selectedTraitId, setSelectedTraitId] = useState(0);
	const [showBackgroundModal, setShowBackgroundModal] = useState(false);
	return (
		<div className="container">
			<div className={styles.backgroundFade}></div>
			<div className="contentContainer">
				<div className={styles.traitsContainer}>
					<div className={styles.imageContainer}>
						{/* base pill */}
						<Image
							src="/Base_StarkPill.PNG"
							alt=""
							fill
							className={styles.imageLayer}
						></Image>
						{/* face trait */}
						<Image
							src={FACE_TRAITS[selectedTraitId].link}
							alt=""
							fill
							className={styles.imageLayer}
						></Image>
					</div>
					<div className={styles.header}>prescribe yourself!</div>
					<div
						className={styles.button}
						onClick={() => setShowTraitsModal(true)}
					>
						select facial traits
					</div>
					<div className={styles.button}>select background</div>
					{!account ? (
						<ConnectWalletButton />
					) : (
						<div className="connectWalletButton">Mint</div>
					)}
				</div>
				<div
					className={styles.modalContainer}
					style={showTraitsModal ? { width: "100%" } : {}}
				>
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
									index == selectedTraitId
										? styles.selectionIconActive
										: styles.selectionIcon
								}
								key={index}
							>
								<Image
									src={faceTrait.link}
									width={90}
									height={90}
									alt={faceTrait.name}
									onClick={() => setSelectedTraitId(faceTrait.id)}
								></Image>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};
export default Mint;
