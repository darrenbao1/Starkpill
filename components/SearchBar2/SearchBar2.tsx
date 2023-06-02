import React, { useRef } from "react";

import {
	Cross,
	Icon,
	SearchBarContainer,
	SearchBarInput,
} from "./SearchBar2.styles";
import SearchIcon from "../../public/png/SearchInputIcon.png";
import SearchCross from "../../public/png/SearchInputClose.png";

interface SearchBarProps {
	onSearchQuery: (query: number) => void;
	onClearSearchQuery?: () => void;
	setShowResults: (show: boolean) => void;
	setSearchQueryResult: (result: any[]) => void;
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	searchQuery: number;
	setSearchQuery: (query: number) => void;
}
const SearchBar2: React.FC<SearchBarProps> = ({
	onChange,
	onClearSearchQuery,
	searchQuery,
	setSearchQuery,
}) => {
	const inputRef = useRef<HTMLInputElement>(null);

	const ClearInput = () => {
		setSearchQuery(0);
		if (inputRef.current) {
			inputRef.current.value = "";
		}
		if (onClearSearchQuery) {
			onClearSearchQuery();
		}
	};

	return (
		<>
			<SearchBarContainer>
				<Icon src={SearchIcon} alt="SearchIcon" />
				<SearchBarInput
					ref={inputRef}
					type="number"
					onChange={onChange}
					placeholder="Search for pill"
				/>

				<Cross
					src={SearchCross}
					alt="SearchCross"
					onClick={ClearInput}
					searchQuery={searchQuery}
				/>
			</SearchBarContainer>
		</>
	);
};

export default SearchBar2;
