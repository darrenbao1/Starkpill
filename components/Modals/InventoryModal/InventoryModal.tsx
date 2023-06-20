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
import {
	FACE_TRAITS,
	GET_TOKEN_BY_ID,
	GET_USER_TOKENS,
	useWindowSize,
} from "../../../types/constants";

import { ChangeEvent, useEffect, useState } from "react";
import { InventoryTokenObj, StarkpillToken } from "../../../types/interfaces";
import { useLazyQuery } from "@apollo/client";
import Loading from "../../Loading/Loading";
import router from "next/router";

interface Props {
	traitTokenObj: InventoryTokenObj;
	closeModal: () => void;
}

export default function InventoryModal(props: Props) {
	//drestructure traitTokenObj
	const { id, imageUrl, itemName, equippedById, isIngredient } =
		props.traitTokenObj;
	const { walletAddress } = router.query;
	const [select, setSelect] = useState("");
	const [RadioButtonSelected, setRadioButtonSelected] = useState(false);
	const [allUserTokens, setAllUserTokens] = useState<StarkpillToken[]>([]);
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
	const [equippedByPillToken, setEquippedByPillToken] =
		useState<StarkpillToken>();
	const [selectedTrait, setSelectedTrait] = useState(testingtraits[0]);

	const [traitSelected, setTraitSelected] = useState(false);

	const handleSelectChange = (e: ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setSelect(value);
		setRadioButtonSelected(true);
	};
	const size = useWindowSize();
	const itemIndexInConstant = Number(
		imageUrl.substring(imageUrl.lastIndexOf("_") + 1, imageUrl.lastIndexOf("."))
	);
	const [equippedByPill, { loading: searchLoading, data: searchData }] =
		useLazyQuery(GET_TOKEN_BY_ID, {
			variables: { tokenId: equippedById },
		});

	const [UserTokens, { loading: loadingUserTokens, data: userTokensData }] =
		useLazyQuery(GET_USER_TOKENS, {
			variables: { address: walletAddress },
		});
	const getUserTokens = async () => {
		if (!walletAddress) return;
		const userTokensObjArray: StarkpillToken[] = [];
		const result = await UserTokens();
		//console.log(result.data.user.tokens);
		result.data.user.tokens.forEach((token: any) => {
			const newTokenObj: StarkpillToken = {
				tokenId: token.id,
				ownerAddress: token.owner.address,
				mintPrice: token.metadata.mintPrice,
				imageUrl: token.metadata.imageUrl,
				fame: token.metadata.fame,
			};
			userTokensObjArray.push(newTokenObj);
		});
		setAllUserTokens(userTokensObjArray);
	};
	const getEquippedToken = async () => {
		if (equippedById === 0) return;
		const equippedByToken = await equippedByPill();
		const newTokenObj: StarkpillToken = {
			tokenId: equippedByToken.data.token.id,
			ownerAddress: equippedByToken.data.token.owner.address,
			mintPrice: equippedByToken.data.token.metadata.mintPrice,
			imageUrl: equippedByToken.data.token.metadata.imageUrl,
			fame: equippedByToken.data.token.metadata.fame,
		};
		setEquippedByPillToken(newTokenObj);
	};
	useEffect(() => {
		getEquippedToken();
		getUserTokens();
	}, []);
	if (searchLoading || loadingUserTokens)
		return (
			<Container>
				<Loading />
			</Container>
		);
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
