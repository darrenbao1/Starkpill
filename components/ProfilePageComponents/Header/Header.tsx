import { useState } from "react";
import { SocialConnectsModal } from "../../../components/Modals/SocialConnectsModal";
import {
	Container,
	CoverPhotoContainer,
	Details,
	DetailsContainer,
	EditProfileButton,
	FollowContainer,
	FollowWrapper,
	NameContainer,
	ProfilePictureContainer,
} from "./Header.styles";
import { UserProfile } from "../../../types/interfaces";
import { shortenAddress } from "../../../types/utils";
import { FollowButton } from "../../FollowButton/FollowButton";
interface Props {
	profilePictureUrl: string;
	followers: string[];
	following: string[];
	profileObject: UserProfile;
	isViewingOwnProfile: boolean;
	followAddress: string;
	refetch: () => void;
	isFollowing: boolean;
}
export const Header = (props: Props) => {
	//destructure props
	const {
		profilePictureUrl,
		followers,
		following,
		profileObject,
		isViewingOwnProfile,
		followAddress,
		refetch,
		isFollowing,
	} = props;

	const [showSocialConnectsModal, setShowSocialConnectsModal] = useState(false);
	const [showFollowers, setShowFollowers] = useState(false);
	//index 1 is to show followers and index 2 is to show following
	const handleFollowContainerClick = (index: number) => {
		if (index === 1) setShowFollowers(true);
		else setShowFollowers(false);
		setShowSocialConnectsModal(true);
	};

	return (
		<Container>
			<CoverPhotoContainer />
			<ProfilePictureContainer
				src={profilePictureUrl}
				width={161.008}
				height={161.008}
				alt=""
			/>
			<DetailsContainer>
				<Details>
					<NameContainer>
						<h1>
							{profileObject.username
								? profileObject.username
								: shortenAddress(profileObject.address)}
						</h1>
						<p>{profileObject.twitterHandle && profileObject.twitterHandle}</p>
					</NameContainer>
					<FollowWrapper>
						<FollowContainer onClick={() => handleFollowContainerClick(2)}>
							{following.length} Following
						</FollowContainer>
						<FollowContainer onClick={() => handleFollowContainerClick(1)}>
							{followers.length} Followers
						</FollowContainer>
					</FollowWrapper>
					{isViewingOwnProfile ? (
						<EditProfileButton>Edit Profile</EditProfileButton>
					) : (
						<FollowButton
							followAddress={followAddress}
							isFollowing={isFollowing}
							refetch={refetch}
						/>
					)}
				</Details>
			</DetailsContainer>
			{showSocialConnectsModal && (
				<SocialConnectsModal
					followers={followers}
					following={following}
					onClose={() => setShowSocialConnectsModal(false)}
					showFollowers={showFollowers}
				/>
			)}
		</Container>
	);
};
