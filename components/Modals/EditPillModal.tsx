import {
	useAccount,
	useContractWrite,
	useTransactionManager,
} from "@starknet-react/core";
import styles from "../../styles/EditPillModal.module.css";
import Image from "next/image";
import EditIcon from "../../public/svgs/Edit.svg";
import { BACKGROUND, FACE_TRAITS } from "../../types/constants";
import { useEffect, useState } from "react";
import { getUserBackPack } from "../../types/utils";
import { Trait, TraitName } from "../../types/interfaces";
import { ExitModal } from "./ExitModal";
import { SaveModal } from "./SaveModal";
import { getEquipCalls, getUnequipCalls } from "../../hooks/StarkPillContract";
import { TraitModal } from "../TraitModal/components/TraitModal";
interface Props {
	tokenId: number;
	ingId: number;
	bgId: number;
	ingImageId: number;
	bgImageId: number;
	oldImage: string;
	close: () => void;
}
export const EditPillModal = (props: Props) => {
	function handleClick(event: any) {
		event.stopPropagation();
	}
	const { address } = useAccount();
	const { addTransaction } = useTransactionManager();
	const { tokenId, ingId, bgId, ingImageId, bgImageId, oldImage } = props;
	const [showBackgroundModal, setShowBackgroundModal] = useState(false);
	const [showFaceModal, setShowFaceModal] = useState(false);
	//get users current equip item and add it to the array
	//pill is equipping an attribute will add a empty attribute to the array
	let bgArray = [];
	let bgTrait: Trait = BACKGROUND[Number(bgImageId)];
	bgTrait.tokenId = bgId;
	bgArray.push(bgTrait);
	if (bgId != 0) {
		let blankBg = BACKGROUND[0];
		blankBg.tokenId = 0;
		bgArray.push(blankBg);
	}
	let ingArray = [];
	let ingTrait: Trait = FACE_TRAITS[Number(ingImageId)];
	ingTrait.tokenId = ingId;
	ingArray.push(ingTrait);
	if (ingId != 0) {
		let blankIng = FACE_TRAITS[0];
		blankIng.tokenId = 0;
		ingArray.push(blankIng);
	}
	const [backgroundArray, setBackgroundArray] = useState<Trait[]>(bgArray);
	const [faceTraitArray, setFaceTraitArrays] = useState<Trait[]>(ingArray);
	const [selectedIng, setSelectedIng] = useState(0);
	const [selectedBackgroundId, setBackgroundId] = useState(0);
	const [showExitModal, setShowExitModal] = useState(false);
	const [showSaveModal, setShowSaveModal] = useState(false);
	useEffect(() => {
		async function fetchData() {
			if (address) {
				const res = await getUserBackPack(address);
				setBackgroundArray((prevBackgroundArray) => [
					...prevBackgroundArray,
					...res.backgroundArray,
				]);
				setFaceTraitArrays((prevFaceTraitArray) => [
					...prevFaceTraitArray,
					...res.ingredientArray,
				]);
			}
		}
		fetchData();
	}, [address, setBackgroundArray, setFaceTraitArrays]);

	const [hasChanges, setHasChanges] = useState(false);
	//new getChanges funtion that gets Trait array instead of number array
	const getChanges = () => {
		let equipArray: Trait[] = [];
		let unEquipArray: Trait[] = [];
		if (hasChanges) {
			//currently equipping ingredient
			if (ingId != 0 && ingId != faceTraitArray[selectedIng].tokenId) {
				//push ingId into unEquipArray
				unEquipArray.push(faceTraitArray[0]);
				equipArray.push(faceTraitArray[selectedIng]);
			}
			//currenly not equipping ingredient
			if (ingId == 0 && ingId != faceTraitArray[selectedIng].tokenId) {
				equipArray.push(faceTraitArray[selectedIng]);
			}
			//currently equipping  background
			if (bgId != 0 && bgId != backgroundArray[selectedBackgroundId].tokenId) {
				//push bgId into unEquipArray
				unEquipArray.push(backgroundArray[0]);
				equipArray.push(backgroundArray[selectedBackgroundId]);
			}
			if (bgId == 0 && bgId != backgroundArray[selectedBackgroundId].tokenId) {
				equipArray.push(backgroundArray[selectedBackgroundId]);
			}
		}
		return { equipArray, unEquipArray };
	};
	const getCalls = (equipArray: Trait[], unEquipArray: Trait[]) => {
		let equipCalls = getEquipCalls(equipArray, address!, tokenId);
		let unEquipCalls = getUnequipCalls(unEquipArray, tokenId);
		return [...unEquipCalls, ...equipCalls];
	};
	const { writeAsync: execute } = useContractWrite({
		calls: getCalls(getChanges().equipArray, getChanges().unEquipArray),
	});
	const saveChanges = async () => {
		try {
			const response = await execute();
			addTransaction({
				hash: response.transaction_hash,
				metadata: { transactionName: "Unequip and Equip Invokes." },
			});
			props.close();
		} catch (e) {
			console.log(e);
		}
	};

	//use effect funtion that checks if there are changes
	useEffect(() => {
		if (
			ingId == faceTraitArray[selectedIng].tokenId &&
			bgId == backgroundArray[selectedBackgroundId].tokenId
		) {
			setHasChanges(false);
		} else {
			setHasChanges(true);
		}
	}, [
		selectedIng,
		selectedBackgroundId,
		faceTraitArray,
		backgroundArray,
		ingId,
		bgId,
	]);
	const [backgroundHasChanges, setBackgroundHasChanges] = useState(false);
	const [faceHasChanges, setFaceHasChanges] = useState(false);
	//us effect function that checks if there a changes to the background only if so it will set to true
	useEffect(() => {
		if (bgId == backgroundArray[selectedBackgroundId].tokenId) {
			setBackgroundHasChanges(false);
		} else {
			setBackgroundHasChanges(true);
		}
	}, [selectedBackgroundId, backgroundArray, bgId]);
	//us effect function that checks if there a changes to the face only if so it will set to true
	useEffect(() => {
		if (ingId == faceTraitArray[selectedIng].tokenId) {
			setFaceHasChanges(false);
		} else {
			setFaceHasChanges(true);
		}
	}, [selectedIng, faceTraitArray, ingId]);

	const closeAllModals = () => {
		setShowFaceModal(false);
		setShowBackgroundModal(false);
		setShowSaveModal(false);
	};
	const resetToInitial = (e: any) => {
		handleClick(e);
		setSelectedIng(0);
		setBackgroundId(0);
	};

	const selectBackgroundButton = (
		<div
			className={styles.editButton}
			onClick={(e) => {
				handleClick(e);
				closeAllModals();
				setShowBackgroundModal(true);
			}}
			style={
				backgroundHasChanges
					? { backgroundColor: "#29296e" }
					: { backgroundColor: " #262626" }
			}>
			{backgroundArray[selectedBackgroundId].name}
			<div
				style={{
					marginRight: "0",
					marginLeft: "auto",
				}}>
				<EditIcon />
			</div>
		</div>
	);
	const selectFaceButton = (
		<div
			className={styles.editButton}
			onClick={(e) => {
				handleClick(e);
				closeAllModals();
				setShowFaceModal(true);
			}}
			style={
				faceHasChanges
					? { backgroundColor: "#29296e" }
					: { backgroundColor: " #262626" }
			}>
			{faceTraitArray[selectedIng].name}
			<div
				style={{
					marginRight: "0",
					marginLeft: "auto",
				}}>
				<EditIcon />
			</div>
		</div>
	);
	return (
		<>
			<div
				className={styles.backgroundFade}
				onClick={hasChanges ? () => setShowExitModal(true) : props.close}>
				<div className={styles.contentContainer}>
					<div className={styles.traitsContainer}>
						<div className={styles.imageContainer} onClick={handleClick}>
							{/* background trait */}
							<Image
								src={backgroundArray[selectedBackgroundId].link}
								alt=""
								fill
								sizes="100%"
								className={styles.imageLayer}></Image>
							{/* base pill */}
							<Image
								src="/Base_StarkPill.PNG"
								alt=""
								fill
								sizes="100%"
								className={styles.imageLayer}></Image>
							{/* face trait */}
							<Image
								src={faceTraitArray[selectedIng].link}
								alt=""
								fill
								sizes="100%"
								className={styles.imageLayer}></Image>
						</div>
						{selectFaceButton}
						{selectBackgroundButton}
						{(selectedIng != 0 || selectedBackgroundId != 0) && (
							<div className={styles.buttonContainer}>
								<div
									className={styles.resetButton}
									onClick={(e) => resetToInitial(e)}>
									Reset
								</div>
								<div
									className={styles.saveButton}
									onClick={(e) => {
										handleClick(e);
										closeAllModals();
										setShowSaveModal(true);
									}}>
									Save
								</div>
							</div>
						)}
					</div>

					<TraitModal
						traitName={TraitName.Ingredient}
						traitArray={faceTraitArray}
						selectedTraitId={selectedIng}
						modalIsShown={showFaceModal}
						onClose={() => setShowFaceModal(false)}
						onSelect={setSelectedIng}
						isMintingPage={false}
						handleClick={handleClick}
					/>
					<TraitModal
						traitName={TraitName.Background}
						traitArray={backgroundArray}
						selectedTraitId={selectedBackgroundId}
						modalIsShown={showBackgroundModal}
						onClose={() => setShowBackgroundModal(false)}
						onSelect={setBackgroundId}
						isMintingPage={false}
						handleClick={handleClick}
					/>

					{showSaveModal && (
						<SaveModal
							close={() => setShowSaveModal(false)}
							handleClick={handleClick}
							saveChanges={saveChanges}
							unEquipArray={getChanges().unEquipArray}
							equipArray={getChanges().equipArray}
							tokenId={tokenId}
							oldImage={oldImage}
							oldBg={bgImageId}
							oldIng={ingImageId}
							newIng={faceTraitArray[selectedIng].id}
							newBg={backgroundArray[selectedBackgroundId].id}
						/>
					)}
					{showExitModal && (
						<ExitModal
							leaveWithoutSaving={props.close}
							closeModal={() => setShowExitModal(false)}
							handleClick={handleClick}
						/>
					)}
				</div>
			</div>
		</>
	);
};
