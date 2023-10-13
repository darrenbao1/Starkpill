import Link from "next/link";
import { useRouter } from "next/router";
import styles from "../../styles/LinksModal.module.css";
import { PAGES, USERPAGES } from "../../types/constants";
import { useAccount } from "@starknet-react/core";
import {
	convertToStandardWalletAddress,
	shortenAddress,
} from "../../types/utils";
import { UserProfileBasic } from "../../types/interfaces";
import Image from "next/image";

export const LinksModal = (props: {
	profilePictureUrl: string;
	profile: UserProfileBasic;
	close: () => void;
}) => {
	const router = useRouter();
	const { address } = useAccount();
	const openProfilePage = () => {
		router.push({
			pathname: "/profile",
			query: { walletAddress: convertToStandardWalletAddress(address!) },
		});
		props.close();
	};

	return (
		<div className={styles.modalContainer} style={{ zIndex: 1 }}>
			<ul className={styles.modalItems}>
				{address && props.profile && props.profile.transactions.length > 0 && (
					<div
						className={styles.profileLinkWrapper}
						onClick={() => openProfilePage()}>
						<div className={styles.profileIcon}>
							<Image
								src={props.profilePictureUrl || "/basepill.png"}
								width={60}
								height={60}
								alt="ProfilePage"
								style={{ borderRadius: "50%" }}
								onClick={() => openProfilePage()}
							/>
						</div>

						<h1>
							{props.profile.username
								? props.profile.username
								: shortenAddress(props.profile.address)}
						</h1>
					</div>
				)}
				{PAGES.map(
					(page, index) =>
						page.isActive && (
							<li key={index}>
								<Link
									className={
										router.pathname == page.link
											? styles.navbar_link_active
											: styles.navbar_link
									}
									href={page.link}
									onClick={props.close}>
									{page.title} {page.isBeta && <sup>Beta</sup>}
								</Link>
							</li>
						)
				)}
				{address &&
					USERPAGES.map(
						(page, index) =>
							page.isActive && (
								<li key={index}>
									<Link
										className={
											router.pathname == page.link
												? styles.navbar_link_active
												: styles.navbar_link
										}
										href={
											page.paramName
												? page.link +
												  page.paramName +
												  convertToStandardWalletAddress(address)
												: page.link
										}
										onClick={props.close}>
										{page.title}
									</Link>
								</li>
							)
					)}
			</ul>
		</div>
	);
};
