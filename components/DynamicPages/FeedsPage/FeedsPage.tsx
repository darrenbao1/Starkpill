import { StatusUpdateSection } from "../../ProfilePageComponents/StatusUpdateSection";
import { Container, PostsContainer } from "./FeedsPage.styles";
import { useState } from "react";
import {
	GET_USER_PROFILE,
	GET_USER_PROFILE_BASIC,
} from "../../../types/constants";
import { useQuery } from "@apollo/client";
import {
	PostMinimal,
	UserProfile,
	UserProfileBasic,
} from "../../../types/interfaces";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { getTokenImage } from "../../../types/utils";
import { Post } from "../../ProfilePageComponents/Post";
import { ContentsSection } from "../../ProfilePageComponents/ContentsSection/ContentsSection";
interface Props {
	postArray: PostMinimal[];
}
export const FeedsPage = (props: Props) => {
	const [profilePictureUrl, setProfilePictureUrl] = useState<string | null>(
		null
	);

	const { data: userProfileData, refetch: refetchUserProfile } = useQuery<{
		user: UserProfile;
	}>(GET_USER_PROFILE, {
		variables: {
			address: localStorage.getItem("walletAddress"),
		},
	});

	useEffect(() => {
		if (userProfileData) {
			const userProfile = userProfileData.user;
			const fetchProfilePicture = async () => {
				try {
					const imageUrl = await getTokenImage(
						userProfile.profilePictureTokenId
					);
					setProfilePictureUrl(imageUrl);
				} catch (error) {
					console.error("Error fetching profile picture:", error);
				}
			};
			fetchProfilePicture();
		}
	}, [userProfileData]);

	return (
		<Container>
			<StatusUpdateSection
				profilePictureUrl={
					profilePictureUrl ? profilePictureUrl : "/basepill.png"
				}
				refetch={refetchUserProfile}
			/>
			<PostsContainer>
				{/* {postArray.map((post, index) => {
					return (
						<Post
							postMinimal={post}
							key={index}
							refetchUserProfile={refetchUserProfile}
						/>
					);
				})} */}
			</PostsContainer>
		</Container>
	);
};
