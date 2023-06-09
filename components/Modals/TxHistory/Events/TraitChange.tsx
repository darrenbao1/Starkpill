import {
	Container,
	DownArrow,
	DropdownItem2,
	DropdownItemWrapper,
	DropdownTimeIconContainer,
	HighlightedText,
	IconsContainer,
	LinkIcon,
} from "./EventsContainer.styles";
import { useState } from "react";

import { DropdownContainer, Header } from "./EventsContainer.styles";

export function TraitChange() {
	const [showDropDown, setShowDropDown] = useState(false);
	return (
		<Container>
			<Header showDropdown={showDropDown}>
				<h1>Trait Change</h1>
				<IconsContainer>
					<DownArrow onClick={() => setShowDropDown(!showDropDown)} />
				</IconsContainer>
			</Header>

			{showDropDown && (
				<DropdownContainer>
					<DropdownItem2>
						<DropdownItemWrapper>
							<h1>Equip:</h1>
							<HighlightedText>Name 1</HighlightedText>
						</DropdownItemWrapper>

						<DropdownTimeIconContainer>
							<HighlightedText>2h ago</HighlightedText>
							<LinkIcon />
						</DropdownTimeIconContainer>
					</DropdownItem2>
					<DropdownItem2>
						<DropdownItemWrapper>
							<h1>Unequip:</h1>
							<HighlightedText>Name 2</HighlightedText>
						</DropdownItemWrapper>

						<DropdownTimeIconContainer>
							<HighlightedText>2h ago</HighlightedText>
							<LinkIcon />
						</DropdownTimeIconContainer>
					</DropdownItem2>
				</DropdownContainer>
			)}
		</Container>
	);
}
