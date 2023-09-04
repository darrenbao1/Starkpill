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
}

export const UnfollowModal = (props: Props) => {
	return (
		<ModalContainer>
			<Container>
				<ContentContainer>
					<h1>Unfollow 0x934897...?</h1>
					<p>Are you sure you want to unfollow?</p>
				</ContentContainer>
				<ButtonContainer>
					<CancelButton onClick={() => props.close()}>Cancel</CancelButton>
					<ConfirmButton onClick={() => props.handleUnfollow()}>
						Unfollow
					</ConfirmButton>
				</ButtonContainer>
			</Container>
		</ModalContainer>
	);
};
