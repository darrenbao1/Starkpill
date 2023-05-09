import { useQuery } from "@apollo/client";
import { GET_PHARMACY_DATA } from "../../../types/constants";
import { Trait, TraitName, typeIndex } from "../../../types/interfaces";
import {
	TraitModalContainer,
	CloseButton,
	TraitModalHeader,
	TraitCardContainer,
} from "./TraitModal.styles";
import Cross from "../../../public/svgs/cross2.svg";
import { TraitCard } from "./TraitCard";
export const TraitModal = (props: {
	traitName: TraitName;
	modalIsShown: boolean;
	traitArray: Trait[];
	selectedTraitId: number;
	onClose: () => void;
	onSelect: (index: number) => void;
	handleClick?: (e: any) => void;
	isMintingPage: boolean; //check if this is minting page or not.
}) => {
	//destructure props
	const {
		traitName,
		traitArray,
		selectedTraitId,
		onClose,
		onSelect,
		handleClick,
		isMintingPage,
		modalIsShown,
	} = props;
	//Query to get stock for traits
	const { data, loading } = useQuery(GET_PHARMACY_DATA);
	if (loading || !modalIsShown) return null;
	else {
		//if this is minting page, update the quantity left for each trait
		if (isMintingPage) {
			data.getPharmacyData.map((trait: any) => {
				if (
					trait.typeIndex === typeIndex[TraitName.Ingredient] &&
					traitName === TraitName.Ingredient
				) {
					traitArray[trait.index].quantityLeft = trait.amount_left;
				} else if (
					trait.typeIndex === typeIndex[TraitName.Background] &&
					traitName === TraitName.Background
				) {
					traitArray[trait.index].quantityLeft = trait.amount_left;
				}
			});
		}
		return (
			<TraitModalContainer onClick={handleClick}>
				<CloseButton onClick={onClose}>
					<Cross />
				</CloseButton>
				<TraitModalHeader>Select {traitName}</TraitModalHeader>
				<TraitCardContainer>
					{traitArray.map((trait, index) => (
						<TraitCard
							trait={trait}
							index={index}
							isSelected={index == selectedTraitId}
							onSelect={onSelect}
							isMintingPage={isMintingPage}></TraitCard>
					))}
				</TraitCardContainer>
			</TraitModalContainer>
		);
	}
};
