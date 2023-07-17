//Landing Page
import Image from "next/image";
import styles from "../styles/Home.module.css";
import ForwardIcon from "../public/forward.svg";
import Link from "next/link";
import Head from "next/head";
export default function Home() {
	return (
		<div className={styles.container}>
			<div className={styles.content}>
				<Link href="/mint" className={styles.link}>
					<h1 className={styles.outline}>
						<span style={{ marginTop: "-20px" }}>getstarkpilled</span>
						<Image
							src="/landingPage.png"
							width={150}
							height={150}
							alt=""></Image>
						<ForwardIcon style={{ marginTop: "-10px" }} />
					</h1>
				</Link>
			</div>
			<footer>
				<a href="https://www.seraphlabs.io/" target="_blank" rel="noreferrer">
					<Image
						src="/companyLogo.png"
						height={40}
						width={136}
						alt="seraphLabs"></Image>
				</a>
			</footer>
		</div>
	);
}
