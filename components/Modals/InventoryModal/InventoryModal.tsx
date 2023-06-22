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

import {
	ChangeEvent,
	SetStateAction,
	useContext,
	useEffect,
	useState,
} from "react";
import {
	InventoryTokenObj,
	StarkpillToken,
	TraitName,
} from "../../../types/interfaces";
import UserTokenProvider from "../../Provider/UserTokenProvider";
import UserBackPackTokenProvider from "../../Provider/UserBackpackTokenProvider";
import InventoryDropdown from "./InventoryDropdown";

interface Props {
	traitTokenObj: InventoryTokenObj;
	closeModal: () => void;
	isTraitDropdown: boolean;
}

export default function InventoryModal(props: Props) {
	//drestructure traitTokenObj
	const { id, imageUrl, itemName, equippedById, isIngredient } =
		props.traitTokenObj;
	const [select, setSelect] = useState("");
	const [RadioButtonSelected, setRadioButtonSelected] = useState(false);
	const [showDropDownPills, setShowDropDownPills] = useState(false);

	const handleDropDownItemClick = (index: number) => {
		setShowDropDownPills(false);
		setIsSelected(true);
		setIndexOfSelectedTrait(index);
	};

	const [isSelected, setIsSelected] = useState(false);
	const [isTraitDropdown, setIsTraitDropdown] = useState(false);
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
	const [optionBSelected, setOptionBSelected] = useState(false);
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

	const [indexOfSelectedTrait, setIndexOfSelectedTrait] = useState<number>(0);

	//Darren Code ends here.
	return (
		<div className="contentContainer">
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
											onChange={(event) => {
												handleSelectChange(event);
												setOptionBSelected(true);
											}}
										/>
										<RadioButtonLabel />
										<RadioButtonText>Unequip Trait</RadioButtonText>
									</Item>
								</RadioWrapper>
								{select === "optionA" && (
									<SelectionContainer>
										<SelectATrait
											onClick={() => setShowDropDownPills(!showDropDownPills)}>
											{isSelected ? (
												<SelectTraitText>
													{filteredBackpackData[indexOfSelectedTrait].itemName}
												</SelectTraitText>
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

										<InventoryDropdown
											showDropDownPills={false}
											tokenArray={starkpillTokenArray}
											traitArray={filteredBackpackData}
											isTraitDropdown={true}
											onDropdownItemClick={handleDropDownItemClick}
											isHidden={showDropDownPills}
										/>

										<ButtonContainer itemSelectedBG={isSelected}>
											Confirm
										</ButtonContainer>
									</SelectionContainer>
								)}

								{select === "optionB" && (
									<ButtonContainer2
										unequipSelected={optionBSelected}
										itemSelectedBG={isSelected}>
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
											{isSelected ? (
												<SelectTraitText>
													Starkpill #
													{starkpillTokenArray[indexOfSelectedTrait].tokenId}
												</SelectTraitText>
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

										<InventoryDropdown
											onDropdownItemClick={handleDropDownItemClick}
											tokenArray={starkpillTokenArray}
											traitArray={filteredBackpackData}
											isTraitDropdown={false}
											showDropDownPills={false}
											isHidden={showDropDownPills}
										/>

										<ButtonContainer itemSelectedBG={isSelected}>
											Confirm
										</ButtonContainer>
									</SelectionContainer>
								)}
							</ContentContainer>
						)}
					</ModalContent>
				</ModalContainer>
			</Container>
		</div>
	);
}
