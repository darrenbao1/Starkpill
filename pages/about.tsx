import Link from "next/link";
import styles from "../styles/about.module.css";
import Image from "next/image";

export default function about() {
	return (
		<div className="container" style={{ background: "#ffffff" }}>
			<div className={styles.entireBox}>
				<div className={styles.contentContainer}>
					<h1 className={styles.aboutTextShift}> About Us</h1>
					<Image
						src="https://arweave.net/YUOO4tIjNdw82NlYv3reVJ4pQJw7uZFkm0LKKVdLSEA/TestPill/pill_004012.png"
						className={styles.image}
						height={500}
						width={500}
						alt=""
					></Image>
					<div className={styles.text}>
						<h1 className={styles.headerText}>About us</h1>
						<Link
							href="https://twitter.com/GuthL/status/1594292390092750848?s=20&t=XaDDRn52fCJ5adU_GxeoHg"
							target="_blank"
						>
							<u>Great memes</u>
						</Link>
						&nbsp;beget more memes, even if the resulting memes are mid.
						<br />
						<br />
						Starkpills are NFTs built on the{" "}
						<Link
							href="https://twitter.com/211lp/status/1593622328771956737?s=20&t=XaDDRn52fCJ5adU_GxeoHg"
							target="_blank"
						>
							<u>ERC-2114 Semi-Fungible Token Standard by Seraph Labs.</u>
						</Link>
						<br />
						<br />
						Each Starkpill is an NFT that owns/equips another NFT - the facial
						expression.
						<br />
						<br />
						Every facial expression is a unique NFT that can unequipped from a
						Starkpill and changed for another one. <br />
						<br />
						However, at this time there are only 10 facial expressions and there
						is no market to trade them. <br />
						<br />
						When we have the time, we will allow Starkpillers to
						‘evolve’/customize their Starkpill by changing the facial expression
						NFT that the Starkpill owns. More facial expressions may be added in
						the future.
						<br />
						<br />
						The Starkpill mint will officially end when StarkNet’s Mainnet is
						fully live.
						<br />
						<br />
						<Link
							className="connectWalletButton"
							style={{ width: "fit-content", color: "white", padding: "15px" }}
							href="/mint"
						>
							Start Minting!
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}
