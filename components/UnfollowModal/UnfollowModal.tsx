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
	handleUnfollow: () => void;
	walletAddress: string;
}
export const UnfollowModal = (props: Props) => {
	//destructure props
	const { close, handleUnfollow, walletAddress } = props;
	const shortenWalletAddress = walletAddress.slice(0, 8) + "...";

	return (
		<ModalContainer>
			<Container>
				<ContentContainer>
					<h1>Unfollow {shortenWalletAddress}?</h1>
					<p>Are you sure you want to unfollow?</p>
				</ContentContainer>
				<ButtonContainer>
					<CancelButton onClick={close}>Cancel</CancelButton>
					<ConfirmButton onClick={handleUnfollow}>Unfollow</ConfirmButton>
				</ButtonContainer>
			</Container>
		</ModalContainer>
	);
};
