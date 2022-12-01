import Link from "next/link";
import styles from "../styles/about.module.css";
export default function about() {
	return (
		<div className="container">
			<div className="contentContainer">
				<div className={styles.text}>
					<Link
						href="https://twitter.com/GuthL/status/1594292390092750848?s=20&t=XaDDRn52fCJ5adU_GxeoHg"
						target="_blank"
					>
						<u>Great memes</u>
					</Link>{" "}
					beget more memes, even if the resulting
					memes are mid.
					<br />
					<br />
					Starkpills are NFTs built on the{" "}
					<Link
						href="https://twitter.com/211lp/status/1593622328771956737?s=20&t=XaDDRn52fCJ5adU_GxeoHg"
						target="_blank"
					>
						<u>
							ERC-2114 Semi-Fungible Token
							Standard by Seraph Labs.
						</u>
					</Link>
					<br />
					<br />
					Each Starkpill is an NFT that
					owns/equips another NFT - the facial
					expression.
					<br />
					<br />
					Every facial expression is a unique NFT
					that can unequipped from a Starkpill and
					changed for another one. <br />
					<br />
					However, at this time there are only 10
					facial expressions and there is no
					market to trade them. <br />
					<br />
					When we have the time, we will allow
					Starkpillers to ‘evolve’/customize their
					Starkpill by changing the facial
					expression NFT that the Starkpill owns.
					More facial expressions may be added in
					the future.
					<br />
					<br />
					The Starkpill mint will officially end
					when StarkNet’s Mainnet is fully live.
					<br />
					<br />
				</div>
			</div>
		</div>
	);
}
