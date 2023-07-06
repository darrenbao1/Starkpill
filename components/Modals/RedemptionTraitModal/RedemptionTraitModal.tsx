import { BACKGROUND, FACE_TRAITS } from "../../../types/constants";
import Cross from "../../../public/png/close.png";
import {
	ModalContainer,
	ModalHeader,
	RedeemButton,
	TraitModal,
	CrossImage,
	TopContainer,
	HeaderText,
	CardContainer,
} from "./RedemptionTraitModal.styles";
import { CollabProject, decodedSignature } from "../../../types/interfaces";
import { getRedemptionSignature } from "../../../types/utils";
import { useContractWrite, useTransactionManager } from "@starknet-react/core";
import { getRedemptionVariables } from "../../../hooks/StarkPillContract";
import { useAccount } from "wagmi";
import { useEffect, useState } from "react";
import { RedemptionTraitCard } from "./RedemptionTraitCard";

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
	const { writeAsync: execute } = useContractWrite({
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
						<HeaderText>Redeemable Traits</HeaderText>
					</ModalHeader>
					<CrossImage src={Cross} alt="cross" onClick={props.handleClose} />
				</TopContainer>
				<CardContainer>
					<RedemptionTraitCard
						name={FACE_TRAITS[props.project.redeemIngId].name}
						imageUrl={FACE_TRAITS[props.project.redeemIngId].marketViewLink!}
					/>
					{props.project.redeemBgId && (
						<RedemptionTraitCard
							name={BACKGROUND[props.project.redeemBgId].name}
							imageUrl={BACKGROUND[props.project.redeemBgId].link}
						/>
					)}
				</CardContainer>
				<RedeemButton onClick={handleClick}>Redeem</RedeemButton>
			</TraitModal>
		</ModalContainer>
	);
};
