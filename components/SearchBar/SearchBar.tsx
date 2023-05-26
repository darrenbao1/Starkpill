import React, { useEffect, useState, useCallback, useRef } from "react";
import { useLazyQuery } from "@apollo/client";
import { GET_TOKEN_BY_ID } from "../../types/constants";
import { StarkPillCard } from "../StarkPillCard/StarkPillCard";
import { debounce } from "lodash";
import {
	Cross,
	Header,
	Icon,
	NoResults,
	SadFace,
	SearchBarContainer,
	SearchBarInput,
	SearchBarInputContainer,
	SearchQueryText,
	SearchResultsContainer,
	SearchResultsModal,
	StarkpillCardContainer,
} from "./SearchBar.style";
import SearchIcon from "../../public/png/SearchInputIcon.png";
import SearchCross from "../../public/png/SearchInputClose.png";
import SadFaceIcon from "../../public/png/system-uicons_face-sad.png";
interface SearchBarProps {
	onSearchQuery: (query: number) => void;
	onClearSearchQuery?: () => void;
	setShowResults: (show: boolean) => void;
}
const SearchBar: React.FC<SearchBarProps> = ({
	onSearchQuery,
	onClearSearchQuery,
	setShowResults,
}) => {
	const [searchQuery, setSearchQuery] = useState(0);
	const inputRef = useRef<HTMLInputElement>(null);
	const [searchToken, { loading, data }] = useLazyQuery(GET_TOKEN_BY_ID, {
		variables: { tokenId: searchQuery },
	});

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		console.log(event.target.value);
		setSearchQuery(Number(event.target.value));
		onSearchQuery(Number(event.target.value));
		searchToken({ variables: { tokenId: Number(event.target.value) } });

		if (event.target.value === "") {
			setShowResults(false);
		}
	};

	const debouncedHandleInputChange = useCallback(
		debounce(handleInputChange, 300),
		[]
	);
	const handleSearch = () => {
		searchToken({ variables: { tokenId: searchQuery } });
	};

	const clearSearchQuery = () => {
		setSearchQuery(0);
		if (inputRef.current) {
			inputRef.current.value = "";
		}
		if (onClearSearchQuery) {
			onClearSearchQuery();
		}
	};

	useEffect(() => {}, [data]);

	return (
		<>
			<SearchBarContainer>
				<Icon src={SearchIcon} alt="SearchIcon" />
				<SearchBarInput
					ref={inputRef}
					type="number"
					onChange={debouncedHandleInputChange}
					placeholder="Search for pill"
				/>

				<Cross
					src={SearchCross}
					alt="SearchCross"
					onClick={clearSearchQuery}
					searchQuery={searchQuery}
				/>
			</SearchBarContainer>
			{searchQuery !== 0 && (
				<SearchResultsContainer>
					<SearchResultsModal>
						{loading && <p>Loading...</p>}
						{data && data.token && (
							<>
								<Header>
									<p>Search Results for &ldquo;{searchQuery}&ldquo;</p>
								</Header>
								<StarkpillCardContainer>
									<StarkPillCard
										ownerAddress={data.token.owner.address}
										imageUrl={data.token.metadata.imageUrl}
										mintPrice={data.token.metadata.mintPrice}
										tokenId={data.token.id}
										fame={data.token.metadata.fame}
										rank={0}
									/>
								</StarkpillCardContainer>
							</>
						)}
					</SearchResultsModal>
					{!data && !loading && (
						<NoResults>
							<SadFace src={SadFaceIcon} alt=""></SadFace>
							<p>Sorry, we could not find any results for</p>

							<SearchQueryText>&ldquo;{searchQuery}&ldquo;</SearchQueryText>
							<p>Please try another search</p>
						</NoResults>
					)}
				</SearchResultsContainer>
			)}
		</>
	);
};

export default SearchBar;
