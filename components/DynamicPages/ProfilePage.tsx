import { useRouter } from "next/router";
import {
	ProfilePageWrapper,
	ContentWrapper,
	LeftContainerWrapper,
	RightContainerWrapper,
} from "../../styles/ProfilePage.style";
import {
	GET_USER_PROFILE,
	GET_USER_PROFILE_BASIC,
} from "../../types/constants";
import { useQuery } from "@apollo/client";
import { UserProfile, UserProfileBasic } from "../../types/interfaces";
import { getTokenImage } from "../../types/utils";
import { useState, useEffect } from "react";
import { Header } from "../ProfilePageComponents/Header/Header";

import { StatusUpdateSection } from "../ProfilePageComponents/StatusUpdateSection";
import { SideSection } from "../ProfilePageComponents/SideSection";
import { ContentsSection } from "../ProfilePageComponents/ContentsSection/ContentsSection";
import { useLoader } from "../Provider/LoaderProvider";
import { Loader } from "../Loader";

const ProfilePage = () => {
	const router = useRouter();
	const { isLoading } = useLoader();
	const [profilePictureUrl, setProfilePictureUrl] = useState<string | null>(
		null
	);
	const { walletAddress } = router.query;
	const { data: userProfileData, refetch: refetchUserProfile } = useQuery<{
		user: UserProfile;
	}>(GET_USER_PROFILE, {
		variables: {
			address: walletAddress,
		},
	});

	const { data: viewerData } = useQuery<{
		user: UserProfileBasic;
	}>(GET_USER_PROFILE_BASIC, {
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

	if (!walletAddress) {
		// TODO: Return loading.
		return <div>Loading...</div>;
	}

	const userProfile = userProfileData?.user;
	const viewerProfile = viewerData?.user;
	const loggedInUserAddress = localStorage.getItem("walletAddress") || "";

	const isViewingOwnProfile = loggedInUserAddress === walletAddress;
	const isFollowing = userProfile?.followers.includes(loggedInUserAddress);
	const hasInteractedWithContract =
		(userProfile?.transactions || []).length > 0;

	const hasViewerInteractedWithContract =
		(viewerProfile?.transactions || []).length > 0;

	return (
		<ProfilePageWrapper>
			{hasInteractedWithContract ? (
				hasViewerInteractedWithContract ? (
					<ContentWrapper>
						<LeftContainerWrapper>
							{userProfile && (
								<Header
									profilePictureUrl={
										profilePictureUrl ? profilePictureUrl : "/basepill.png"
									}
									profileObject={userProfile}
									followers={userProfile.followers}
									following={userProfile.following}
									isViewingOwnProfile={isViewingOwnProfile}
									isFollowing={isFollowing || false}
									followAddress={walletAddress.toString()}
									refetch={refetchUserProfile}
									ownerAddress={userProfile.address}
								/>
							)}
							{isViewingOwnProfile && (
								<StatusUpdateSection
									profilePictureUrl={
										profilePictureUrl ? profilePictureUrl : "/basepill.png"
									}
									refetch={refetchUserProfile}
								/>
							)}
							{userProfile && <ContentsSection postArray={userProfile.posts} />}
						</LeftContainerWrapper>
						<RightContainerWrapper>
							{userProfile?.bio && (
								<SideSection title="Bio" content={userProfile.bio} />
							)}
							{userProfile?.location && (
								<SideSection title="Location" content={userProfile.location} />
							)}
							{userProfile?.websiteUrl && (
								<SideSection title="Website" content={userProfile.websiteUrl} />
							)}
						</RightContainerWrapper>
					</ContentWrapper>
				) : (
					// Render a message when viewer has not interacted with the contract
					<div>Your wallet has not interacted with Starkpill contract.</div>
				)
			) : (
				// Render a message when the profile does not exist
				<div>The profile does not exist.</div>
			)}
			{isLoading && <Loader />}
		</ProfilePageWrapper>
	);
};

export default ProfilePage;
