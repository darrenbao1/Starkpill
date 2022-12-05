import styles from "../styles/mint.module.css";
import Image from "next/image";
import { useAccount } from "@starknet-react/core";
import { ConnectWalletButton } from "../components/ConnectWalletButton";
const Mint = () => {
	const { account } = useAccount();
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
							src="/Braavos_Trait.PNG"
							alt=""
							fill
							className={styles.imageLayer}
						></Image>
					</div>
					<div className={styles.header}>prescribe yourself!</div>
					<div className={styles.button}>select facial traits</div>
					<div className={styles.button}>select background</div>
					{!account ? (
						<ConnectWalletButton />
					) : (
						<div className="connectWalletButton">Mint</div>
					)}
				</div>
			</div>
		</div>
	);
};
export default Mint;
