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
	ImageStyle,
} from "./InventoryModal.styles";
import { FACE_TRAITS, useWindowSize } from "../../../types/constants";

import { ChangeEvent, useContext, useEffect, useState } from "react";
import { InventoryTokenObj, StarkpillToken } from "../../../types/interfaces";
import UserTokenProvider from "../../Provider/UserTokenProvider";
import UserBackPackTokenProvider from "../../Provider/UserBackpackTokenProvider";

interface Props {
	traitTokenObj: InventoryTokenObj;
	closeModal: () => void;
}

export default function InventoryModal(props: Props) {
	//drestructure traitTokenObj
	const { id, imageUrl, itemName, equippedById, isIngredient } =
		props.traitTokenObj;
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
	//Darren Code here.
	const [equippedByPillToken, setEquippedByPillToken] =
		useState<StarkpillToken>();
	const itemIndexInConstant = Number(
		imageUrl.substring(imageUrl.lastIndexOf("_") + 1, imageUrl.lastIndexOf("."))
	);

	const providerPillData = useContext(UserTokenProvider);
	const providerBackpackData: InventoryTokenObj[] = useContext(
		UserBackPackTokenProvider
	);
	const filteredBackpackData = providerBackpackData.filter(
		(item) => item.isIngredient === isIngredient
	);
	console.table(filteredBackpackData);
	let starkpillTokenArray: StarkpillToken[] = [];
	providerPillData.user.tokens.forEach(
		(token: {
			id: number;
			owner: { address: string };
			metadata: { mintPrice: number; imageUrl: string; fame: number };
			background: number;
			ingredient: number;
		}) => {
			const newTokenObj: StarkpillToken = {
				tokenId: token.id,
				ownerAddress: token.owner.address,
				mintPrice: token.metadata.mintPrice,
				imageUrl: token.metadata.imageUrl,
				fame: token.metadata.fame,
				bgId: token.background,
				ingId: token.ingredient,
			};
			starkpillTokenArray.push(newTokenObj);
		}
	);
	console.table(starkpillTokenArray);
	const getEquippedToken = () => {
		if (equippedById === 0) return;
		//search for the token id from starkpillTokenArray where the equippedById is equal to the tokenId
		const equippedByToken = starkpillTokenArray.find(
			(token) => token.tokenId === equippedById
		);
		setEquippedByPillToken(equippedByToken);
	};
	useEffect(() => {
		getEquippedToken();
	}, []);
	//Darren Code ends here.
	return (
		<Container>
			<ModalContainer>
				{size.width < 768 && (
					<HeaderContainer>
						<h1>{itemName}</h1>
						<Cross
							src="/svgs/InventoryModalClose.svg"
							alt="cross"
							width={0}
							height={0}
							onClick={props.closeModal}
						/>
					</HeaderContainer>
				)}
				<ImageContainer>
					{equippedById === 0 && (
						<ImageStyle
							src={
								isIngredient
									? FACE_TRAITS[itemIndexInConstant].marketViewLink!
									: imageUrl
							}
							alt={itemName}
							width={0}
							height={0}
							sizes="100vw"
						/>
					)}
					{equippedById !== 0 && equippedByPillToken && (
						<ImageStyle
							src={equippedByPillToken.imageUrl}
							alt={itemName}
							width={0}
							height={0}
							sizes="100vw"
						/>
					)}
				</ImageContainer>
				<ModalContent>
					{size.width > 768 && (
						<HeaderContainer>
							<h1>{itemName}</h1>
							<Cross
								src="/svgs/InventoryModalClose.svg"
								alt="cross"
								width={0}
								height={0}
								onClick={props.closeModal}
							/>
						</HeaderContainer>
					)}
					{equippedById !== 0 ? (
						<ContentContainer>
							<EquippedOn>
								<EquipText>Equipped On</EquipText>
								<HighlightText>Starkpill #{equippedById}</HighlightText>
							</EquippedOn>
							<RadioWrapper>
								{/* <Item>
									<RadioButton
										type="radio"
										name="radio"
										value="optionA"
										checked={select === "optionA"}
										onChange={(event) => handleSelectChange(event)}
									/>
									<RadioButtonLabel />
									<RadioButtonText>Swap Trait</RadioButtonText>
								</Item> */}
								{/* <Item>
									<RadioButton
										type="radio"
										name="radio"
										value="optionB"
										checked={select === "optionB"}
										onChange={(event) => handleSelectChange(event)}
									/>
									<RadioButtonLabel />
									<RadioButtonText>Unequip Trait</RadioButtonText>
								</Item> */}
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

							{/* <Item>
								<RadioButton
									type="radio"
									name="radio"
									value="optionC"
									checked={select === "optionC"}
									onChange={(event) => handleSelectChange(event)}
								/>
								<RadioButtonLabel />
								<RadioButtonText>Equip Trait</RadioButtonText>
							</Item> */}

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
