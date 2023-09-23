import { Post as PostUI } from "../../ProfilePageComponents/Post";
import {
	Close,
	CommentsModalContainer,
	CommentsModalHeader,
	Wrapper,
} from "./CommentsModal.styles";

import { Comment } from "../../Comment/Comment";
import { AddComments } from "./AddComments";
import { PostCommentWrapper } from "../../Comment/Comment.styles";
import { Post, UserProfileBasic } from "../../../types/interfaces";
import { shortenAddress } from "../../../types/utils";

interface Props {
	// profilePictureUrl: string;
	profileObject: UserProfileBasic;
	postObject: Post;

	closeModal: () => void;
	refetch: () => void;
}
export const CommentsModal = ({
	closeModal,
	postObject,
	profileObject,
	refetch,
}: Props) => {
	return (
		<Wrapper>
			<CommentsModalContainer>
				<CommentsModalHeader>
					{profileObject.username
						? profileObject.username
						: shortenAddress(profileObject.address)}
					&apos;s Post
					<Close onClick={closeModal} />
				</CommentsModalHeader>

				<PostCommentWrapper>
					<PostUI postMinimal={postObject} isCommentModal={true} />
					{postObject.comments.map((comment, index) => {
						return <Comment key={index} CommentObject={comment} />;
					})}
				</PostCommentWrapper>
				<AddComments postId={postObject.id} refetch={refetch} />
			</CommentsModalContainer>
		</Wrapper>
	);
};
