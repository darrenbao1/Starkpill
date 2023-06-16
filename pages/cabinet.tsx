import { useState, useEffect, useRef, useCallback } from "react";
// import { StarkPillCard } from "../components/StarkPillCard"; <<Previous StarkPillCard
import { StarkPillCard } from "../components/StarkPillCard/StarkPillCard";
import styles from "../styles/cabinet.module.css";
import { useQuery, gql } from "@apollo/client";
import sharedBackgroundStyles from "../styles/sharedBackground.module.css";
import SortIcon from "../public/svgs/sortIcon.svg";
import { DROPDOWN_MENU_ITEMS, handleScrollToTop } from "../types/constants";
import { BackToTopButton } from "../components/BackToTopButton";
import { useSelector } from "react-redux";
import { debounce } from "lodash";
import { useLazyQuery } from "@apollo/client";
import { GET_TOKEN_BY_ID } from "../types/constants";
import SearchBar2 from "../components/SearchBar2/SearchBar2";
import SadFaceIcon from "../public/png/system-uicons_face-sad.png";
import {
	Header,
	NoResults,
	SadFace,
	SearchQueryText,
	SearchResultsContainer,
	SearchResultsModal,
	SearchResultsWrapper,
	StarkpillCardContainer,
} from "../components/SearchBar2/SearchBar2.styles";
import Loading from "../components/Loading/Loading";

export default function Cabinet() {
	const offsetIncrement = 20; //number of pills per load
	const [offsetAmount, setOffsetAmount] = useState(0);
	const [loading, setLoading] = useState(false);
	const [loadedAllPills, setIsLoadedAllPills] = useState(false);
	const [sortOption, setSortOption] = useState(0); // is the index of the DROPDOWN_MENU_ITEMS
	const [showDropbox, setShowDropbox] = useState(false);
	const scrollTopRef = useRef<HTMLDivElement>(null);
	const [showButton, setShowButton] = useState(false);
	const reduxState = useSelector((state: any) => state.refetch);
	const [showResults, setShowResults] = useState(false);
	const [searchQueryResult, setSearchQueryResult] = useState<any[]>([]); //array of tokenIds
	const [searchQuery, setSearchQuery] = useState(0);
	const [searchToken, { loading: searchLoading, data: searchData }] =
		useLazyQuery(GET_TOKEN_BY_ID, {
			variables: { tokenId: searchQuery },
		});
	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		console.log(event.target.value);
		setSearchQuery(Number(event.target.value));
		setShowResults(true);

		searchToken({ variables: { tokenId: Number(event.target.value) } });

		if (event.target.value === "") {
			setShowResults(false);
		}
	};
	const debouncedHandleInputChange = useCallback(
		debounce(handleInputChange, 300),
		[]
	);
	const handleSearchQuery = (query: number) => {
		console.log("Search query:", query);
		setShowResults(true);
	};
	const handleClearSearchQuery = () => {
		setShowResults(false);
	};

	function useOutsideAlerter(ref: any) {
		useEffect(() => {
			function handleClickOutside(event: any) {
				if (ref.current && !ref.current.contains(event.target)) {
					setShowDropbox(false);
				}
			}

			document.addEventListener("mousedown", handleClickOutside);
			return () => {
				document.removeEventListener("mousedown", handleClickOutside);
			};
		}, [ref]);
	}
	const wrapperRef = useRef(null);
	useOutsideAlerter(wrapperRef);
	const handleScroll = async (e: any) => {
		const bottom =
			e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
		if (bottom && !loading && !loadedAllPills && !showResults) {
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
		if (e.target.scrollTop >= 300) {
			setShowButton(true);
		} else if (e.target.scrollTop < 300) {
			setShowButton(false);
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

					<div className={styles.loadingWrapper}>
						<Loading />
					</div>
				</div>
			</div>
		);
	}
	const tokenIds = data[DROPDOWN_MENU_ITEMS[sortOption].keyName];
	const handleOptionChange = (event: any) => {
		setSortOption(Number(event.target.value));
		setShowDropbox(false);
	};

	return (
		<div
			className={`container ${sharedBackgroundStyles.extendedBackground}`}
			onScroll={(e) => handleScroll(e)}
			ref={scrollTopRef}>
			<div className="contentContainer">
				<div>
					<div className={styles.searchBarSortWrapper}>
						<div
							className={styles.searchBarSortContainer}
							style={{ marginRight: showResults ? "30px" : "" }}>
							<SearchBar2
								onSearchQuery={handleSearchQuery}
								onClearSearchQuery={handleClearSearchQuery}
								setShowResults={setShowResults}
								setSearchQueryResult={setSearchQueryResult}
								onChange={debouncedHandleInputChange}
								searchQuery={searchQuery}
								setSearchQuery={setSearchQuery}
							/>
						</div>
						{!showResults && (
							<div className={styles.sortWrapper} ref={wrapperRef}>
								<div className={styles.sortContainer}>
									<div className={styles.dropdownWrapper}>
										<button
											className={styles.sortButton}
											onClick={() => setShowDropbox(!showDropbox)}>
											<SortIcon style={{ margin: "auto" }} />
											<span>
												Sort ({DROPDOWN_MENU_ITEMS[sortOption].label})
											</span>
										</button>

										{showDropbox && (
											<div className={styles.dropdownMenu}>
												{DROPDOWN_MENU_ITEMS.map((item, index) => (
													<label
														htmlFor={`option${index}`}
														className={styles.radioLabel}
														key={index}>
														<input
															className={styles.radioInput}
															type="radio"
															id={`option${index}`}
															value={index}
															checked={sortOption == index}
															onChange={handleOptionChange}
														/>
														<span className={styles.customRadio} />
														<span style={{ marginLeft: "16px" }}>
															{item.label}
														</span>
													</label>
												))}
											</div>
										)}
									</div>
								</div>
							</div>
						)}
					</div>
				</div>
				{showResults ? (
					<>
						{searchQuery !== 0 && (
							<SearchResultsWrapper>
								<SearchResultsContainer>
									<SearchResultsModal>
										{searchLoading && <p>Loading...</p>}
										{searchData && searchData.token && (
											<>
												<Header>
													<p>Search Results for &ldquo;{searchQuery}&ldquo;</p>
												</Header>
												<StarkpillCardContainer>
													<StarkPillCard
														ownerAddress={searchData.token.owner.address}
														imageUrl={searchData.token.metadata.imageUrl}
														mintPrice={searchData.token.metadata.mintPrice}
														tokenId={searchData.token.id}
														fame={searchData.token.metadata.fame}
														rank={0}
													/>
												</StarkpillCardContainer>
											</>
										)}
									</SearchResultsModal>
									{!searchData && !searchLoading && (
										<NoResults>
											<SadFace src={SadFaceIcon} alt="" />
											<p>Sorry, we could not find any results for</p>

											<SearchQueryText>
												&ldquo;{searchQuery}&ldquo;
											</SearchQueryText>
											<p>Please try another search</p>
										</NoResults>
									)}
								</SearchResultsContainer>
							</SearchResultsWrapper>
						)}
					</>
				) : (
					<>
						{sortOption != 3 && (
							<h1
								style={{
									textAlign: "center",
									fontSize: "40px",
									marginTop: "-35px",
								}}>
								Top 3 Starkpills
							</h1>
						)}
						<div className={styles.top3Container}>
							{sortOption != 3 &&
								tokenIds
									.slice(0, 3)
									.map((token: any, index: number) => (
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
						<h1
							style={
								sortOption === 3
									? {
											textAlign: "center",
											marginTop: "-1rem",
											fontSize: "40px",
									  }
									: { textAlign: "center", marginTop: "5rem", fontSize: "40px" }
							}>
							Starkpills
						</h1>
						<div className={styles.cardContainer}>
							{sortOption != 3
								? tokenIds
										.slice(3)
										.map((token: any, index: number) => (
											<StarkPillCard
												tokenId={token.id}
												ownerAddress={token.owner.address}
												mintPrice={token.metadata.mintPrice}
												imageUrl={token.metadata.imageUrl}
												key={index}
												rank={index + 4}
												fame={token.metadata.fame}
											/>
										))
								: tokenIds.map((token: any, index: number) => (
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
					</>
				)}
			</div>

			{showButton &&
				!reduxState.imageModalShown &&
				!reduxState.editPillModalShown && (
					<BackToTopButton
						scrollTopFunc={() => handleScrollToTop(scrollTopRef)}
					/>
				)}
			{loading && <div className="snackbar">Loading</div>}
		</div>
	);
}
