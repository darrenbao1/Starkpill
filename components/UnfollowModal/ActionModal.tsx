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

const actionData: Record<
	number,
	{ name: string; header: string; showAddress: boolean; buttonName: string }
> = {
	[Action.RemoveCoverPhoto]: {
		name: "Remove cover photo",
		header: "Are you sure you want to remove your cover photo?",
		showAddress: false,
		buttonName: "Remove",
	},
	[Action.Unfollow]: {
		name: "Unfollow",
		header: "Are you sure you want to unfollow?",
		showAddress: true,
		buttonName: "Unfollow",
	},
	[Action.RemoveFollower]: {
		name: "Remove",
		header: "Are you sure you want to remove this follower?",
		showAddress: true,
		buttonName: "Remove",
	},
	// Add more actions as needed
};

export const ActionModal = (props: Props) => {
	// Destructure props
	const { close, handleAction, walletAddress, actionIndex } = props;

	const actionInfo = actionData[actionIndex];

	if (!actionInfo) {
		// Handle unknown actionIndex or add a default action
		return null;
	}

	const { name, header, showAddress, buttonName } = actionInfo;

	const shortenWalletAddress = walletAddress.slice(0, 8) + "...";

	return (
		<ModalContainer>
			<Container>
				<ContentContainer>
					<h1>
						{name} {showAddress && shortenWalletAddress}?
					</h1>
					<p>{header}</p>
				</ContentContainer>
				<ButtonContainer>
					<CancelButton onClick={close}>Cancel</CancelButton>
					<ConfirmButton onClick={handleAction}>{buttonName}</ConfirmButton>
				</ButtonContainer>
			</Container>
		</ModalContainer>
	);
};
