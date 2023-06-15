import { useAccount } from "@starknet-react/core";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import styles from "../styles/cabinet.module.css";
import { StarkPillCard } from "../components/StarkPillCard/StarkPillCard";
import { useSelector } from "react-redux";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { convertToStandardWalletAddress } from "../types/utils";
import sharedBackgroundStyles from "../styles/sharedBackground.module.css";
import { GET_USER_TOKENS, handleScrollToTop } from "../types/constants";
import { BackToTopButton } from "../components/BackToTopButton";
import { Disconnected } from "../components/DisconnectedPage.tsx/Disconnected";
export default function Mypills() {
	const refetchState = useSelector((state: any) => state.refetch);
	const scrollTopRef = useRef<HTMLDivElement>(null);
	const { address } = useAccount();
	const router = useRouter();
	const [showButton, setShowButton] = useState(false);
	const { walletAddress } = router.query;
	const { data, loading, refetch } = useQuery(GET_USER_TOKENS, {
		variables: {
			address: walletAddress,
		},
	});
	useEffect(() => {
		setTimeout(() => {
			refetch();
		}, 3000);
	}, [refetchState.value, refetch, data]);
	if (loading) {
		return (
			<div className={`container ${sharedBackgroundStyles.extendedBackground}`}>
				<div className="contentContainer">
					<h1 style={{ textAlign: "center", paddingTop: "2rem" }}>my pills</h1>
					<div className={styles.cardContainer}>Loading</div>
				</div>
			</div>
		);
	}
	const tokenIds = data.user.tokens;
	const handleScroll = async (e: any) => {
		if (e.target.scrollTop >= 300) {
			setShowButton(true);
		} else if (e.target.scrollTop < 300) {
			setShowButton(false);
		}
	};
	return (
		<>
			{address && walletAddress == convertToStandardWalletAddress(address) ? (
				<div
					className={`container ${sharedBackgroundStyles.extendedBackground}`}
					ref={scrollTopRef}
					onScroll={(e) => handleScroll(e)}>
					<div className="contentContainer">
						<h1
							style={{
								textAlign: "center",
								paddingTop: "2rem",
								fontSize: "40px",
							}}>
							My Prescriptions
						</h1>
						{tokenIds.length == 0 && !loading && (
							<div style={{ textAlign: "center", width: "100%" }}>
								no pills found you can mint one &nbsp;
								<u>
									<Link href="/mint">here</Link>
								</u>
							</div>
						)}
						<div className={styles.cardContainer}>
							{tokenIds.map((token: any, index: number) => (
								<StarkPillCard
									tokenId={token.id}
									ingId={token.ingredient}
									bgId={token.background}
									ownerAddress={token.owner.address}
									mintPrice={token.metadata.mintPrice}
									imageUrl={token.metadata.imageUrl}
									isOwner={true} //true because at pills page.
									key={token.id}
									rank={0}
									fame={token.metadata.fame}
								/>
							))}
						</div>
					</div>
					{showButton &&
						!refetchState.imageModalShown &&
						!refetchState.editPillModalShown && (
							<BackToTopButton
								scrollTopFunc={() => handleScrollToTop(scrollTopRef)}
							/>
						)}
				</div>
			) : address &&
			  walletAddress != convertToStandardWalletAddress(address!) ? null : (
				<div
					className={`container ${sharedBackgroundStyles.extendedBackground}`}>
					<Disconnected text="You have to connect your wallet before viewing your Starkpills" />
				</div>
			)}
		</>
	);
}
