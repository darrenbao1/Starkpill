//Landing Page
import Image from "next/image";
import styles from "../styles/Home.module.css";
import ForwardIcon from "../public/forward.svg";
import Link from "next/link";
export default function Home() {
	return (
		<div className={styles.container}>
			<div className={styles.content}>
				<h1>getstarkpilled</h1>
				<h2>
					<Link href="/mint">
						<u>the doctor will see you now</u> &nbsp; <ForwardIcon />
					</Link>
				</h2>
			</div>
			<footer>
				by: &nbsp; &nbsp;
				<a href="https://www.seraphlabs.io/" target="_blank" rel="noreferrer">
					<Image
						src="/companyLogo.png"
						height={43}
						width={163}
						alt="seraphLabs"
					></Image>
				</a>
			</footer>
		</div>
	);
}
