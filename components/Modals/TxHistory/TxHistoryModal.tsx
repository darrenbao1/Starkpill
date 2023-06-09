import { useQuery } from "@apollo/client";
import { GET_TXHISTORY_BY_TOKENID } from "../../../types/constants";
import {
	HeaderContainer,
	ModalBackground,
	ModalCloseButton,
	ModalContainer,
	ContentContainer,
	HeaderContainerWrapper,
} from "./TxHistoryModal.styles";
import CrossIcon from "../../../public/PillActivityModalCross.svg";
import { useRef } from "react";
import { Transfer, Minted, TraitChange } from "./Events";

interface Props {
	tokenId: number;
	close: () => void;
	showTxHistoryModal: boolean;
}

export const TxHistoryModal = (props: Props) => {
	//destructure props
	const { tokenId, close, showTxHistoryModal } = props;
	const { data, loading } = useQuery(GET_TXHISTORY_BY_TOKENID, {
		variables: {
			tokenId: tokenId,
		},
	});
	const modalRef = useRef<HTMLDivElement>(null);
	if (!showTxHistoryModal) {
		return null;
	}
	if (loading) {
		return <div>Loading...</div>;
	}
	const txArray = data.token.transactions;
	console.log(...txArray);
	return (
		<ModalBackground ref={modalRef}>
			<ModalContainer>
				<HeaderContainerWrapper>
					<HeaderContainer>
						<h1>Pill Activity </h1>
						<ModalCloseButton
							onClick={(event) => {
								event.stopPropagation();
								props.close();
							}}>
							<CrossIcon />
						</ModalCloseButton>
					</HeaderContainer>
				</HeaderContainerWrapper>
				<ContentContainer>
					<h1>Events</h1>
					{txArray.map((tx: any, index: number) =>
						tx.transactionType === "MINT" ? (
							<Minted txHash={tx.hash} timeStamp={tx.timestamp} key={index} />
						) : tx.transactionType === "TRANSFER" ? (
							<Transfer
								txHash={tx.hash}
								timeStamp={tx.timestamp}
								to={tx.transfer.to.address}
								from={tx.transfer.from.address}
								key={index}
							/>
						) : (
							<TraitChange key={index} />
						)
					)}

					{/* <Transfer />
					<TraitChange /> */}
					{/* <Minted /> */}
				</ContentContainer>
			</ModalContainer>
		</ModalBackground>
	);
};
