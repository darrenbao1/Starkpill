import { Trait } from "../../../types/interfaces";
import {
	TraitCardWrapper,
	TraitCardContainer,
	TraitCardImage,
	PriceFlag,
	QuantityLabelContainer,
	QuantityLabelContent,
	TraitNameLabel,
} from "./TraitCard.styles";
import ETHLogo from "../../../public/svgs/ethLogo.svg";
export const TraitCard = (props: {
	trait: Trait;
	isSelected: boolean;
	onSelect: any;
	index: number;
	isMintingPage: boolean;
}) => {
	//destructure props
	const { trait, isSelected, onSelect, index, isMintingPage } = props;
	return (
		<TraitCardWrapper isSelected={isSelected}>
			<TraitCardContainer isSelected={isSelected}>
				<TraitCardImage
					src={trait.marketViewLink ? trait.marketViewLink : trait.link}
					alt={trait.name}
					fill
					onClick={() => onSelect(index)}></TraitCardImage>
				{trait.premiumPrice && (
					<PriceFlag>
						<span>{trait.premiumPrice}</span>
						<ETHLogo />
					</PriceFlag>
				)}
				{trait.quantityLeft && isMintingPage && (
					<QuantityLabelContainer>
						<QuantityLabelContent isSelected={isSelected}>
							{trait.quantityLeft} Left
						</QuantityLabelContent>
					</QuantityLabelContainer>
				)}
			</TraitCardContainer>
			<TraitNameLabel isSelected={isSelected}>{trait.name}</TraitNameLabel>
		</TraitCardWrapper>
	);
};
