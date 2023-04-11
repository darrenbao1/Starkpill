import { useState } from "react";
import { StarkPillCard } from "../components/StarkPillCard";
import styles from "../styles/cabinet.module.css";
import { useQuery, gql } from "@apollo/client";
import sharedBackgroundStyles from "../styles/sharedBackground.module.css";
import SortIcon from "../public/svgs/sortIcon.svg";
import { DROPDOWN_MENU_ITEMS } from "../types/constants";
export default function Cabinet() {
	const offsetIncrement = 20; //number of pills per load
	const [offsetAmount, setOffsetAmount] = useState(0);
	const [loading, setLoading] = useState(false);
	const [loadedAllPills, setIsLoadedAllPills] = useState(false);
	const [sortOption, setSortOption] = useState(0);
	const [showDropbox, setShowDropbox] = useState(false);

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
					if (data[DROPDOWN_MENU_ITEMS[sortOption].keyName] < offsetIncrement) {
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
	} = useQuery(DROPDOWN_MENU_ITEMS[sortOption].query, {
		variables: {
			skip: 0,
			first: offsetIncrement,
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
	const tokenIds = data[DROPDOWN_MENU_ITEMS[sortOption].keyName];
	const handleOptionChange = (event: any) => {
		console.log(Number(event.target.value));
		setSortOption(Number(event.target.value));
		setShowDropbox(false);
	};
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
								<SortIcon /> Sort ({DROPDOWN_MENU_ITEMS[sortOption].label})
							</button>

							{showDropbox && (
								<div className={styles.dropdownMenu}>
									{DROPDOWN_MENU_ITEMS.map((item, index) => (
										<label
											htmlFor={`option${index}`}
											className={styles.radioLabel}>
											<input
												className={styles.radioInput}
												type="radio"
												id={`option${index}`}
												value={index}
												checked={sortOption == index}
												onChange={handleOptionChange}
											/>
											<span className={styles.customRadio} />
											{item.label}
										</label>
									))}
									{/* <label htmlFor="option1">
										<input
											type="radio"
											id="option1"
											value={0}
											checked={sortOption == 0}
											onChange={handleOptionChange}
										/>
										{DROPDOWN_MENU_ITEMS[0].label}
									</label>
									<label htmlFor="option2">
										<input
											type="radio"
											id="option2"
											value={1}
											checked={sortOption === 1}
											onChange={handleOptionChange}
										/>
										{DROPDOWN_MENU_ITEMS[1].label}
									</label>
									<label htmlFor="option3">
										<input
											type="radio"
											id="option3"
											value={2}
											checked={sortOption === 2}
											onChange={handleOptionChange}
										/>
										{DROPDOWN_MENU_ITEMS[2].label}
									</label> */}
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
