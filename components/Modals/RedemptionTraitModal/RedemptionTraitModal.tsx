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
import { CollabProject, decodedSignature } from "../../../types/interfaces";
import { getRedemptionSignature } from "../../../types/utils";
import {
	useStarknetExecute,
	useTransactionManager,
} from "@starknet-react/core";
import { getRedemptionVariables } from "../../../hooks/StarkPillContract";
import { useAccount } from "wagmi";
import { useEffect, useState } from "react";

export const RedemptionTraitModal = (props: {
	project: CollabProject;
	showTraitModal: boolean;
	handleClose: () => void;
	nftTokenId: number;
}) => {
	const [signature, setSignature] = useState<decodedSignature>({
		v: 0,
		rLow: "",
		rHigh: "",
		sLow: "",
		sHigh: "",
	});
	const { addTransaction } = useTransactionManager();
	const account = useAccount();
	const accountAddress = account.address!.toString();
	const redemptionVariable = getRedemptionVariables(
		accountAddress,
		props.project.contract_address,
		props.nftTokenId,
		signature
	);
	const { execute } = useStarknetExecute({
		calls: redemptionVariable,
	});

	useEffect(() => {
		if (signature !== null) {
			executeTransaction();
		}
	}, [signature]);

	const executeTransaction = async () => {
		try {
			const response = await execute();
			addTransaction({
				hash: response.transaction_hash,
				metadata: { transactionName: "Redeem" },
			});
			props.handleClose();
		} catch (e) {
			console.log(e);
		}
	};

	if (!props.showTraitModal || props.nftTokenId === 0) {
		return null;
	}

	const handleClick = async () => {
		const signature = await getRedemptionSignature(
			props.project.contract_address,
			props.nftTokenId
		);

		if (signature !== "error") {
			setSignature(signature);
		} else {
			console.log("signature error");
		}
	};
	return (
		<ModalContainer>
			<TraitModal>
				<TopContainer>
					<ModalHeader>
						<HeaderText>
							{FACE_TRAITS[props.project.redeemIngId].name}
						</HeaderText>
					</ModalHeader>
					<CrossImage src={Cross} alt="cross" onClick={props.handleClose} />
				</TopContainer>

				<ImageContainer>
					<img src={FACE_TRAITS[props.project.redeemIngId].marketViewLink} />
				</ImageContainer>

				{/* OnClick to redeem here  */}
				<RedeemButton onClick={handleClick}>Redeem</RedeemButton>
			</TraitModal>
		</ModalContainer>
	);
};
