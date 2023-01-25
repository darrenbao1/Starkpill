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
      }}
    >
      <div className={aboutStyles.entireBox}>
        <div className={aboutStyles.contentContainer}>
          <h1 className={aboutStyles.aboutTextShift}>About</h1>
          <Image
            src="https://arweave.net/YUOO4tIjNdw82NlYv3reVJ4pQJw7uZFkm0LKKVdLSEA/TestPill/pill_004012.png"
            className={aboutStyles.image}
            height={558}
            width={558}
            alt=""
          ></Image>
          <div className={aboutStyles.text}>
            <h1 className={aboutStyles.headerText} style={{ color: "#FF4F0A" }}>
              {" "}
              About
            </h1>
            <Link
              href="https://twitter.com/GuthL/status/1594292390092750848?s=20&t=XaDDRn52fCJ5adU_GxeoHg"
              target="_blank"
            >
              <u>Great memes</u>
            </Link>
            &nbsp;beget more memes
            <br />
            Starkpilled is an SFT (Semi-Fungible Token) collection of digital
            avatars for people to celebrate to the StarkNet Ecosystem and
            participate in the SFT movement.
            <br />
            Compared to traditional NFT collections that are of the ERC-721
            token standard, Starkpills are ERC-2114s’ a Seraph Labs tweak of the
            novel ERC-3525 developed by Solv Protocol. In short, SFTs are
            dynamic “NFTs” that are able to be programmed and “equip” other
            “NFTs”.
            <br />
            <h1 style={{ color: "#FF4F0A" }} className={aboutStyles.headerText}>
              {" "}
              Vision
            </h1>
            We want to showcase a better way to tokenize digital collectibles.
            Second, we’d like to offer a different perspective on valuing PFP
            collections - currently rarity is tied to the whole RNG’d PFP work
            of art eg. you value CryptoPunk#2391 as it is. With Starkpilled the
            idea is to value traits over the whole, so you can have a digital
            avatar that you can identify with more meaningfully.
            <br />
            <br />
            <Link
              className="connectWalletButton"
              style={{
                width: "fit-content",
                color: "white",
                padding: "15px",
              }}
              href="/mint"
            >
              Start Minting!
            </Link>
          </div>
        </div>
      </div>
      <FAQ></FAQ>
    </div>
  );
}
