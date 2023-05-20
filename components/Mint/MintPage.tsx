import { useAccount } from "@starknet-react/core";
import { ConnectWalletButton } from "../../components/ConnectWalletButton";
import { useEffect, useState } from "react";
import { FACE_TRAITS, BACKGROUND } from "../../types/constants";

import { MintModal } from "../../components/Modals/MintModal";
import { TraitModal } from "../../components/TraitModal/components/TraitModal";
import { TraitName } from "../../types/interfaces";
import {
	BackgroundFade,
	ContentContainer,
	StyledButton,
	EditIcon,
	TraitsContainer,
	ImageContainer,
	CompanyLogo,
	ImageLayer,
} from "../Mint/MintPage.styles";
const MintPage = () => {
	const { account } = useAccount();
	const [showFaceModal, setShowFaceModal] = useState(false);
	const [showBackgroundModal, setShowBackgroundModal] = useState(false);
	const [selectedFaceId, setSelectedFaceId] = useState(0);
	const [selectedBackgroundId, setBackgroundId] = useState(0);
	const [hasEditedFace, setHasEditedFace] = useState(false);
	const [hasEditedBackground, setHasEditedBackground] = useState(false);
	const [showMintModal, setShowMintModal] = useState(false);
	const closeAllModals = () => {
		setShowFaceModal(false);
		setShowBackgroundModal(false);
		setShowMintModal(false);
	};

	const [width, setWidth] = useState<number>(0);

	useEffect(() => {
		if (typeof window !== "undefined") {
			setWidth(window.innerWidth);
			window.addEventListener("resize", handleWindowSizeChange);
			return () => {
				window.removeEventListener("resize", handleWindowSizeChange);
			};
		}
	}, []);

	function handleWindowSizeChange() {
		if (typeof window !== "undefined") {
			setWidth(window.innerWidth);
		}
	}

	const isMobile = width <= 768;

	const selectFaceButton = (
		<StyledButton
			hasEditedFace={hasEditedFace}
			onClick={() => {
				if (!hasEditedFace) {
					setHasEditedFace(true);
				}
				closeAllModals();
				setShowFaceModal(true);
			}}>
			{hasEditedFace
				? FACE_TRAITS[selectedFaceId].name
				: isMobile
				? "Ingredient"
				: "Select Ingredient"}
			{hasEditedFace && <EditIcon />}
		</StyledButton>
	);
	const selectBackgroundButton = (
		<StyledButton
			hasEditedFace={hasEditedFace}
			onClick={() => {
				if (!hasEditedBackground) {
					setHasEditedBackground(true);
				}
				closeAllModals();
				setShowBackgroundModal(true);
			}}>
			{hasEditedBackground
				? BACKGROUND[selectedBackgroundId].name
				: isMobile
				? "Background"
				: "Select Background"}
			{hasEditedBackground && <EditIcon />}
		</StyledButton>
	);
	const mintButton = !showMintModal && (
		<div
			className="connectWalletButton"
			style={{
				padding: "1rem 4rem",
				fontSize: "32px",
			}}
			onClick={() => {
				closeAllModals();
				setShowMintModal(true);
			}}>
			Mint
		</div>
	);

	return (
		<div className="container">
			<BackgroundFade></BackgroundFade>
			<ContentContainer>
				<TraitsContainer>
					<ImageContainer>
						{/* background trait */}
						<ImageLayer
							src={BACKGROUND[selectedBackgroundId].link}
							alt=""
							fill
							sizes="100%"></ImageLayer>
						{/* base pill */}
						<ImageLayer
							src="/Base_StarkPill.PNG"
							alt=""
							fill
							sizes="100%"></ImageLayer>
						{/* face trait */}
						<ImageLayer
							src={FACE_TRAITS[selectedFaceId].link}
							alt=""
							fill
							sizes="100%"></ImageLayer>
					</ImageContainer>
					{selectFaceButton}
					{selectBackgroundButton}
					{!account ? <ConnectWalletButton /> : mintButton}
				</TraitsContainer>
				<TraitModal
					modalIsShown={showFaceModal}
					traitName={TraitName.Ingredient}
					traitArray={FACE_TRAITS}
					selectedTraitId={selectedFaceId}
					onClose={() => setShowFaceModal(false)}
					onSelect={setSelectedFaceId}
					isMintingPage={true}
				/>
				<TraitModal
					modalIsShown={showBackgroundModal}
					traitName={TraitName.Background}
					traitArray={BACKGROUND}
					selectedTraitId={selectedBackgroundId}
					onClose={() => setShowBackgroundModal(false)}
					onSelect={setBackgroundId}
					isMintingPage={true}
				/>
				{showMintModal && (
					<MintModal
						close={() => setShowMintModal(false)}
						faceId={selectedFaceId}
						backgroundId={selectedBackgroundId}
					/>
				)}
				<CompanyLogo
					src="/companyLogo.png"
					height={40}
					width={136}
					alt="seraphLabs"></CompanyLogo>
			</ContentContainer>
		</div>
	);
};
export default MintPage;
