import { NFTData } from "../../../types/interfaces";
import {
	NftCardContainer,
	Header,
	TokenId,
	ImageContainer,
} from "./NftCard.styles";

export const NftCard = (props: { nftData: NFTData; onClick: () => void }) => {
	return (
		<NftCardContainer onClick={props.onClick}>
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
