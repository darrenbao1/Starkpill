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
import { convertUnixToDate } from "../../../../types/utils";

interface Props {
	events: any[];
}

export function TraitChange(props: Props) {
	const { events } = props;
	const [showDropDown, setShowDropDown] = useState(false);
	const hash = events[0].hash;
	const timeStamp = events[0].timestamp;
	const decodedEvents = events.map((event) => {
		const { newBackground, newIngredient, oldBackground, oldIngredient } =
			event.changeAttribute;
		//compare newBackground and oldBackground
		//compare newIngredient and oldIngredient
		if (newBackground !== oldBackground) {
			//background changed
			if (newBackground === 0) {
				//unequip
				return { type: "Unequip", trait: "Bg", traitId: oldBackground };
			} else {
				//equip
				return { type: "Equip", trait: "Bg", traitId: newBackground };
			}
		} else {
			//ingredient changed
			if (newIngredient === 0) {
				//unequip
				return { type: "Unequip", trait: "Ing", traitId: oldIngredient };
			} else {
				return { type: "Equip", trait: "Ing", traitId: newIngredient };
			}
		}
	});

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
					{decodedEvents.map((event, index) => (
						<DropdownItem2 key={index}>
							<DropdownItemWrapper>
								<h1>
									{event.type}
									{event.trait}:
								</h1>
								<HighlightedText>#{event.traitId}</HighlightedText>
							</DropdownItemWrapper>

							<DropdownTimeIconContainer>
								<HighlightedText>
									{convertUnixToDate(timeStamp)}
								</HighlightedText>
								<LinkIcon />
							</DropdownTimeIconContainer>
						</DropdownItem2>
					))}
				</DropdownContainer>
			)}
		</Container>
	);
}
