import { useQuery } from "@apollo/client";
import { GET_ALL_TRAITS_BY_ADDRESS } from "../../types/constants";
import {
	CardContainer,
	HeaderColumn,
	InventoryWrapper,
} from "./Inventory.styles";
import { InventoryCard } from "./InventoryCard";
import router from "next/router";
import { InventoryTokenObj } from "../../types/interfaces";

export const Inventory = () => {
	const { walletAddress } = router.query;
	const { data, loading, error } = useQuery(GET_ALL_TRAITS_BY_ADDRESS, {
		variables: {
			address: walletAddress,
		},
	});
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
	return (
		<InventoryWrapper>
			<HeaderColumn>Traits</HeaderColumn>
			<CardContainer>
				{ingredients.map((ingredient, index) => (
					<InventoryCard key={index} traitTokenObj={ingredient} />
				))}
			</CardContainer>
			<HeaderColumn>Background</HeaderColumn>
			<CardContainer>
				{backgrounds.map((background, index) => (
					<InventoryCard key={index} traitTokenObj={background} />
				))}
			</CardContainer>
		</InventoryWrapper>
	);
};
