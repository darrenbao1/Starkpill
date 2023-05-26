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
import { getRedemptionSignature } from "../../../types/utils";

export const RedemptionTraitModal = (props: {
	project: CollabProject;
	showTraitModal: boolean;
	handleClose: () => void;
	nftTokenId: number;
}) => {
	if (!props.showTraitModal || props.nftTokenId === 0) {
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
				<RedeemButton
					onClick={() =>
						getRedemptionSignature(
							props.project.contract_address,
							props.nftTokenId
						)
					}>
					Redeem
				</RedeemButton>
			</TraitModal>
		</ModalContainer>
	);
};
