import React, { useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { GET_TOKEN_BY_ID } from "../../types/constants";
import { StarkPillCard } from "../StarkPillCard/StarkPillCard";

const SearchBar: React.FC = () => {
	const [searchQuery, setSearchQuery] = useState(0);
	const [searchToken, { loading, data }] = useLazyQuery(GET_TOKEN_BY_ID, {
		variables: { tokenId: searchQuery },
	});

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		console.log(event.target.value);
		setSearchQuery(Number(event.target.value));
		searchToken({ variables: { tokenId: Number(event.target.value) } });
	};

	const handleSearch = () => {
		searchToken({ variables: { tokenId: searchQuery } });
	};
	useEffect(() => {}, [data]);
	return (
		<div>
			<input
				type="number"
				value={searchQuery}
				onChange={handleInputChange}
				placeholder="Enter token ID..."
			/>
			{loading && <p>Loading...</p>}
			{data && data.token && (
				<StarkPillCard
					ownerAddress={data.token.address}
					imageUrl={data.token.metadata.imageUrl}
					mintPrice={data.token.metadata.mintPrice}
					tokenId={data.token.id}
					fame={data.token.metadata.fame}
					rank={0}
				/>
			)}
			{!data && !loading && <p>Token not found</p>}
		</div>
	);
};

export default SearchBar;
