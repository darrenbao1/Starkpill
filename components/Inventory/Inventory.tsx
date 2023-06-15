import { useQuery } from "@apollo/client";
import { GET_ALL_TRAITS_BY_ADDRESS } from "../../types/constants";
import {
	CardContainer,
	HeaderColumn,
	InventoryWrapper,
} from "./Inventory.styles";
import { InventoryCard } from "./InventoryCard";

interface InventoryTokenObj {
	id: number;
	imageUrl: string;
	isIngredient: boolean;
	itemName: string;
	equippedById: number;
}

export const Inventory = () => {
	const { data, loading, error } = useQuery(GET_ALL_TRAITS_BY_ADDRESS, {
		variables: {
			address:
				"0x0728c8dd49322ab110c0fb295fb093aa7c5a4a423004d606c0a320f44d35684e",
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
					<InventoryCard
						key={index}
						id={ingredient.id}
						itemName={ingredient.itemName}
						imageUrl={ingredient.imageUrl}
						equippedById={ingredient.equippedById}
						isIngredient={ingredient.isIngredient}
					/>
				))}
			</CardContainer>
			<HeaderColumn>Background</HeaderColumn>
			<CardContainer>
				{backgrounds.map((background, index) => (
					<InventoryCard
						key={index}
						id={background.id}
						itemName={background.itemName}
						imageUrl={background.imageUrl}
						equippedById={background.equippedById}
						isIngredient={background.isIngredient}
					/>
				))}
			</CardContainer>
		</InventoryWrapper>
	);
};
