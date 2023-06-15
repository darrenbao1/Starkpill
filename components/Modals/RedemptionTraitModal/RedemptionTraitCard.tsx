import {
	RedeemTraitCard,
	RedeemTraitImage,
	RedeemTraitItemName,
} from "./RedemptionTraitModal.styles";

interface Props {
	imageUrl: string;
	name: string;
}

export const RedemptionTraitCard = (props: Props) => {
	const { imageUrl, name } = props;
	return (
		<RedeemTraitCard>
			<RedeemTraitImage
				src={imageUrl}
				alt={name}
				width={150}
				height={150}></RedeemTraitImage>
			<RedeemTraitItemName>{name}</RedeemTraitItemName>
		</RedeemTraitCard>
	);
};
