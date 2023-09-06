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
interface Props {
	profilePictureUrl: string;
	followers: string[];
	following: string[];
	profileObject: UserProfile;
}
export const Header = (props: Props) => {
	//destructure props
	const { profilePictureUrl, followers, following, profileObject } = props;

	const [showSocialConnectsModal, setShowSocialConnectsModal] = useState(false);
	const handleFollowContainerClick = () => {
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
						<FollowContainer onClick={handleFollowContainerClick}>
							{following.length} Following
						</FollowContainer>
						<FollowContainer onClick={handleFollowContainerClick}>
							{followers.length} Followers
						</FollowContainer>
					</FollowWrapper>
					<EditProfileButton>Edit Profile</EditProfileButton>
				</Details>
			</DetailsContainer>
			{showSocialConnectsModal && (
				<SocialConnectsModal
					followers={followers}
					following={following}
					onClose={() => setShowSocialConnectsModal(false)}
				/>
			)}
		</Container>
	);
};
