import {
	CaptionContainer,
	NamesContainer,
	PostContainer,
	PostContentContainer,
	ProfilePictureContainer,
} from "../ProfilePageComponents/Post/Post.styles";
import { ProfilePic } from "../ProfilePageComponents/StatusUpdateSection/StatusUpdateSection.styles";
import {
	Comment as CommentObject,
	UserProfileBasic,
} from "../../types/interfaces";
import {
	convertUnixToDate,
	getTokenImage,
	shortAddressForModal,
} from "../../types/utils";
import { useQuery } from "@apollo/client";
import { GET_USER_PROFILE_BASIC } from "../../types/constants";
import { useEffect, useState } from "react";
interface Props {
	CommentObject: CommentObject;
}

export const Comment = ({ CommentObject }: Props) => {
	const {
		data: profileResult,
		loading,
		error,
	} = useQuery(GET_USER_PROFILE_BASIC, {
		variables: { address: CommentObject.authorAddress },
	});
	const [profilePictureUrl, setProfilePictureUrl] = useState<string | null>(
		null
	);
	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error: {error.message}</p>;
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
	return (
		<>
			<PostContainer>
				<ProfilePictureContainer>
					<ProfilePic
						src={profilePictureUrl ? profilePictureUrl : "/basepill.png"}
						width={56}
						height={56}
						alt=""
					/>
				</ProfilePictureContainer>
				<PostContentContainer>
					<NamesContainer>
						<h1>
							{profile.username
								? profile.username
								: shortAddressForModal(profile.address)}
						</h1>
						<h2>{profile.twitterHandle}</h2>
						<h2>• {convertUnixToDate(Number(CommentObject.createdAt))}</h2>
					</NamesContainer>
					<CaptionContainer>{CommentObject.text}</CaptionContainer>
				</PostContentContainer>
			</PostContainer>
		</>
	);
};
