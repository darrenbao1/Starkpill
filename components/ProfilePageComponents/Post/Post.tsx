import { useEffect, useState } from "react";
import {
	CaptionContainer,
	CommentIcon,
	CommentLikeContainer,
	KebabMenu,
	LikeIcon,
	LikeIconWrapper,
	NamesContainer,
	NamesKebabWrapper,
	PostContainer,
	PostContentContainer,
	PostImage,
	PostImageContainer,
	ProfilePictureContainer,
} from "./Post.styles";
import {
	PostMinimal,
	Post as PostObject,
	UserProfileBasic,
} from "../../../types/interfaces";
import { ProfilePic } from "../StatusUpdateSection/StatusUpdateSection.styles";
import {
	LikePost,
	UnlikePost,
	convertUnixToDate,
	getTokenImage,
	shortenAddress,
} from "../../../types/utils";
import Image from "next/image";
import { useQuery } from "@apollo/client";
import {
	GET_POST_BY_ID,
	GET_USER_PROFILE_BASIC,
} from "../../../types/constants";

import { PostKebabMenu } from "../../Modals/PostKebabMenu";

interface Props {
	postMinimal: PostMinimal;
	isCommentModal?: boolean;
}

export const Post = (props: Props) => {
	const [showKebabMenu, setShowKebabMenu] = useState(false);

	const { postMinimal } = props;
	const [showCommentsModal, setShowCommentsModal] = useState(false);
	const [profilePictureUrl, setProfilePictureUrl] = useState<string | null>(
		null
	);

	// First query
	const { data: postResult, refetch: refetchPost } = useQuery(GET_POST_BY_ID, {
		variables: { postId: postMinimal.id },
	});

	const post: PostObject = postResult?.postById;

	// Use skip option for the second query
	const { data: profileResult } = useQuery(GET_USER_PROFILE_BASIC, {
		variables: { address: post?.authorAddress },
		skip: !post,
	});

	const profile: UserProfileBasic = profileResult?.user;

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

	if (!post || !profile) {
		return <div>Loading...</div>;
	}

	const loggedInUserAddress = localStorage.getItem("walletAddress");
	if (!loggedInUserAddress) {
		return <div>Wallet not connected</div>;
	}

	const isLiked = post.likedByAddresses.includes(loggedInUserAddress);

	let gridColumns = "1fr";
	if (post?.images) {
		if (post.images.length === 1) {
			gridColumns = "1fr";
		} else if (post.images.length === 2) {
			gridColumns = "1fr 1fr";
		} else if (post.images.length >= 3) {
			gridColumns = "1fr 1fr 1fr";
		}
	}

	const handleLikeClicked = async () => {
		await LikePost(post?.id);
		refetchPost();
	};

	const handleUnlikeClicked = async () => {
		await UnlikePost(post?.id);
		refetchPost();
	};

	// const handleKebabMenuClick = () => {
	// 	setShowKebabMenu(!showKebabMenu);
	// 	console.log("kebab menu clicked");
	// };
	return (
		<>
			<PostContainer>
				<ProfilePictureContainer>
					<ProfilePic
						src={profilePictureUrl || "/basepill.png"}
						width={56}
						height={56}
						alt=""
					/>
				</ProfilePictureContainer>
				<PostContentContainer>
					<NamesKebabWrapper>
						<NamesContainer>
							<h1>
								{profile.username
									? profile.username
									: shortenAddress(profile.address)}
							</h1>
							<h2>{profile.twitterHandle && profile.twitterHandle}</h2>
							<h2>•&nbsp;{convertUnixToDate(Number(post.createdAt))} </h2>
						</NamesContainer>
						{/* <KebabMenu
							onClick={() => {
								handleKebabMenuClick();
							}}
						/> */}
						{/* {showKebabMenu && <PostKebabMenu />} */}
					</NamesKebabWrapper>

					<CaptionContainer>{post.content}</CaptionContainer>

					{post.images && post.images.length > 0 && (
						<PostImageContainer style={{ gridTemplateColumns: gridColumns }}>
							{post.images.map((imageUrl, index) => (
								<PostImage key={index}>
									<Image
										src={imageUrl}
										alt=""
										fill={true}
										sizes="100vw"
										style={{
											borderRadius: "12px",
											objectFit: "fill",
										}}
									/>
								</PostImage>
							))}
						</PostImageContainer>
					)}
					<CommentLikeContainer>
						{!props.isCommentModal && (
							<LikeIconWrapper onClick={() => setShowCommentsModal(true)}>
								<CommentIcon />
								{post.comments.length} Comment
							</LikeIconWrapper>
						)}
						<LikeIconWrapper
							onClick={!isLiked ? handleLikeClicked : handleUnlikeClicked}>
							<LikeIcon isLiked={isLiked} />
							{post.likes.length} Likes
						</LikeIconWrapper>
					</CommentLikeContainer>
				</PostContentContainer>
				{showCommentsModal && (
					<CommentsModal
						closeModal={() => setShowCommentsModal(false)}
						profileObject={profile}
						postObject={post}
						refetch={refetchPost}
					/>
				)}
			</PostContainer>
		</>
	);
};
