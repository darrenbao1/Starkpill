import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import styles from "../styles/Navbar.module.css";
import { PAGES, USERPAGES } from "../types/constants";
import { ConnectWalletButton } from "./ConnectWalletButton/ConnectWalletButton";
import Hamburger from "../public/hamburger.svg";
import Cross from "../public/cross.svg";
import { LinksModal } from "./Modals/LinksModal";
import Image from "next/image";
import { useAccount } from "@starknet-react/core";
import { convertToStandardWalletAddress } from "../types/utils";
export const Navbar = () => {
	const router = useRouter();
	const [showModal, setShowModal] = useState(false);
	const { address } = useAccount();

	const openProfilePage = () => {
		router.push({
			pathname: "/profile",
			query: { walletAddress: convertToStandardWalletAddress(address!) },
		});
	};
	return (
		<>
			<div className={styles.container}>
				<div className={styles.navbar}>
					<Link href="/mint" onClick={() => setShowModal(false)}>
						<div className={styles.logo}>
							<Image
								src="/logo.png"
								width={200}
								height={60}
								alt=""
								style={{ marginTop: "10px" }}
							/>
						</div>
					</Link>
					<div className={styles.linkButtonContainer}>
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
											{page.title} {page.isBeta && <sup>Beta</sup>}
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
							{address && (
								<div className={styles.profileIcon}>
									<Image
										src="/MyProfileIcon.svg"
										width={40}
										height={40}
										alt="ProfilePage"
										onClick={() => openProfilePage()}
									/>
								</div>
							)}
						</div>
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
