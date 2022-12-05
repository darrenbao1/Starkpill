import styles from "../styles/mint.module.css";
import Image from "next/image";
import { useAccount } from "@starknet-react/core";
import { ConnectWalletButton } from "../components/ConnectWalletButton";
export default function mint() {
	const { account } = useAccount();
	return (
		<div className="container">
			<div className={styles.backgroundFade}>
				<div
					className="contentContainer"
					style={{
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<div className={styles.leftContainer}>
						<div className={styles.imageContainer}>
							{/* base pill */}
							<Image
								src="/Base_StarkPill.PNG"
								alt=""
								width={365}
								height={365}
								className={styles.imageLayer}
							></Image>
							{/* face trait */}
							<Image
								src="/Braavos_Trait.PNG"
								alt=""
								width={365}
								height={365}
								className={styles.imageLayer}
							></Image>
						</div>
						<div className={styles.traitsContainer}>
							<h1>prescribe yourself!</h1>
							<div className={styles.traitButton}> select facial trait</div>
							<div className={styles.traitButton}> select background</div>
							{!account ? (
								<ConnectWalletButton />
							) : (
								<div className="connectWalletButton">mint</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
