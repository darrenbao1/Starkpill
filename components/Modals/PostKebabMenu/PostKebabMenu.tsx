import { GetResponseMessage, deletePost } from "../../../types/utils";
import { useLoader } from "../../Provider/LoaderProvider";
import { useToast } from "../../Provider/ToastProvider";
import {
	ButtonContainer,
	CancelButton,
	ConfirmButton,
	Container,
	ContentContainer,
	ModalContainer,
} from "../../UnfollowModal/UnfollowModal.styles";
import { Delete, KebabContainer, KebabOption } from "./PostKebabMenu.styles";
import { useState } from "react";
interface Props {
	postId: number;
	closeModal: () => void;
	refetch: () => void;
}

export const PostKebabMenu = ({ postId, closeModal, refetch }: Props) => {
	const { showToast } = useToast();
	const { showLoader, hideLoader } = useLoader();
	const [confirmDeleteModal, setConfirmDeleteModal] = useState(false);
	const handleDeletePost = async () => {
		showLoader();
		await deletePost(postId).then((message) => {
			hideLoader();
			showToast(GetResponseMessage(message));
			closeModal();
			refetch();
		});
	};

	return (
		<>
			<KebabContainer>
				<KebabOption onClick={() => setConfirmDeleteModal(true)}>
					<Delete /> Delete Post
				</KebabOption>
			</KebabContainer>
			{confirmDeleteModal && (
				<ModalContainer>
					<Container>
						<ContentContainer>
							<h1>Delete post?</h1>
							<p>Are you sure? Changes cannot be undone.</p>
						</ContentContainer>
						<ButtonContainer>
							<CancelButton onClick={closeModal}>Cancel</CancelButton>
							<ConfirmButton onClick={() => handleDeletePost()}>
								Delete
							</ConfirmButton>
						</ButtonContainer>
					</Container>
				</ModalContainer>
			)}
		</>
	);
};
