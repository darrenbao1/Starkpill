import { useQuery } from "@apollo/client";
import { GET_ALL_TRAITS_BY_ADDRESS } from "../../types/constants";
import {
	CardContainer,
	HeaderColumn,
	InventoryWrapper,
	LoadingWrapper,
	ShowAllButton,
} from "./Inventory.styles";
import { InventoryCard } from "./InventoryCard";
import router from "next/router";
import { InventoryTokenObj } from "../../types/interfaces";
import Loading from "../Loading/Loading";
import { useEffect, useState } from "react";
import UserBackPackTokenProvider from "../Provider/UserBackpackTokenProvider";

function useWindowSize() {
	// detect window screen width function

	const [windowSize, setWindowSize] = useState({
		width: 0,
		height: 0,
	});

	useEffect(() => {
		function handleResize() {
			setWindowSize({
				width: window.innerWidth,
				height: window.innerHeight,
			});
		}
		window.addEventListener("resize", handleResize);

		handleResize();

		// Remove event listener on cleanup
		return () => window.removeEventListener("resize", handleResize);
	}, []); // Empty array ensures that effect is only run on mount
	return windowSize;
}

export const Inventory = () => {
	const size = useWindowSize();
	const [showAllTraits, setShowAllTraits] = useState(false);
	const [showAllBackgrounds, setShowAllBackgrounds] = useState(false);
	const { walletAddress } = router.query;
	const { data, loading, error } = useQuery(GET_ALL_TRAITS_BY_ADDRESS, {
		variables: {
			address: walletAddress,
		},
	});

	if (loading)
		return (
			<LoadingWrapper>
				<Loading />{" "}
			</LoadingWrapper>
		);

	const traitsPerRow =
		size.width > 1350
			? 6
			: size.width > 1130
			? 5
			: size.width > 900
			? 4
			: size.width > 670
			? 3
			: size.width > 450
			? 2
			: size.width > 0
			? 1
			: 0;
	if (loading) return <div>Loading...</div>;

	if (error) return <div>Error! {error.message}</div>;

	const backpackTokens = data.user.backpackTokens;
	const equippedTokens = data.user.equippedTraitTokens;

	const allTokens = [...backpackTokens, ...equippedTokens];
	const ingredients: InventoryTokenObj[] = [];
	const backgrounds: InventoryTokenObj[] = [];
	//map throught allTokens and check the attribute isIngredient
	//if true, add to ingredients array
	allTokens.map((tokenObj) => {
		const token = tokenObj.traitMetadata;
		if (token.isIngredient) {
			ingredients.push(token);
		} else {
			backgrounds.push(token);
		}
	});

	//if false, add to traits array
	if (ingredients.length === 0 && backgrounds.length === 0) {
		return (
			<InventoryWrapper>
				<HeaderColumn>No Traits Found</HeaderColumn>
			</InventoryWrapper>
		);
	}
	return (
		<UserBackPackTokenProvider.Provider
			value={[...ingredients, ...backgrounds]}>
			<InventoryWrapper>
				{ingredients.length > 0 && (
					<>
						<HeaderColumn>Traits</HeaderColumn>
						<CardContainer>
							{ingredients.slice(0, traitsPerRow).map((ingredient, index) => (
								<InventoryCard key={index} traitTokenObj={ingredient} />
							))}

							{showAllTraits &&
								ingredients
									.slice(traitsPerRow)
									.map((ingredient, index) => (
										<InventoryCard key={index} traitTokenObj={ingredient} />
									))}
						</CardContainer>
						{ingredients.length > traitsPerRow && (
							<ShowAllButton onClick={() => setShowAllTraits(!showAllTraits)}>
								{showAllTraits ? "Show Less" : "Show All"}
							</ShowAllButton>
						)}
					</>
				)}
				{backgrounds.length > 0 && (
					<>
						<HeaderColumn>Background</HeaderColumn>
						<CardContainer>
							{backgrounds.slice(0, traitsPerRow).map((background, index) => (
								<InventoryCard key={index} traitTokenObj={background} />
							))}
							{showAllBackgrounds &&
								backgrounds
									.slice(traitsPerRow)
									.map((background, index) => (
										<InventoryCard key={index} traitTokenObj={background} />
									))}
						</CardContainer>
						{backgrounds.length > traitsPerRow && (
							<ShowAllButton
								onClick={() => setShowAllBackgrounds(!showAllBackgrounds)}>
								{showAllBackgrounds ? "Show Less" : "Show All"}
							</ShowAllButton>
						)}
					</>
				)}
			</InventoryWrapper>
		</UserBackPackTokenProvider.Provider>
	);
};
