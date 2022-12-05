//Landing Page
import Image from "next/image";
import styles from "../styles/Home.module.css";
import ForwardIcon from "../public/forward.svg";
import Link from "next/link";
export default function Home() {
	return (
		<div className={styles.container}>
			<div className={styles.content}>
				<h1>
					getstarkpilled
					<Image src="/landingPage.png" width={150} height={150} alt=""></Image>
				</h1>
				<h2>
					<Link href="/mint" className={styles.link}>
						<u>the doctor will see you now</u> &nbsp; &nbsp;
						<div style={{ marginTop: "5px" }}>
							<ForwardIcon />
						</div>
					</Link>
				</h2>
			</div>
			<footer>
				by: &nbsp; &nbsp;
				<a href="https://www.seraphlabs.io/" target="_blank" rel="noreferrer">
					<Image
						src="/companyLogo.png"
						height={40}
						width={136}
						alt="seraphLabs"
					></Image>
				</a>
			</footer>
		</div>
	);
}
