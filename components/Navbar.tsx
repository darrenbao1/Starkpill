import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import styles from "../styles/Navbar.module.css";
import { PAGES } from "../types/constants";
import { ConnectWalletButton } from "./ConnectWalletButton";
import Hamburger from "../public/hamburger.svg";
import Cross from "../public/cross.svg";
import { LinksModal } from "./Modals/LinksModal";
export const Navbar = () => {
	const router = useRouter();
	const [showModal, setShowModal] = useState(false);

	return (
		<>
			<div className={styles.container}>
				<div className={styles.navbar}>
					<Link href="/mint" onClick={() => setShowModal(false)}>
						<div className={styles.logo}>getStarkpilled</div>
					</Link>
					<div className={styles.links}>
						{PAGES.map(
							(page, index) =>
								page.isActive && (
									<Link
										className={
											router.pathname == page.link
												? styles.link_active
												: styles.link
										}
										href={page.link}
										key={index}
									>
										{page.title}
									</Link>
								)
						)}
					</div>
					<div className={styles.buttonContainer}>
						<ConnectWalletButton />
					</div>
					{showModal ? (
						<div
							className={styles.hamburger_menu}
							onClick={() => setShowModal(false)}
						>
							{" "}
							<Cross />
						</div>
					) : (
						<div
							className={styles.hamburger_menu}
							onClick={() => setShowModal(true)}
						>
							<Hamburger />
						</div>
					)}
				</div>
			</div>
			{showModal && <LinksModal close={() => setShowModal(false)} />}
		</>
	);
};
