import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "../styles/Navbar.module.css";
import {
	GET_USER_PROFILE,
	GET_USER_PROFILE_BASIC,
	PAGES,
	USERPAGES,
} from "../types/constants";
import { ConnectWalletButton } from "./ConnectWalletButton/ConnectWalletButton";
import Hamburger from "../public/hamburger.svg";
import Cross from "../public/cross.svg";
import { LinksModal } from "./Modals/LinksModal";
import Image from "next/image";
import { useAccount } from "@starknet-react/core";
import { convertToStandardWalletAddress, getTokenImage } from "../types/utils";
import { useQuery } from "@apollo/client";
import { UserProfile, UserProfileBasic } from "../types/interfaces";
export const Navbar = () => {
	const router = useRouter();
	const [showModal, setShowModal] = useState(false);
	const [profilePictureUrl, setProfilePictureUrl] = useState<string | null>(
		null
	);
	const { address } = useAccount();

	const { data: profileResult } = useQuery(GET_USER_PROFILE_BASIC, {
		variables: {
			address: address ? convertToStandardWalletAddress(address) : null,
		},
		skip: !address,
	});

	const profile: UserProfileBasic = profileResult?.user;
	useEffect(() => {
		const fetchProfilePicture = async () => {
			try {
				const imageUrl = await getTokenImage(profile?.profilePictureTokenId);
				setProfilePictureUrl(imageUrl);
			} catch (error) {
				console.error("Error fetching profile picture:", error);
			}
		};

		if (profile?.profilePictureTokenId) {
			fetchProfilePicture();
		}
	}, [profile]);

	const openProfilePage = () => {
		router.push({
			pathname: "/profile",
			query: { walletAddress: convertToStandardWalletAddress(address!) },
		});
	};
	const { walletAddress } = router.query;
	const { data: userProfileData, refetch: refetchUserProfile } = useQuery<{
		user: UserProfile;
	}>(GET_USER_PROFILE, {
		variables: {
			address: walletAddress,
		},
	});

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
							{address && profile && profile.transactions.length > 0 && (
								<div className={styles.profileIcon}>
									<Image
										src={profilePictureUrl || "/basepill.png"}
										width={40}
										height={40}
										alt="ProfilePage"
										style={{ borderRadius: "50%" }}
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
			{showModal && (
				<LinksModal
					profile={profile}
					profilePictureUrl={
						profilePictureUrl ? profilePictureUrl : "/basepill.png"
					}
					close={() => setShowModal(false)}
				/>
			)}
		</>
	);
};
