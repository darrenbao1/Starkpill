import { Action } from "../../types/interfaces";
import {
	ButtonContainer,
	CancelButton,
	ConfirmButton,
	Container,
	ContentContainer,
	ModalContainer,
} from "./UnfollowModal.styles";

interface Props {
	close: () => void;
	handleAction: () => void;
	walletAddress: string;
	actionIndex: number;
}

export const ActionModal = (props: Props) => {
	//destructure props
	const { close, handleAction, walletAddress, actionIndex } = props;
	const actionName = actionIndex === Action.Unfollow ? "Unfollow" : "Remove";
	const headerText =
		actionIndex === Action.Unfollow
			? "Are you sure you want to unfollow?"
			: "Are you sure you want to remove this follower?";

	const shortenWalletAddress = walletAddress.slice(0, 8) + "...";

	return (
		<ModalContainer>
			<Container>
				<ContentContainer>
					<h1>
						{actionName} {shortenWalletAddress}?
					</h1>
					<p>{headerText}</p>
				</ContentContainer>
				<ButtonContainer>
					<CancelButton onClick={close}>Cancel</CancelButton>
					<ConfirmButton onClick={handleAction}>{actionName}</ConfirmButton>
				</ButtonContainer>
			</Container>
		</ModalContainer>
	);
};
