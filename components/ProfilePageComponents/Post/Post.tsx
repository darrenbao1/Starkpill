import {
	CaptionContainer,
	CommentIcon,
	CommentLikeContainer,
	LikeIcon,
	LikeIconWrapper,
	NamesContainer,
	PostContainer,
	PostContentContainer,
	PostImageContainer,
	ProfilePictureContainer,
} from "./Post.styles";
import { UserProfile } from "../../../types/interfaces";
import { ProfilePic } from "../StatusUpdateSection/StatusUpdateSection.styles";
import { shortenAddress } from "../../../types/utils";
import { useState } from "react";
import { CommentsModal } from "../../Modals/CommentsModal";

interface Props {
	profilePictureUrl: string;
	profileObject: UserProfile;
}

export const Post = (props: Props) => {
	const { profileObject, profilePictureUrl } = props;
	const [CommentModalOpen, setCommentModalOpen] = useState(false);
	const onClickCommentHandler = () => {
		setCommentModalOpen(true);
	};
	return (
		<>
			<PostContainer>
				<ProfilePictureContainer>
					<ProfilePic src={profilePictureUrl} width={56} height={56} alt="" />
				</ProfilePictureContainer>
				<PostContentContainer>
					<NamesContainer>
						<h1>
							{profileObject.username
								? profileObject.username
								: shortenAddress(profileObject.address)}
						</h1>
						<h2>
							{profileObject.twitterHandle && profileObject.twitterHandle}
						</h2>
						{/* <h2>• *timestamp here* </h2>   */}
					</NamesContainer>
					<CaptionContainer>Lorem ipsum</CaptionContainer>
					<PostImageContainer>Image / GIF here</PostImageContainer>

					<CommentLikeContainer>
						<LikeIconWrapper onClick={onClickCommentHandler}>
							<CommentIcon />
							Comment
						</LikeIconWrapper>
						<LikeIconWrapper>
							<LikeIcon />
							Like
						</LikeIconWrapper>
					</CommentLikeContainer>
				</PostContentContainer>
			</PostContainer>
			{CommentModalOpen && (
				<CommentsModal
					profilePictureUrl={
						profilePictureUrl ? profilePictureUrl : "/basepill.png"
					}
					profileObject={profileObject}
				/>
			)}
		</>
	);
};
