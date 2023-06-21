import { eq } from "lodash";
import { FACE_TRAITS, STARKPILL_CONTRACT_ADDRESS } from "../../types/constants";
import { InventoryTokenObj } from "../../types/interfaces";
import { shortenAddress } from "../../types/utils";
import {
	Card,
	CardImage,
	CardInnerContainer,
	Content,
	HeaderContainer,
	OwnerAddressP,
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
	const openOwnerAddressLink = () => {
		window.open(`https://testnet.starkscan.co/contract/${address}`, "_blank");
	};
	const openExternalLink = () => {
		window.open(
			`https://testnet.aspect.co/asset/${STARKPILL_CONTRACT_ADDRESS}/${id}`,
			"_blank"
		);
	};
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
						<h1 onClick={openExternalLink}>
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
					<OwnerAddressP onClick={openOwnerAddressLink}>
						Owner: {shortenAddress(address!)}
					</OwnerAddressP>
				</Content>
			</CardInnerContainer>
		</Card>
	);
};
