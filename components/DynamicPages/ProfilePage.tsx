import { useRouter } from "next/router";
import {
	ProfilePageWrapper,
	ContentWrapper,
	LeftContainerWrapper,
	RightContainerWrapper,
} from "../../styles/ProfilePage.style";
import { GET_TOKEN_IMAGE_BY_ID, GET_USER_PROFILE } from "../../types/constants";
import { useQuery } from "@apollo/client";
import { UserProfile } from "../../types/interfaces";
import { getTokenImage } from "../../types/utils";
import { useState } from "react";
import { Header } from "../ProfilePageComponents/Header/Header";

import { StatusUpdateSection } from "../ProfilePageComponents/StatusUpdateSection";
import { SideSection } from "../ProfilePageComponents/SideSection";
import { TwitterSignIn } from "../TwitterSignIn";
import { ContentsSection } from "../ProfilePageComponents/ContentsSection/ContentsSection";

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
			{hasInteractedWithContract ? (
				<ContentWrapper>
					<LeftContainerWrapper>
						<Header
							profilePictureUrl={
								profilePictureUrl ? profilePictureUrl : "/basepill.png"
							}
							profileObject={userProfile}
							followers={userProfile.followers}
							following={userProfile.following}
							isViewingOwnProfile={isViewingOwnProfile}
							isFollowing={isFollowing}
							followAddress={walletAddress.toString()}
							refetch={refetch}
							ownerAddress={userProfile.address}
						/>
						{isViewingOwnProfile && (
							<StatusUpdateSection
								profilePictureUrl={
									profilePictureUrl ? profilePictureUrl : "/basepill.png"
								}
							/>
						)}
						<ContentsSection />
					</LeftContainerWrapper>
					<RightContainerWrapper>
						{userProfile.bio && (
							<SideSection title="Bio" content={userProfile.bio} />
						)}
						{userProfile.location && (
							<SideSection title="Location" content={userProfile.location} />
						)}
						{userProfile.websiteUrl && (
							<SideSection title="Website" content={userProfile.websiteUrl} />
						)}
						{isViewingOwnProfile && (
							<TwitterSignIn
								isLinked={userProfile.twitterHandle ? true : false}
								refetch={refetch}
							/>
						)}
					</RightContainerWrapper>
				</ContentWrapper>
			) : (
				<div>Profile does not exist</div>
			)}
		</ProfilePageWrapper>
	);
};
export default ProfilePage;
