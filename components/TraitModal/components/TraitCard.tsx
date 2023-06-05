import { Trait } from "../../../types/interfaces";
import {
	TraitCardWrapper,
	TraitCardContainer,
	TraitCardImage,
	PriceFlag,
	QuantityLabelContainer,
	QuantityLabelContent,
	TraitNameLabel,
	RedeemLabel,
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
	const isOutOfStock = trait.quantityLeft === 0;
	return (
		<TraitCardWrapper isSelected={isSelected}>
			<TraitCardContainer
				isSelected={isSelected}
				isHidden={trait.isHidden || isOutOfStock}>
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
						{trait.quantityLeft > 0 ? (
							<QuantityLabelContent isSelected={isSelected}>
								{trait.quantityLeft} Left
							</QuantityLabelContent>
						) : (
							<RedeemLabel isSelected={isSelected}>Out of stock</RedeemLabel>
						)}
					</QuantityLabelContainer>
				)}
				{trait.isHidden && (
					<QuantityLabelContainer>
						<RedeemLabel isSelected={isSelected}>Only Redeemable</RedeemLabel>
					</QuantityLabelContainer>
				)}
			</TraitCardContainer>
			<TraitNameLabel isSelected={isSelected} isHidden={trait.isHidden}>
				{trait.name}
			</TraitNameLabel>
		</TraitCardWrapper>
	);
};
