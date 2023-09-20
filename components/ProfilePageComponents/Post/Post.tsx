import { useEffect, useState } from "react";
import {
	CaptionContainer,
	CommentIcon,
	CommentLikeContainer,
	LikeIcon,
	LikeIconWrapper,
	NamesContainer,
	PostContainer,
	PostContentContainer,
	PostImage,
	PostImageContainer,
	ProfilePictureContainer,
} from "./Post.styles";
import { PostMinimal, PostObjectForUI } from "../../../types/interfaces";
import { ProfilePic } from "../StatusUpdateSection/StatusUpdateSection.styles";
import {
	convertUnixToDate,
	getPost,
	shortenAddress,
} from "../../../types/utils";
import Image from "next/image";

interface Props {
	postMinimal: PostMinimal;
}

export const Post = (props: Props) => {
	const { postMinimal } = props;
	const [post, setPost] = useState<PostObjectForUI | null>(null);

	useEffect(() => {
		const fetchPost = async () => {
			try {
				const result = await getPost(postMinimal.id);
				if (result) {
					setPost(result);
				}
			} catch (error) {
				console.error("Error fetching post:", error);
			}
		};

		fetchPost();
	}, [postMinimal.id]);

	if (!post) {
		// Render loading state or return null while data is being fetched
		return null;
	}
	let gridColumns = "1fr";
	if (post.post.images) {
		if (post.post.images.length === 1) {
			gridColumns = "1fr";
		} else if (post.post.images.length === 2) {
			gridColumns = "1fr 1fr";
		} else if (post.post.images.length >= 3) {
			gridColumns = "1fr 1fr 1fr";
		}
	}

	return (
		<PostContainer>
			<ProfilePictureContainer>
				<ProfilePic
					src={post.profilePictureUrl}
					width={56}
					height={56}
					alt=""
				/>
			</ProfilePictureContainer>
			<PostContentContainer>
				<NamesContainer>
					<h1>
						{post.profile.username
							? post.profile.username
							: shortenAddress(post.profile.address)}
					</h1>
					<h2>{post.profile.twitterHandle && post.profile.twitterHandle}</h2>
					<h2>{convertUnixToDate(Number(post.post.createdAt))} </h2>
				</NamesContainer>
				<CaptionContainer>{post.post.content}</CaptionContainer>
				<PostImageContainer style={{ gridTemplateColumns: gridColumns }}>
					{post.post.images &&
						post.post.images.length > 0 &&
						post.post.images.map((imageUrl, index) => (
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
				<CommentLikeContainer>
					<LikeIconWrapper>
						<CommentIcon />
						{post.post.comments.length} Comment
					</LikeIconWrapper>
					<LikeIconWrapper>
						<LikeIcon />
						{post.post.likes.length} Likes
					</LikeIconWrapper>
				</CommentLikeContainer>
			</PostContentContainer>
		</PostContainer>
	);
};
