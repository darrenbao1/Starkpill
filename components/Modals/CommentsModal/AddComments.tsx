import { useEffect, useState } from "react";
import {
	GetResponseMessage,
	createComment,
	getTokenImage,
} from "../../../types/utils";
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
	InsertEmojiIcon,
	TextAreaContainer,
	TextareaFooter,
	InsertGIFIcon,
	UploadPicIcon,
	IconsWrapper,
} from "./CommentsModal.styles";
import { useLoader } from "../../Provider/LoaderProvider";
import { useQuery } from "@apollo/client";
import { UserProfileBasic } from "../../../types/interfaces";
import { GET_USER_PROFILE_BASIC } from "../../../types/constants";
import { EmojiSelectionModal } from "../EmojiSelectionModal/EmojiSelectionModal";
import { useToast } from "../../Provider/ToastProvider";

interface Props {
	postId: number;
	refetch: () => void;
}

export const AddComments = ({ postId, refetch }: Props) => {
	const [showEmojiModal, setShowEmojiModal] = useState(false);
	const [profilePictureUrl, setProfilePictureUrl] = useState<string | null>(
		null
	);
	const { data: viewerData } = useQuery(GET_USER_PROFILE_BASIC, {
		variables: {
			address: localStorage.getItem("walletAddress"),
		},
	});
	const profile: UserProfileBasic = viewerData?.user;
	useEffect(() => {
		const fetchProfilePicture = async () => {
			try {
				const imageUrl = await getTokenImage(profile?.profilePictureTokenId);
				setProfilePictureUrl(imageUrl);
			} catch (error) {
				console.error("Error fetching profile picture:", error);
			}
		};

		if (profile?.profilePictureTokenId) {
			fetchProfilePicture();
		}
	}, [profile]);

	const { showLoader, hideLoader } = useLoader();
	const [commentText, setCommentText] = useState("");

	const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
		setCommentText(event.target.value);
	};
	const { showToast } = useToast();
	const addCommentClicked = async () => {
		showLoader();
		if (commentText.trim()) {
			// only proceed if commentText is not just whitespace
			await createComment(postId, commentText).then((message) => {
				showToast(GetResponseMessage(message));
				refetch();
				hideLoader();
				setCommentText("");
			});
		}
	};
	const handleEmojiSelect = (emoji: string) => {
		setCommentText(commentText + emoji);
		setShowEmojiModal(false);
	};
	return (
		<AddCommentContainer>
			<ProfilePictureContainerAddComment>
				<ProfilePic
					src={profilePictureUrl ? profilePictureUrl : "/basepill.png"}
					width={56}
					height={56}
					alt=""
				/>
			</ProfilePictureContainerAddComment>
			<TextAreaContainer>
				<AddCommentTextArea
					value={commentText}
					onChange={handleTextChange}
					placeholder="Add a comment..."
				/>
				<TextareaFooter>
					<IconsWrapper>
						<UploadPicIcon />
						<InsertGIFIcon />

						<InsertEmojiIcon onClick={() => setShowEmojiModal(true)} />
					</IconsWrapper>
					<EmojiSelectionModal
						onSelect={handleEmojiSelect}
						close={() => setShowEmojiModal(false)}
						showEmojiModal={showEmojiModal}
					/>
					<Enter onClick={addCommentClicked} disabled={commentText.trim()} />
				</TextareaFooter>
			</TextAreaContainer>
		</AddCommentContainer>
	);
};
