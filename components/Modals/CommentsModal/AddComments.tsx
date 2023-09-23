import {
	ProfilePictureContainer,
	ProfilePictureContainerAddComment,
} from "../../ProfilePageComponents/Post/Post.styles";
import { ProfilePic } from "../../ProfilePageComponents/StatusUpdateSection/StatusUpdateSection.styles";
import {
	AddCommentContainer,
	AddCommentTextArea,
	Enter,
	GIFIconContainer,
	TextAreaContainer,
	TextareaFooter,
} from "./CommentsModal.styles";

export const AddComments = () => {
	return (
		<AddCommentContainer>
			<ProfilePictureContainerAddComment>
				<ProfilePic src="/Base_StarkPill.PNG" width={56} height={56} alt="" />
			</ProfilePictureContainerAddComment>
			<TextAreaContainer>
				<AddCommentTextArea placeholder="Add a comment..."></AddCommentTextArea>
				<TextareaFooter>
					<GIFIconContainer />
					<Enter />
				</TextareaFooter>
			</TextAreaContainer>
		</AddCommentContainer>
	);
};
