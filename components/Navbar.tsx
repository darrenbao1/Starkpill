import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import styles from "../styles/Navbar.module.css";
import { PAGES, USERPAGES } from "../types/constants";
import { ConnectWalletButton } from "./ConnectWalletButton";
import Hamburger from "../public/hamburger.svg";
import Cross from "../public/cross.svg";
import { LinksModal } from "./Modals/LinksModal";
import Image from "next/image";
import Logo from "../public/logo.png";
import { useAccount } from "@starknet-react/core";
import { convertToStandardWalletAddress } from "../types/utils";
export const Navbar = () => {
	const router = useRouter();
	const [showModal, setShowModal] = useState(false);
	const { address } = useAccount();
	return (
		<>
			<div className={styles.container}>
				<div className={styles.navbar}>
					<Link href="/mint" onClick={() => setShowModal(false)}>
						<div className={styles.logo}>
							<Image
								src="/logo.png"
								width={267}
								height={83}
								alt=""
								style={{ marginTop: "10px" }}
							/>
						</div>
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
										key={index}>
										{page.title}
									</Link>
								)
						)}
						{address &&
							USERPAGES.map(
								(page, index) =>
									page.isActive && (
										<Link
											className={
												router.pathname == page.link
													? styles.link_active
													: styles.link
											}
											href={
												page.paramName
													? page.link +
													  page.paramName +
													  convertToStandardWalletAddress(address)
													: page.link
											}
											key={index}>
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
							onClick={() => setShowModal(false)}>
							<Cross />
						</div>
					) : (
						<div
							className={styles.hamburger_menu}
							onClick={() => setShowModal(true)}>
							<Hamburger />
						</div>
					)}
				</div>
			</div>
			{showModal && <LinksModal close={() => setShowModal(false)} />}
		</>
	);
};
