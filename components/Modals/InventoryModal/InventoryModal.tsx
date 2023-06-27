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
import {
	useStarknetExecute,
	useTransactionManager,
} from "@starknet-react/core";
import {
	getEquipOnAnotherPillCalls,
	getSwitchCalls,
	getUnequipCall,
} from "../../../hooks/StarkPillContract";
import { useRouter } from "next/router";

interface Props {
	traitTokenObj: InventoryTokenObj;
	closeModal: () => void;
	isTraitDropdown: boolean;
}

export default function InventoryModal(props: Props) {
	const router = useRouter();
	const { addTransaction } = useTransactionManager();
	const { walletAddress } = router.query;
	//drestructure  traitTokenObj
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
	const handleSelectChange = (e: ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setSelect(value);
		setRadioButtonSelected(true);
	};
	const size = useWindowSize();
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
	const equippedByToken = starkpillTokenArray.find(
		(token) => token.tokenId === equippedById
	);
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

	//here for contract interactions
	let unequipCalls: any[] = [];
	if (equippedByToken) {
		unequipCalls = getUnequipCall(equippedByToken, isIngredient);
	}

	const { execute: unequipExecute } = useStarknetExecute({
		calls: unequipCalls,
	});

	const onClickUnequip = async () => {
		try {
			const response = await unequipExecute();
			addTransaction({
				hash: response.transaction_hash,
				metadata: { transactionName: "unequip trait" },
			});
			props.closeModal();
		} catch (e) {
			console.log(e);
		}
	};

	let equipOnAnotherPillCalls: any[] = [];
	equipOnAnotherPillCalls = getEquipOnAnotherPillCalls(
		starkpillTokenArray[indexOfSelectedTrait],
		props.traitTokenObj,
		walletAddress! as string
	);

	const { execute: equipOnAnotherPillExecute } = useStarknetExecute({
		calls: equipOnAnotherPillCalls,
	});

	const onClickEquipOnAnotherPill = async () => {
		try {
			const response = await equipOnAnotherPillExecute();
			addTransaction({
				hash: response.transaction_hash,
				metadata: { transactionName: "Equip trait on another pill" },
			});
			props.closeModal();
		} catch (e) {
			console.log(e);
		}
	};

	let switchCalls: any[] = [];
	if (equippedByToken) {
		switchCalls = getSwitchCalls(
			equippedByToken,
			filteredBackpackData[indexOfSelectedTrait],
			walletAddress! as string
		);
	}
	const { execute: switchExecute } = useStarknetExecute({
		calls: switchCalls,
	});

	const onClickSwitchExecute = async () => {
		try {
			const response = await switchExecute();
			addTransaction({
				hash: response.transaction_hash,
				metadata: { transactionName: "switch trait" },
			});
			props.closeModal();
		} catch (e) {
			console.log(e);
		}
	};

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
								<Item>
									<RadioButton
										type="radio"
										name="radio"
										value="swapTrait"
										checked={select === "swapTrait"}
										onChange={(event) => handleSelectChange(event)}
									/>
									<RadioButtonLabel />
									<RadioButtonText>Swap Trait</RadioButtonText>
								</Item>
								<Item>
									<RadioButton
										type="radio"
										name="radio"
										value="unequipTrait"
										checked={select === "unequipTrait"}
										onChange={(event) => {
											handleSelectChange(event);
											setOptionBSelected(true);
										}}
									/>
									<RadioButtonLabel />
									<RadioButtonText>Unequip Trait</RadioButtonText>
								</Item>
							</RadioWrapper>
							{select === "swapTrait" && (
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
										traitId={id}
									/>

									<ButtonContainer
										itemSelectedBG={isSelected}
										onClick={() => onClickSwitchExecute()}
										disabled={!isSelected}>
										Confirm
									</ButtonContainer>
								</SelectionContainer>
							)}

							{select === "unequipTrait" && (
								<ButtonContainer2
									unequipSelected={optionBSelected}
									itemSelectedBG={isSelected}
									onClick={() => onClickUnequip()}>
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
									value="equipOntoPill"
									checked={select === "equipOntoPill"}
									onChange={(event) => handleSelectChange(event)}
								/>
								<RadioButtonLabel />
								<RadioButtonText>Equip Trait</RadioButtonText>
							</Item>

							{select === "equipOntoPill" && (
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
										traitId={id}
									/>

									<ButtonContainer
										itemSelectedBG={isSelected}
										onClick={() => onClickEquipOnAnotherPill()}
										disabled={!isSelected}>
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
