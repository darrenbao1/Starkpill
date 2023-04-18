import Link from "next/link";
import aboutStyles from "../styles/about.module.css";
import Image from "next/image";
import FAQ from "./faq";

export default function about() {
	return (
		<div
			className="container"
			style={{
				background: `linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), #29296e`,
			}}>
			<div className={aboutStyles.entireBox}>
				<div className={aboutStyles.contentContainer}>
					<h1 className={aboutStyles.aboutTextShift}>About</h1>
					<Image
						src="/About.gif"
						className={`${aboutStyles.image} ${aboutStyles.fixedSizeImage}`}
						height={558}
						width={558}
						alt="gif"
					/>
					<div className={aboutStyles.text}>
						<h1 className={aboutStyles.headerText} style={{ color: "#FF4F0A" }}>
							About
						</h1>
						<p className={aboutStyles.custombreak3}>
							<Link
								href="https://twitter.com/GuthL/status/1594292390092750848?s=20&t=XaDDRn52fCJ5adU_GxeoHg"
								target="_blank">
								<u>Great memes</u>
							</Link>
							&nbsp;beget more memes
						</p>
						<p className={aboutStyles.custombreak2}>
							Starkpilled is an SFT (Semi-Fungible Token) collection of digital
							avatars for <br />
							people to celebrate to the StarkNet Ecosystem and participate in
							the SFT movement.{" "}
						</p>
						<p className={aboutStyles.custombreak1}>
							Compared to traditional NFT collections that are of the ERC-721
							token <br />
							standard, Starkpills are ERC-2114s’ a Seraph Labs tweak of the
							novel
							<br /> ERC-3525 developed by Solv Protocol. In short, SFTs are
							dynamic “NFTs” that are able to be programmed and “equip” other
							“NFTs”.
						</p>
						<h1 style={{ color: "#FF4F0A" }} className={aboutStyles.headerText}>
							Vision
						</h1>
						<p className={aboutStyles.custombreak4}>
							We want to showcase a better way to tokenize digital collectibles.
							Second, we’d <br />
							like to offer a different perspective on valuing PFP collections -
							currently <br />
							rarity is tied to the whole RNG’d PFP work of art eg. you value{" "}
							<br /> CryptoPunk#2391 as it is. With Starkpilled the idea is to
							value traits over the
							<br />
							whole, so you can have a digital avatar that you can <br />
							identify with more meaningfully.
						</p>

						<Link
							className="connectWalletButton"
							style={{
								width: "173px",
								color: "white",
								padding: "15px",
								fontSize: "24px",
							}}
							href="/mint">
							Start Minting!
						</Link>
					</div>
				</div>
			</div>
			<FAQ></FAQ>
		</div>
	);
}
