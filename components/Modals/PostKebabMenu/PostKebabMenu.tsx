import { GetResponseMessage, deletePost } from "../../../types/utils";
import { useLoader } from "../../Provider/LoaderProvider";
import { useToast } from "../../Provider/ToastProvider";
import { Delete, KebabContainer, KebabOption } from "./PostKebabMenu.styles";
interface Props {
	postId: number;
	closeModal: () => void;
	refetch: () => void;
}

export const PostKebabMenu = ({ postId, closeModal, refetch }: Props) => {
	const { showToast } = useToast();
	const { showLoader, hideLoader } = useLoader();
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
		<KebabContainer>
			<KebabOption onClick={() => handleDeletePost()}>
				<Delete /> Delete Post
			</KebabOption>
		</KebabContainer>
	);
};
