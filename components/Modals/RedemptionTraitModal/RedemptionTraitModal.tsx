import { FACE_TRAITS } from "../../../types/constants";
import Cross from "../../../public/png/close.png";
import {
	ImageContainer,
	ModalContainer,
	ModalHeader,
	RedeemButton,
	TraitModal,
	CrossImage,
	TopContainer,
	HeaderText,
} from "./RedemptionTraitModal.styles";
import { CollabProject } from "../../../types/interfaces";

export const RedemptionTraitModal = (props: {
	project: CollabProject;
	showTraitModal: boolean;
	handleClose: () => void;
}) => {
	if (!props.showTraitModal) {
		return null;
	}

	return (
		<ModalContainer>
			<TraitModal>
				<TopContainer>
					<ModalHeader>
						<HeaderText>{FACE_TRAITS[props.project.redeemId].name}</HeaderText>
					</ModalHeader>
					<CrossImage src={Cross} alt="cross" onClick={props.handleClose} />
				</TopContainer>

				<ImageContainer>
					<img src={FACE_TRAITS[props.project.redeemId].marketViewLink} />
				</ImageContainer>
				{/* OnClick to redeem here  */}
				<RedeemButton>Redeem</RedeemButton>
			</TraitModal>
		</ModalContainer>
	);
};
