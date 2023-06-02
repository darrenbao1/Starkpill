import { useQuery } from "@apollo/client";
import { GET_TXHISTORY_BY_TOKENID } from "../../../types/constants";
import {
	ModalBackground,
	ModalCloseButton,
	ModalContainer,
} from "./TxHistoryModal.styles";
import Cross from "../../../public/svgs/cross2.svg";
import { useRef } from "react";
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
	return (
		<ModalBackground ref={modalRef}>
			<ModalContainer>
				<ModalCloseButton
					onClick={(event) => {
						event.stopPropagation();
						props.close();
					}}>
					<Cross />
				</ModalCloseButton>
			</ModalContainer>
		</ModalBackground>
	);
};
