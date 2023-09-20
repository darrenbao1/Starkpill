import { Post } from "../../ProfilePageComponents/Post";
import {
	CommentsModalContainer,
	CommentsModalHeader,
	Wrapper,
} from "./CommentsModal.styles";
import { UserProfile } from "../../../types/interfaces";
import { shortenAddress } from "../../../types/utils";
import { Comment } from "../../Comment/Comment";
import { PostCommentWrapper } from "../../Comment/Comment.styles";
interface Props {
	profilePictureUrl: string;
	profileObject: UserProfile;
}
export const CommentsModal = (props: Props) => {
	const { profilePictureUrl, profileObject } = props;

	return (
		<Wrapper>
			<CommentsModalContainer>
				<CommentsModalHeader>
					{profileObject.username
						? profileObject.username
						: shortenAddress(profileObject.address)}
					's Post
				</CommentsModalHeader>
				{/* <PostCommentWrapper> */}
				<Post
					profilePictureUrl={
						profilePictureUrl ? profilePictureUrl : "/basepill.png"
					}
					profileObject={profileObject}
				/>
				<Comment />
				<Comment />
				<Comment />
				{/* </PostCommentWrapper> */}
			</CommentsModalContainer>
		</Wrapper>
	);
};
