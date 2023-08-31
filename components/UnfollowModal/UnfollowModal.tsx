import { Button } from "../Modals/ConnectMenuModal/ConnectMenuModal.styles";
import {
	ButtonContainer,
	CancelButton,
	ConfirmButton,
	Container,
	ContentContainer,
	ModalContainer,
	Subtitle,
	Title,
} from "./UnfollowModal.styles";

interface Props {
	close: () => void;
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
					<CancelButton onClick={props.close}>Cancel</CancelButton>
					<ConfirmButton>Unfollow</ConfirmButton>
				</ButtonContainer>
			</Container>
		</ModalContainer>
	);
};
