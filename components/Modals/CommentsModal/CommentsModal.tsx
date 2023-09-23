import { Post } from "../../ProfilePageComponents/Post";
import {
	Close,
	CommentsModalContainer,
	CommentsModalHeader,
	Wrapper,
} from "./CommentsModal.styles";

import { Comment } from "../../Comment/Comment";
import { AddComments } from "./AddComments";
import { PostCommentWrapper } from "../../Comment/Comment.styles";

interface Props {
	// profilePictureUrl: string;
	// profileObject: UserProfile;
}
export const CommentsModal = () => {
	//const { profilePictureUrl, profileObject } = props;

	return (
		<Wrapper>
			<CommentsModalContainer>
				<CommentsModalHeader>
					{/* {profileObject.username
						? profileObject.username
						: shortenAddress(profileObject.address)} */}
					&apos;s Post
					<Close />
				</CommentsModalHeader>

				<PostCommentWrapper>
					{/* <Post

					postMinimal={profileObject}
				/> */}
					<Comment />
					<Comment />
					<Comment />
					<Comment />
					<Comment />
				</PostCommentWrapper>
				<AddComments />
			</CommentsModalContainer>
		</Wrapper>
	);
};
