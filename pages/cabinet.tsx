import { useState } from "react";
import { StarkPillCard } from "../components/StarkPillCard";
import styles from "../styles/cabinet.module.css";
import { useQuery, gql } from "@apollo/client";
import sharedBackgroundStyles from "../styles/sharedBackground.module.css";
export default function Cabinet() {
	const offsetIncrement = 20;
	const [offsetAmount, setOffsetAmount] = useState(0);
	const [loading, setLoading] = useState(false);
	const [loadedAllPills, setIsLoadedAllPills] = useState(false);

	const handleScroll = async (e: any) => {
		const bottom =
			e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
		if (bottom && !loading && !loadedAllPills) {
			setLoading(true);
			let i = offsetAmount + offsetIncrement;
			await fetchMore({
				variables: {
					skip: i,
				},
			})
				.then(({ data }) => {
					if (data.allTokens.length < offsetIncrement) {
						setIsLoadedAllPills(true);
					} else setOffsetAmount(offsetAmount + offsetIncrement);
				})
				.finally(() => {
					setLoading(false);
				});
		}
	};

	const GET_ALL_TOKENS = gql`
		query AllTokens($skip: Int, $first: Int) {
			allTokens(skip: $skip, first: $first) {
				id
				owner {
					address
				}
				metadata {
					mintPrice
					imageUrl
				}
			}
		}
	`;
	const {
		data,
		loading: loadingInit,
		fetchMore,
	} = useQuery(GET_ALL_TOKENS, {
		variables: {
			skip: 0,
			first: 20,
		},
	});
	if (loadingInit) {
		return (
			<div className={`container ${sharedBackgroundStyles.sharedBackground}`}>
				<div className="contentContainer">
					<h1 style={{ textAlign: "center", paddingTop: "2rem" }}>
						Starkpills
					</h1>
					<div className={styles.cardContainer}>Loading</div>
				</div>
			</div>
		);
	}
	const tokenIds = data.allTokens;

	return (
		<div
			className={`container ${sharedBackgroundStyles.extendedBackground}`}
			onScroll={(e) => handleScroll(e)}>
			<div className="contentContainer">
				<h1 style={{ textAlign: "center", paddingTop: "2rem" }}>
					Top 3 Starkpills
				</h1>
				<div className={styles.top3Container}>
					{tokenIds.slice(0, 3).map((token: any, index: number) => (
						<StarkPillCard
							tokenId={token.id}
							ownerAddress={token.owner.address}
							mintPrice={token.metadata.mintPrice}
							imageUrl={token.metadata.imageUrl}
							rank={index + 1}
							key={index}
						/>
					))}
				</div>
				<h1 style={{ textAlign: "center", paddingTop: "2rem" }}>Starkpills</h1>
				<div className={styles.cardContainer}>
					{tokenIds.slice(3).map((token: any, index: number) => (
						<StarkPillCard
							tokenId={token.id}
							ownerAddress={token.owner.address}
							mintPrice={token.metadata.mintPrice}
							imageUrl={token.metadata.imageUrl}
							key={index}
							rank={index + 4}
						/>
					))}
				</div>
			</div>
			{loading && <div className="snackbar">Loading</div>}
		</div>
	);
}
