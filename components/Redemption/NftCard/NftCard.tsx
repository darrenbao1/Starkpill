import { NFTData } from "../../../types/interfaces";
import {
	NftCardContainer,
	Header,
	TokenId,
	ImageContainer,
	ClaimedLabel,
} from "./NftCard.styles";

export const NftCard = (props: { nftData: NFTData; onClick: () => void }) => {
	return (
		<NftCardContainer
			onClick={() =>
				!props.nftData.hasBeenClaimed ? props.onClick() : console.log()
			}
			isClaimed={props.nftData.hasBeenClaimed}>
			{props.nftData.hasBeenClaimed && <ClaimedLabel>Claimed</ClaimedLabel>}
			<Header>{props.nftData.collectionName}</Header>
			<TokenId>#{props.nftData.collectionTokenId}</TokenId>
			<ImageContainer
				src={props.nftData.imageUrl}
				alt={props.nftData.name}
				width={316}
				height={236}
			/>
		</NftCardContainer>
	);
};
