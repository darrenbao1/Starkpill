import { useState } from "react";
import { StarkPillCard } from "../components/StarkPillCard";
import styles from "../styles/cabinet.module.css";
import { useQuery, gql } from "@apollo/client";
import sharedBackgroundStyles from "../styles/sharedBackground.module.css";
import SortIcon from "../public/svgs/sortIcon.svg";
import {
	GET_ALL_TOKENS_BY_PRICE,
	GET_ALL_TOKENS_BY_FAME,
	GET_ALL_TOKENS_BY_LATEST,
} from "../types/constants";
export default function Cabinet() {
	const offsetIncrement = 20;
	const [offsetAmount, setOffsetAmount] = useState(0);
	const [loading, setLoading] = useState(false);
	const [loadedAllPills, setIsLoadedAllPills] = useState(false);
	const [sortOption, setSortOption] = useState(0);
	const [showDropbox, setShowDropbox] = useState(false);

	const handleSortChange = async (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		const value = parseInt(event.target.value);
		setSortOption(value);

		let currentQuery = GET_ALL_TOKENS_BY_PRICE;

		if (sortOption == 0) {
			currentQuery = GET_ALL_TOKENS_BY_PRICE;
		}
		if (sortOption == 1) {
			currentQuery = GET_ALL_TOKENS_BY_FAME;
		}
		if (sortOption == 2) {
			currentQuery = GET_ALL_TOKENS_BY_LATEST;
		}

		await refetch({ query: newQuery });
	};

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

	const {
		data,
		loading: loadingInit,
		fetchMore,
		refetch,
	} = useQuery(
		sortOption === 0 ? GET_ALL_TOKENS_BY_PRICE : GET_ALL_TOKENS_BY_FAME,
		{
			variables: {
				skip: 0,
				first: 20,
			},
		}
	);

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
				<div className={styles.sortWrapper}>
					<div className={styles.sortContainer}>
						<div className={styles.dropdownWrapper}>
							<button
								className={styles.sortButton}
								onClick={() => setShowDropbox(!showDropbox)}>
								<SortIcon /> Sort (Highest Price)
							</button>
							{showDropbox && (
								<div className={styles.dropdownMenu}>
									<label htmlFor="option1">
										<input
											type="radio"
											id="option1"
											value={0}
											checked={sortOption === 0}
											onChange={handleSortChange}
										/>
										Highest Price
									</label>
									<label htmlFor="option2">
										<input
											type="radio"
											id="option2"
											value={1}
											checked={sortOption === 1}
											onChange={handleSortChange}
										/>
										Highest Fame
									</label>
									<label htmlFor="option3">
										<input
											type="radio"
											id="option3"
											value={2}
											checked={sortOption === 2}
											onChange={handleSortChange}
										/>
										Latest
									</label>
								</div>
							)}
						</div>
					</div>
				</div>
				<h1 style={{ textAlign: "center" }}>Top 3 Starkpills</h1>
				<div className={styles.top3Container}>
					{tokenIds.slice(0, 3).map((token: any, index: number) => (
						<StarkPillCard
							tokenId={token.id}
							ownerAddress={token.owner.address}
							mintPrice={token.metadata.mintPrice}
							imageUrl={token.metadata.imageUrl}
							rank={index + 1}
							key={index}
							fame={token.metadata.fame}
						/>
					))}
				</div>
				<h1 style={{ textAlign: "center", paddingTop: "2rem" }}>Starkpills</h1>
				{/* <div>
					<label>
						<input
							type="radio"
							value={0}
							checked={sortOption === 0}
							onChange={handleSortChange}
						/>
						Sort by price
					</label>
					<label>
						<input
							type="radio"
							value={1}
							checked={sortOption === 1}
							onChange={handleSortChange}
						/>
						Sort by fame
					</label>
				</div> */}
				<div className={styles.cardContainer}>
					{tokenIds.slice(3).map((token: any, index: number) => (
						<StarkPillCard
							tokenId={token.id}
							ownerAddress={token.owner.address}
							mintPrice={token.metadata.mintPrice}
							imageUrl={token.metadata.imageUrl}
							key={index}
							rank={index + 4}
							fame={token.metadata.fame}
						/>
					))}
				</div>
			</div>
			{loading && <div className="snackbar">Loading</div>}
		</div>
	);
}
