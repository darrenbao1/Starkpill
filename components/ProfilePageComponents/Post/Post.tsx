import { useEffect, useState } from "react";
import { useRouter } from "next/router";
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
	PostImage2,
	PostImageContainer,
	PostImageContainer2,
	ProfilePictureContainer,
} from "./Post.styles";
import {
	PostMinimal,
	Post as PostObject,
	UserProfileBasic,
} from "../../../types/interfaces";
import { ProfilePic } from "../StatusUpdateSection/StatusUpdateSection.styles";
import {
	GetResponseMessage,
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
import { CommentsModal } from "../../Modals/CommentsModal";
import { useLoader } from "../../Provider/LoaderProvider";
import { useToast } from "../../Provider/ToastProvider";
import { PostImageModal } from "../../Modals/PostImageModal";
import { KebabWrapper } from "../../Modals/PostKebabMenu/PostKebabMenu.styles";

interface Props {
	postMinimal: PostMinimal;
	isCommentModal?: boolean;
	refetchUserProfile: () => void;
	walletAddress: string;
}

export const Post = (props: Props) => {
	const router = useRouter();
	const [showPostImageModal, setShowPostImageModal] = useState(false);
	const [showKebabMenu, setShowKebabMenu] = useState(false);
	const { showLoader, hideLoader } = useLoader();
	const { showToast } = useToast();
	const { postMinimal } = props;
	const { walletAddress } = props;
	const [showCommentsModal, setShowCommentsModal] = useState(false);
	const [profilePictureUrl, setProfilePictureUrl] = useState<string | null>(
		null
	);
	const [imageIndex, setImageIndex] = useState(0);

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
		showLoader();
		await LikePost(post?.id).then((message) => {
			if (GetResponseMessage(message) !== "Success") {
				showToast(GetResponseMessage(message));
			}
			refetchPost();
			hideLoader();
		});
	};

	const handleUnlikeClicked = async () => {
		showLoader();
		await UnlikePost(post?.id).then((message) => {
			if (GetResponseMessage(message) !== "Success") {
				showToast(GetResponseMessage(message));
			}
			refetchPost();
			hideLoader();
		});
	};

	const handleKebabMenuClick = () => {
		setShowKebabMenu(!showKebabMenu);
		console.log("kebab menu clicked");
	};
	const isOwnerOfPost = loggedInUserAddress === post.authorAddress;

	const openOwnerAddressLink = () => {
		router.push({
			pathname: "/profile",
			query: { walletAddress: walletAddress },
		});
	};
	const handleClose = () => {
		setShowPostImageModal(false);
	};
	return (
		<>
			<PostContainer>
				<ProfilePictureContainer onClick={openOwnerAddressLink}>
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
							<h1 onClick={openOwnerAddressLink}>
								{profile.username
									? profile.username
									: shortenAddress(profile.address)}
							</h1>
							<h2>{profile.twitterHandle && profile.twitterHandle}</h2>
							<h2>•&nbsp;{convertUnixToDate(Number(post.createdAt))} </h2>
						</NamesContainer>
						{isOwnerOfPost && (
							<KebabWrapper>
								<KebabMenu
									onClick={() => {
										handleKebabMenuClick();
									}}></KebabMenu>
								{showKebabMenu && (
									<PostKebabMenu
										postId={post.id}
										closeModal={() => setShowKebabMenu(false)}
										refetch={props.refetchUserProfile}
									/>
								)}
							</KebabWrapper>
						)}
					</NamesKebabWrapper>

					<CaptionContainer>{post.content}</CaptionContainer>

					{post.images && post.images.length > 1 ? (
						<PostImageContainer style={{ gridTemplateColumns: gridColumns }}>
							{post.images.map((imageUrl, index) => (
								<>
									<PostImage
										key={index}
										onClick={() => {
											setShowPostImageModal(true);
											setImageIndex(index);
										}}>
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
									{showPostImageModal && imageIndex === index && (
										<PostImageModal close={handleClose} imageurl={imageUrl} />
									)}
								</>
							))}
						</PostImageContainer>
					) : post.images && post.images.length === 1 ? (
						<>
							{post.images.map((imageUrl, index) => (
								<>
									<PostImage2
										key={index}
										onClick={() => {
											setShowPostImageModal(true);
											setImageIndex(index);
										}}>
										<Image
											src={imageUrl}
											alt=""
											sizes="100vw"
											style={{
												objectFit: "fill",
												width: "auto",
												maxWidth: "100%",
												height: "auto",
												maxHeight: "382px",
											}}
											width={0}
											height={0}
										/>
									</PostImage2>
									{showPostImageModal && imageIndex === index && (
										<PostImageModal close={handleClose} imageurl={imageUrl} />
									)}
								</>
							))}
						</>
					) : null}

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
						refetchUserProfile={props.refetchUserProfile}
					/>
				)}
			</PostContainer>
		</>
	);
};
