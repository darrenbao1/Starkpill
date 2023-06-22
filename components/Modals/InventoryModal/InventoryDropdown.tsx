import { useState } from "react";
import { InventoryTokenObj, StarkpillToken } from "../../../types/interfaces";
import {
	DropdownContainer,
	DropdownItem,
	DropdownItemPILL,
	PillImage,
	Tick,
} from "./InventoryModal.styles";
import { FACE_TRAITS } from "../../../types/constants";

interface Props {
	tokenArray: StarkpillToken[];
	traitArray: InventoryTokenObj[];
	isTraitDropdown: boolean;
	showDropDownPills: boolean;
	onDropdownItemClick: (tokenId: number) => void;
	isHidden: boolean;
}

export default function InventoryDropdown(props: Props) {
	// destructure props
	const {
		tokenArray,
		traitArray,
		isTraitDropdown,
		showDropDownPills,
		onDropdownItemClick,
	} = props;
	const [selectedTrait, setSelectedTrait] = useState(0);
	const [selected, setSelected] = useState(false);

	const [selectedPill, setSelectedPill] = useState(0);

	const getMarketViewIndex = (imageUrl: string) => {
		return Number(
			imageUrl.substring(
				imageUrl.lastIndexOf("_") + 1,
				imageUrl.lastIndexOf(".")
			)
		);
	};
	if (!props.isHidden) {
		return null;
	}

	return (
		<>
			{!isTraitDropdown ? (
				<DropdownContainer>
					{tokenArray.map(({ tokenId, imageUrl }, index) => (
						<DropdownItemPILL
							selected={selectedPill === tokenId}
							key={tokenId}
							onClick={() => {
								setSelected(true);
								setSelectedPill(tokenId);
								onDropdownItemClick(index);
							}}>
							Starkpill #{tokenId}
							<PillImage src={imageUrl} alt="Tick" width={300} height={300} />
						</DropdownItemPILL>
					))}
				</DropdownContainer>
			) : (
				<DropdownContainer>
					{traitArray.map(({ id, itemName, imageUrl, isIngredient }, index) => (
						<DropdownItem
							selected={selectedTrait === id}
							key={id}
							onClick={() => {
								setSelectedTrait(id);
								setSelected(true);
								onDropdownItemClick(index);
							}}>
							{itemName}hcvhf
							<PillImage
								src={
									isIngredient
										? FACE_TRAITS[getMarketViewIndex(imageUrl)].marketViewLink!
										: imageUrl
								}
								alt="Tick"
								width={300}
								height={300}
							/>
						</DropdownItem>
					))}
				</DropdownContainer>
			)}
		</>
	);
}
