import { FACE_TRAITS } from "../../types/constants";
import { InventoryTokenObj } from "../../types/interfaces";
import {
	CardContainer,
	CardImage,
	CardItemName,
	EquippedBadge,
	UnequippedBadge,
} from "./InventoryCard.styles";

interface Props {
	traitTokenObj: InventoryTokenObj;
}

export const InventoryCard = (props: Props) => {
	const { id, imageUrl, itemName, equippedById, isIngredient } =
		props.traitTokenObj;
	const itemIndexInConstant = Number(
		imageUrl.substring(imageUrl.lastIndexOf("_") + 1, imageUrl.lastIndexOf("."))
	);
	return (
		<CardContainer>
			<CardImage
				src={
					isIngredient
						? FACE_TRAITS[itemIndexInConstant].marketViewLink!
						: imageUrl
				}
				alt={itemName}
				width={0}
				height={0}
				sizes="100vw"
			/>
			{equippedById !== 0 ? (
				<EquippedBadge>Equipped</EquippedBadge>
			) : (
				<UnequippedBadge>Unequipped</UnequippedBadge>
			)}
			<CardItemName>{itemName}</CardItemName>
		</CardContainer>
	);
};
