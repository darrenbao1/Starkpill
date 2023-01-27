import { useAccount } from "@starknet-react/core";
import styles from "../../styles/EditPillModal.module.css";
import Image from "next/image";
import EditIcon from "../../public/svgs/Edit.svg";
import { BACKGROUND, FACE_TRAITS } from "../../types/constants";
import { TraitsModal } from "./TraitsModal";
import { useEffect, useState } from "react";
import { getUserBackPack } from "../../types/utils";
import { Trait } from "../../types/interfaces";
import { ExitModal } from "./ExitModal";
interface Props {
	tokenId: number;
	ingId?: number;
	bgId?: number;
	ingImageId: number;
	bgImageId: number;
	close: () => void;
}
export const EditPillModal = (props: Props) => {
	function handleClick(event: any) {
		event.stopPropagation();
	}
	const { address } = useAccount();
	const { tokenId, ingId, bgId, ingImageId, bgImageId } = props;
	const [showBackgroundModal, setShowBackgroundModal] = useState(false);
	const [showFaceModal, setShowFaceModal] = useState(false);
	let bgTrait: Trait = BACKGROUND[Number(bgImageId)];
	bgTrait.tokenId = bgId;
	const [backgroundArray, setBackgroundArray] = useState<Trait[]>([bgTrait]);
	let faceTrait: Trait = FACE_TRAITS[Number(ingImageId)];
	faceTrait.tokenId = ingId;
	const [faceTraitArray, setFaceTraitArrays] = useState<Trait[]>([faceTrait]);
	const [selectedIng, setSelectedIng] = useState(0);
	const [selectedBackgroundId, setBackgroundId] = useState(0);
	const [showExitModal, setShowExitModal] = useState(false);
	const [showSaveModal, setShowSaveModal] = useState(false);
	useEffect(() => {
		async function fetchData() {
			if (address) {
				const res = await getUserBackPack(address);
				setBackgroundArray([...backgroundArray, ...res.backgroundArray]);
				setFaceTraitArrays([...faceTraitArray, ...res.ingredientArray]);
			}
		}
		fetchData();
	}, [address]);
	const [hasChanges, setHasChanges] = useState(false);
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
	}, [selectedIng, selectedBackgroundId]);
	const closeAllModals = () => {
		setShowFaceModal(false);
		setShowBackgroundModal(false);
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
		>
			{backgroundArray[selectedBackgroundId].name}
			<div
				style={{
					marginRight: "0",
					marginLeft: "auto",
				}}
			>
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
		>
			{faceTraitArray[selectedIng].name}
			<div
				style={{
					marginRight: "0",
					marginLeft: "auto",
				}}
			>
				<EditIcon />
			</div>
		</div>
	);
	return (
		<>
			<div
				className={styles.backgroundFade}
				onClick={hasChanges ? () => setShowExitModal(true) : props.close}
			>
				<div className={styles.contentContainer}>
					<div className={styles.traitsContainer}>
						<div className={styles.imageContainer} onClick={handleClick}>
							{/* background trait */}
							<Image
								src={backgroundArray[selectedBackgroundId].link}
								alt=""
								fill
								sizes="100%"
								className={styles.imageLayer}
							></Image>
							{/* base pill */}
							<Image
								src="/Base_StarkPill.PNG"
								alt=""
								fill
								sizes="100%"
								className={styles.imageLayer}
							></Image>
							{/* face trait */}
							<Image
								src={faceTraitArray[selectedIng].link}
								alt=""
								fill
								sizes="100%"
								className={styles.imageLayer}
							></Image>
						</div>
						{selectFaceButton}
						{selectBackgroundButton}

						<div className={styles.buttonContainer}>
							<div
								className={styles.resetButton}
								onClick={(e) => resetToInitial(e)}
							>
								reset
							</div>
							<div className={styles.saveButton}>save</div>
						</div>
					</div>
					{showExitModal && (
						<ExitModal
							leaveWithoutSaving={props.close}
							closeModal={() => setShowExitModal(false)}
							handleClick={handleClick}
						/>
					)}
					{showFaceModal && (
						<TraitsModal
							traitName="ingredient #1"
							trait={faceTraitArray}
							selectedId={selectedIng}
							close={() => setShowFaceModal(false)}
							select={setSelectedIng}
							handleClick={handleClick}
						/>
					)}
					{showBackgroundModal && (
						<TraitsModal
							traitName="ingredient #2"
							trait={backgroundArray}
							selectedId={selectedBackgroundId}
							close={() => setShowBackgroundModal(false)}
							select={setBackgroundId}
							handleClick={handleClick}
						/>
					)}
				</div>
			</div>
		</>
	);
};
