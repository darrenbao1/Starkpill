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

	if (!data) {
		//TODO return loading.
		return <div></div>;
	}

	const userProfile = data.user;
	const fetchProfilePicture = async () => {
		try {
			const imageUrl = await getTokenImage(userProfile.profilePictureTokenId);
			console.log("image url:", imageUrl);
			setProfilePictureUrl(imageUrl);
		} catch (error) {
			console.error("Error fetching profile picture:", error);
		}
	};
	fetchProfilePicture();

	//Check if this wallet has interacted with the contract.
	//if true, show the profile page.
	//if false, show profile doesn't exist.
	console.log(userProfile);
	const hasInteractedWithContract = userProfile.transactions.length > 0;
	return (
		<ProfilePageWrapper>
			<ContentWrapper>
				{/* labels to list out the attributes in userProfile */}
				{hasInteractedWithContract ? (
					<div>
						<Image
							src={profilePictureUrl ? profilePictureUrl : "/starkpill.PNG"}
							alt="profilePicture"
							width={200}
							height={200}></Image>

						<div>{userProfile.username}</div>
						<div>{userProfile.twitterHandle}</div>
						<div>{userProfile.firstName}</div>
						<div>{userProfile.lastName}</div>
						<div>{userProfile.location}</div>
						<div>{userProfile.websiteUrl}</div>
						<div>{userProfile.bio}</div>
						<div>{userProfile.address}</div>
						<div>{userProfile.followers.length} followers</div>
						<div>{userProfile.following.length} following</div>
						<div>{userProfile.totalFame} total Fame</div>
					</div>
				) : (
					<div>Profile doesn't exist</div>
				)}
				<button
					onClick={async () => {
						followUser(userProfile.address);
						// Delay for 0.3 seconds
						await new Promise((resolve) => setTimeout(resolve, 100));
						refetch();
					}}>
					Follow
				</button>
				<button
					onClick={async () => {
						unfollowUser(userProfile.address);
						// Delay for 0.3 seconds
						await new Promise((resolve) => setTimeout(resolve, 100));
						refetch();
					}}>
					Unfollow{" "}
				</button>
			</ContentWrapper>
		</ProfilePageWrapper>
	);
};
export default ProfilePage;
