import Link from "next/link";
import {
	AboutContainer,
	AboutImage,
	AboutText,
	StartMintButton,
	Paragraph1,
	Paragraph2,
	Paragraph3,
	Paragraph4,
} from "./AboutSection.styles";
export const AboutSection = () => {
	return (
		<AboutContainer>
			<AboutImage src="/About.gif" alt="gif" height={700} width={700} />
			<AboutText>
				<h1>About</h1>
				<Paragraph1>
					<Link
						href="https://twitter.com/GuthL/status/1594292390092750848?s=20&t=XaDDRn52fCJ5adU_GxeoHg"
						target="_blank">
						<u>Great memes</u>
					</Link>
					&nbsp;beget more memes
				</Paragraph1>
				<Paragraph2>
					Starkpilled is an SFT (Semi-Fungible Token) collection of digital
					avatars for <br />
					people to celebrate to the StarkNet Ecosystem and participate in the
					SFT movement.
				</Paragraph2>
				<Paragraph3>
					Compared to traditional NFT collections that are of the ERC-721 token
					standard, Starkpills are ERC-2114s’ a Seraph Labs tweak of the novel
					<br /> ERC-3525 developed by Solv Protocol. In short, SFTs are dynamic
					“NFTs” that are able to be programmed and “equip” other “NFTs”.
				</Paragraph3>
				<h1>Vision</h1>
				<Paragraph4>
					We want to showcase a better way to tokenize digital collectibles.
					Second, we’d <br />
					like to offer a different perspective on valuing PFP collections -
					currently <br />
					rarity is tied to the whole RNG’d PFP work of art eg. you value <br />{" "}
					CryptoPunk#2391 as it is. With Starkpilled the idea is to value traits
					over the
					<br />
					whole, so you can have a digital avatar that you can <br />
					identify with more meaningfully.
				</Paragraph4>
				<StartMintButton href="/mint">Start Minting!</StartMintButton>
			</AboutText>
		</AboutContainer>
	);
};
