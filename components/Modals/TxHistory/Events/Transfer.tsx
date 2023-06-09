import {
	Container,
	DropdownItem,
	DropdownItemWrapper,
	HighlightedText,
	IconsContainer,
} from "./EventsContainer.styles";
import { useState } from "react";
import { useQuery } from "@apollo/client";

import {
	DropdownContainer,
	Header,
	DownArrow,
	LinkIcon,
} from "./EventsContainer.styles";
import { convertUnixToDate, shortenAddress } from "../../../../types/utils";

interface Props {
	txHash: string;
	timeStamp: number;
	from: string;
	to: string;
}

export function Transfer(props: Props) {
	const { txHash, timeStamp, from, to } = props;
	const [showDropDown, setShowDropDown] = useState(false);
	const openLink = () => {
		window.open(`https://testnet.starkscan.co/tx/` + txHash, "_blank");
	};
	return (
		<Container>
			<Header showDropdown={showDropDown}>
				<h1>Transfer</h1>

				<IconsContainer>
					<HighlightedText>{convertUnixToDate(timeStamp)}</HighlightedText>
					<LinkIcon onClick={openLink} />

					<DownArrow onClick={() => setShowDropDown(!showDropDown)} />
				</IconsContainer>
			</Header>

			{showDropDown && (
				<DropdownContainer>
					<DropdownItem>
						<DropdownItemWrapper>
							<h1>From: </h1>
							<HighlightedText>{shortenAddress(from)} </HighlightedText>
						</DropdownItemWrapper>
					</DropdownItem>
					<DropdownItem>
						<DropdownItemWrapper>
							<h1>To:</h1>
							<HighlightedText>{shortenAddress(to)}</HighlightedText>
						</DropdownItemWrapper>
					</DropdownItem>
				</DropdownContainer>
			)}
		</Container>
	);
}
