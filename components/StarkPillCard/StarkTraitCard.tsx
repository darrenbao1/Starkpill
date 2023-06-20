import { eq } from "lodash";
import { FACE_TRAITS } from "../../types/constants";
import { InventoryTokenObj } from "../../types/interfaces";
import { shortenAddress } from "../../types/utils";
import {
	Card,
	CardImage,
	CardInnerContainer,
	Content,
	HeaderContainer,
	PillIdSpan,
} from "./StarkTraitCard.styles";

interface Props {
	traitObj: InventoryTokenObj;
	searchPillManual: (tokenId: number) => void;
}

export const StarkTraitCard = (props: Props) => {
	//destructure InventoryTokenObj
	if (!props.traitObj) {
		return null;
	}
	const { id, imageUrl, isIngredient, itemName, equippedById, address } =
		props.traitObj;

	const itemIndexInConstant = Number(
		imageUrl.substring(imageUrl.lastIndexOf("_") + 1, imageUrl.lastIndexOf("."))
	);

	return (
		<Card>
			<CardInnerContainer>
				<CardImage
					src={
						isIngredient
							? FACE_TRAITS[itemIndexInConstant].marketViewLink!
							: imageUrl
					}
					width={500}
					height={500}
					alt={itemName}
				/>
				<Content>
					<HeaderContainer>
						<h1>
							{isIngredient ? "Ingredient" : "Background"} #{id}
						</h1>
					</HeaderContainer>
					<p>Name: {itemName}</p>
					{equippedById !== 0 ? (
						<p>
							Equipped By:
							<PillIdSpan onClick={() => props.searchPillManual(equippedById)}>
								TestPill #{equippedById}
							</PillIdSpan>
						</p>
					) : (
						<p>Not Equipped</p>
					)}
					<p>Owner: {shortenAddress(address!)}</p>
				</Content>
			</CardInnerContainer>
		</Card>
	);
};
