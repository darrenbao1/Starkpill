import { useAccount } from "@starknet-react/core";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import styles from "../../styles/cabinet.module.css";
import { StarkPillCard } from "../../components/StarkPillCard/StarkPillCard";
import { useSelector } from "react-redux";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import sharedBackgroundStyles from "../../styles/sharedBackground.module.css";
import { GET_USER_TOKENS } from "../../types/constants";

export default function Prescriptions() {
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
			console.log(data);
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
			<div className="contentContainer">
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
		</>
	);
}
