import { useRouter } from "next/router";
import {
	ProfilePageWrapper,
	ContentWrapper,
} from "../../styles/ProfilePage.style";
import { GET_TOKEN_IMAGE_BY_ID, GET_USER_PROFILE } from "../../types/constants";
import { useQuery } from "@apollo/client";
import { UserProfile } from "../../types/interfaces";
import { followUser, getTokenImage, unfollowUser } from "../../types/utils";
import { useEffect, useState } from "react";
import Image from "next/image";
import { FollowButton } from "../FollowButton/FollowButton";
import { TwitterSignIn } from "../TwitterSignIn";
import { SocialConnectsModal } from "../Modals/SocialConnectsModal";
import { Header } from "../ProfilePageComponents/Header/Header";
import { StatusUpdateSectionContainer } from "../ProfilePageComponents/StatusUpdateSection/StatusUpdateSection.styles";
import { StatusUpdateSection } from "../ProfilePageComponents/StatusUpdateSection";

const ProfilePage = () => {
	const router = useRouter();

	const [profilePictureUrl, setProfilePictureUrl] = useState<string | null>(
		null
	);
	const { walletAddress } = router.query;
	const { data, refetch } = useQuery<{ user: UserProfile }>(GET_USER_PROFILE, {
		variables: {
			address: walletAddress,
		},
	});

	if (!data || !walletAddress) {
		//TODO return loading.
		return <div></div>;
	}

	const userProfile = data.user;
	const fetchProfilePicture = async () => {
		try {
			const imageUrl = await getTokenImage(userProfile.profilePictureTokenId);
			setProfilePictureUrl(imageUrl);
		} catch (error) {
			console.error("Error fetching profile picture:", error);
		}
	};
	fetchProfilePicture();
	//check if localStorage walletAddress is inside followers array
	//if it is, then set isFollowing to true
	//if it isn't, then set isFollowing to false
	const loggedInUserAddress = localStorage.getItem("walletAddress");
	if (!loggedInUserAddress) {
		return <div>Wallet not connected</div>;
	}
	const isViewingOwnProfile = loggedInUserAddress === walletAddress;
	const isFollowing = userProfile.followers.includes(loggedInUserAddress);
	const hasInteractedWithContract = userProfile.transactions.length > 0;

	return (
		<ProfilePageWrapper>
			<ContentWrapper>
				{/* labels to list out the attributes in userProfile */}
				{hasInteractedWithContract ? (
					<>
						<Header
							profilePictureUrl={
								profilePictureUrl ? profilePictureUrl : "/starkpill.PNG"
							}
							profileObject={userProfile}
							followers={userProfile.followers}
							following={userProfile.following}
							isViewingOwnProfile={isViewingOwnProfile}
							isFollowing={isFollowing}
							followAddress={walletAddress.toString()}
							refetch={refetch}
						/>
						<StatusUpdateSection
							profilePictureUrl={
								profilePictureUrl ? profilePictureUrl : "/starkpill.PNG"
							}
						/>
					</>
				) : (
					<div>Profile does not exist</div>
				)}
				{!isViewingOwnProfile && (
					<FollowButton
						followAddress={walletAddress.toString()}
						isFollowing={isFollowing}
						refetch={refetch}
					/>
				)}
				{/* <SocialConnectsModal /> */}
			</ContentWrapper>
		</ProfilePageWrapper>
	);
};
export default ProfilePage;
