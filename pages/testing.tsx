import SearchBar2 from "../components/SearchBar2/SearchBar2";
import { useState, useCallback, useEffect } from "react";
import { StarkPillCard } from "../components/StarkPillCard/StarkPillCard";
import { useLazyQuery } from "@apollo/client";
import { GET_TOKEN_BY_ID } from "../types/constants";
import SadFaceIcon from "../public/png/system-uicons_face-sad.png";
import { debounce } from "lodash";
import sharedBackgroundStyles from "../styles/sharedBackground.module.css";

import {
	Header,
	NoResults,
	SadFace,
	SearchQueryText,
	SearchResultsContainer,
	SearchResultsModal,
	SearchResultsWrapper,
	StarkpillCardContainer,
} from "../styles/testing.styles";
export default function Testing() {
	const [searchQueryResult, setSearchQueryResult] = useState<any[]>([]); //array of tokenIds
	const [searchQuery, setSearchQuery] = useState(0);
	const [searchToken, { loading: searchLoading, data: searchData }] =
		useLazyQuery(GET_TOKEN_BY_ID, {
			variables: { tokenId: searchQuery },
		});
	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		console.log(event.target.value);
		setSearchQuery(Number(event.target.value));

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
	const [showResults, setShowResults] = useState(false);
	useEffect(() => {}, [searchData]);
	return (
		<div className={`container ${sharedBackgroundStyles.extendedBackground}`}>
			<div className="contentContainer">
				<div>
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
									<SadFace src={SadFaceIcon} alt=""></SadFace>
									<p>Sorry, we could not find any results for</p>

									<SearchQueryText>&ldquo;{searchQuery}&ldquo;</SearchQueryText>
									<p>Please try another search</p>
								</NoResults>
							)}
						</SearchResultsContainer>
					</SearchResultsWrapper>
				)}
			</div>
		</div>
	);
}
