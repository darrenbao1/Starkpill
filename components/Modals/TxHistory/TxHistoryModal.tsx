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
	const result: any[] = [];
	const changeAttributeMap = new Map<string, any[]>();

	// Iterate over the transactions
	for (let i = 0; i < txArray.length; i++) {
		const transaction = txArray[i];
		const { transactionType, hash } = transaction;

		if (transactionType === "TRANSFER" || transactionType === "MINT") {
			result.push(transaction);
		} else if (transactionType === "CHANGE_ATTRIBUTE") {
			if (changeAttributeMap.has(hash)) {
				(changeAttributeMap.get(hash) as any[]).push(transaction);
			} else {
				changeAttributeMap.set(hash, [transaction]);
				result.push(changeAttributeMap.get(hash));
			}
		}
	}
	console.log(result);
	//from txArray get all tx that has transactionType === "MINT"

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
					{result.map((item, index) => {
						if (Array.isArray(item)) {
							// Pass the array of events directly to TraitChange component
							return <TraitChange events={item} key={index} />;
						} else if (item.transactionType === "MINT") {
							// Handle MINT event
							return (
								<Minted
									txHash={item.hash}
									timeStamp={item.timestamp}
									key={index}
								/>
							);
						} else if (item.transactionType === "TRANSFER") {
							// Handle TRANSFER event
							return (
								<Transfer
									txHash={item.hash}
									timeStamp={item.timestamp}
									to={item.transfer.to.address}
									from={item.transfer.from.address}
									key={index}
								/>
							);
						} else {
							// Handle other cases
							return null;
						}
					})}
				</ContentContainer>
			</ModalContainer>
		</ModalBackground>
	);
};
