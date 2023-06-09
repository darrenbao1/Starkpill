import {
	Container,
	HighlightedText,
	IconsContainer,
	LinkIcon,
	MintedWrapper,
} from "./EventsContainer.styles";

import { convertUnixToDate } from "../../../../types/utils";
interface Props {
	txHash: string;
	timeStamp: number;
}

export function Minted(props: Props) {
	const { txHash, timeStamp } = props;
	const timeInDate = convertUnixToDate(timeStamp);
	const openLink = () => {
		window.open(`https://testnet.starkscan.co/tx/` + txHash, "_blank");
	};
	return (
		<Container>
			<MintedWrapper>
				<h1>Minted</h1>
				<IconsContainer>
					<HighlightedText>{timeInDate}</HighlightedText>
					<LinkIcon onClick={openLink} />
				</IconsContainer>
			</MintedWrapper>
		</Container>
	);
}
