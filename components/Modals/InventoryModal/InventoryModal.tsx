import {
	ModalContainer,
	ModalContent,
	ImageContainer,
	Cross,
	HeaderContainer,
	ContentContainer,
	EquippedOn,
	EquipText,
	HighlightText,
	RadioWrapper,
	Item,
	RadioButton,
	RadioButtonLabel,
	RadioButtonText,
	SelectATrait,
	SelectTraitText,
	Down,
	ButtonContainer,
	SelectionContainer,
	DropdownContainer,
	DropdownItem,
	Tick,
	ButtonContainer2,
	Container,
	PillImageContainer,
} from "./InventoryModal.styles";
import { useWindowSize } from "../../../types/constants";

import { ChangeEvent, useState } from "react";
import { flattenDiagnosticMessageText } from "typescript";

export default function InventoryModal() {
	const [select, setSelect] = useState("");
	const [RadioButtonSelected, setRadioButtonSelected] = useState(false);
	const [showDropDownPills, setShowDropDownPills] = useState(false);
	const testingtraits = [
		"Wassie Face",
		"Kitsune Mask",
		"ChainLink Cap",
		"Briq",
	];
	const testpills = [
		"Starkpill #1",
		"Starkpill #2",
		"Starkpill #3",
		"Starkpill #4",
	];
	const equippedById = true;
	const [selectedPill, setSelectedPill] = useState(testpills[0]);
	const [pillSelected, setPillSelected] = useState(false);

	const [selectedTrait, setSelectedTrait] = useState(testingtraits[0]);

	const [traitSelected, setTraitSelected] = useState(false);

	const handleSelectChange = (e: ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setSelect(value);
		setRadioButtonSelected(true);
	};
	const size = useWindowSize();

	return (
		<Container>
			<ModalContainer>
				{size.width < 768 && (
					<HeaderContainer>
						<h1>Bravoos Helmet</h1>
						<Cross
							src="/svgs/InventoryModalClose.svg"
							alt="cross"
							width={0}
							height={0}
						/>
					</HeaderContainer>
				)}
				<ImageContainer>Image</ImageContainer>
				<ModalContent>
					{size.width > 768 && (
						<HeaderContainer>
							<h1>Bravoos Helmet</h1>
							<Cross
								src="/svgs/InventoryModalClose.svg"
								alt="cross"
								width={0}
								height={0}
							/>
						</HeaderContainer>
					)}
					{equippedById === true ? (
						<ContentContainer>
							<EquippedOn>
								<EquipText>Equipped On</EquipText>
								<HighlightText>Starkpill #4</HighlightText>
							</EquippedOn>
							<RadioWrapper>
								<Item>
									<RadioButton
										type="radio"
										name="radio"
										value="optionA"
										checked={select === "optionA"}
										onChange={(event) => handleSelectChange(event)}
									/>
									<RadioButtonLabel />
									<RadioButtonText>Swap Trait</RadioButtonText>
								</Item>
								<Item>
									<RadioButton
										type="radio"
										name="radio"
										value="optionB"
										checked={select === "optionB"}
										onChange={(event) => handleSelectChange(event)}
									/>
									<RadioButtonLabel />
									<RadioButtonText>Unequip Trait</RadioButtonText>
								</Item>
							</RadioWrapper>
							{select === "optionA" && (
								<SelectionContainer>
									<SelectATrait
										onClick={() => setShowDropDownPills(!showDropDownPills)}>
										{traitSelected ? (
											<SelectTraitText>{selectedTrait}</SelectTraitText>
										) : (
											<SelectTraitText>Select a trait</SelectTraitText>
										)}

										<Down
											src="/svgs/InventoryDown.svg"
											alt="down"
											width={0}
											height={0}
										/>
									</SelectATrait>
									{showDropDownPills && (
										<DropdownContainer>
											{testingtraits.map((trait, index) => (
												<DropdownItem
													selectedTrait={selectedTrait === trait}
													key={index}
													onClick={() => {
														setSelectedTrait(trait);
														setTraitSelected(true);
														setShowDropDownPills(false);
													}}>
													{trait}
													{selectedTrait === trait && (
														<Tick
															src="/svgs/DropDownTick.svg"
															alt="Tick"
															width={0}
															height={0}></Tick>
													)}
												</DropdownItem>
											))}
										</DropdownContainer>
									)}

									<ButtonContainer traitSelected={traitSelected}>
										Confirm
									</ButtonContainer>
								</SelectionContainer>
							)}

							{select === "optionB" && (
								<ButtonContainer2 traitSelected={traitSelected}>
									Confirm
								</ButtonContainer2>
							)}
						</ContentContainer>
					) : (
						<ContentContainer>
							<EquippedOn>
								<EquipText>Equipped On</EquipText>
								<HighlightText>-</HighlightText>
							</EquippedOn>

							<Item>
								<RadioButton
									type="radio"
									name="radio"
									value="optionC"
									checked={select === "optionC"}
									onChange={(event) => handleSelectChange(event)}
								/>
								<RadioButtonLabel />
								<RadioButtonText>Equip Trait</RadioButtonText>
							</Item>

							{select === "optionC" && (
								<SelectionContainer>
									<SelectATrait
										onClick={() => setShowDropDownPills(!showDropDownPills)}>
										{traitSelected ? (
											<SelectTraitText>{selectedTrait}</SelectTraitText>
										) : (
											<SelectTraitText>Select a pill</SelectTraitText>
										)}

										<Down
											src="/svgs/InventoryDown.svg"
											alt="down"
											width={0}
											height={0}
										/>
									</SelectATrait>
									{showDropDownPills && (
										<DropdownContainer>
											{testpills.map((pill, index) => (
												<DropdownItem
													selectedTrait={selectedPill === pill}
													key={index}
													onClick={() => {
														setSelectedTrait(pill);
														setTraitSelected(true);
														setShowDropDownPills(false);
													}}>
													{pill}

													<PillImageContainer
														src="/svgs/testpill.svg"
														alt="Tick"
														width={0}
														height={0}></PillImageContainer>
												</DropdownItem>
											))}
										</DropdownContainer>
									)}

									<ButtonContainer traitSelected={traitSelected}>
										Confirm
									</ButtonContainer>
								</SelectionContainer>
							)}
						</ContentContainer>
					)}
				</ModalContent>
			</ModalContainer>
		</Container>
	);
}
