import Prescriptions from "../components/Prescriptions/Prescriptions";
import { useRef, useState } from "react";
import styles from "../styles/cabinet.module.css";
import sharedBackgroundStyles from "../styles/sharedBackground.module.css";
import { GET_USER_TOKENS, handleScrollToTop } from "../types/constants";
import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { BackToTopButton } from "../components/BackToTopButton";
import { useAccount } from "@starknet-react/core";
import { convertToStandardWalletAddress } from "../types/utils";
import { Disconnected } from "../components/DisconnectedPage.tsx/Disconnected";
export default function Mypills() {
	const [toggleTabState, setToggleTabState] = useState(1);
	const toggleTabStateHandler = (index: number) => {
		setToggleTabState(index);
	};
	const handleScroll = async (e: any) => {
		if (e.target.scrollTop >= 300) {
			setShowButton(true);
		} else if (e.target.scrollTop < 300) {
			setShowButton(false);
		}
	};
	const refetchState = useSelector((state: any) => state.refetch);
	const scrollTopRef = useRef<HTMLDivElement>(null);
	const { address } = useAccount();
	const router = useRouter();
	const [showButton, setShowButton] = useState(false);
	const { walletAddress } = router.query;
	const { data, refetch } = useQuery(GET_USER_TOKENS, {
		variables: {
			address: walletAddress,
		},
	});
	useEffect(() => {
		setTimeout(() => {
			refetch();
			console.log(data);
		}, 3000);
	}, [refetchState.value, refetch, data]);

	return (
		<div
			className={`container ${sharedBackgroundStyles.extendedBackground}`}
			ref={scrollTopRef}
			onScroll={(e) => handleScroll(e)}>
			{address && walletAddress == convertToStandardWalletAddress(address) ? (
				<div>
					<div className={styles.headerContainer}>
						<div className={styles.cabinetHeader}> My Cabinet</div>
						<div className={styles.blocTabs}>
							<div
								className={
									toggleTabState === 1 ? styles.activeTabs : styles.tabs
								}
								onClick={() => toggleTabStateHandler(1)}>
								Prescriptions
							</div>
							<div
								className={
									toggleTabState === 2 ? styles.activeTabs : styles.tabs
								}
								onClick={() => toggleTabStateHandler(2)}>
								Inventory
							</div>
						</div>
					</div>

					{toggleTabState === 1 ? (
						<Prescriptions />
					) : (
						<div>
							<h1>Inventory</h1>
						</div>
					)}
				</div>
			) : (
				<div
					className={`container ${sharedBackgroundStyles.extendedBackground}`}>
					<Disconnected text="You have to connect your wallet before viewing your Starkpills" />
				</div>
			)}
			{showButton &&
				!refetchState.imageModalShown &&
				!refetchState.editPillModalShown && (
					<BackToTopButton
						scrollTopFunc={() => handleScrollToTop(scrollTopRef)}
					/>
				)}
		</div>
	);
}
