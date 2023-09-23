import { useState } from "react";
import { SocialConnectsModal } from "../../../components/Modals/SocialConnectsModal";
import {
	Container,
	CoverPhotoContainer,
	Details,
	DetailsContainer,
	EditPic,
	EditProfileButton,
	FollowButtonWrapper,
	FollowContainer,
	FollowWrapper,
	NameContainer,
	ProfilePictureContainer,
} from "./Header.styles";
import { UserProfile } from "../../../types/interfaces";
import { shortenAddress } from "../../../types/utils";
import { FollowButton } from "../../FollowButton/FollowButton";
import { ProfilePictModal } from "../../Modals/SelectProfilePictureModal/ProfilePictModal";
import { CoverPhotoSection } from "../CoverPhotoSection/CoverPhotoSection";
import { TwitterSignIn } from "../../TwitterSignIn";
import { ProfilePageWrapper } from "../../../styles/ProfilePage.style";
import { EditProfileModal } from "../EditProfileModal/EditProfileModal";

interface Props {
	profilePictureUrl: string;
	followers: string[];
	following: string[];
	profileObject: UserProfile;
	isViewingOwnProfile: boolean;
	followAddress: string;
	refetch: () => void;
	isFollowing: boolean;
	ownerAddress: string;
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
	const [showProfilePictModal, setShowProfilePictModal] = useState(false);
	const [showSocialConnectsModal, setShowSocialConnectsModal] = useState(false);
	const [showFollowers, setShowFollowers] = useState(false);
	const [showEditProfileModal, setShowEditProfileModal] = useState(false);
	//index 1 is to show followers and index 2 is to show following
	const handleFollowContainerClick = (index: number) => {
		if (index === 1) setShowFollowers(true);
		else setShowFollowers(false);
		setShowSocialConnectsModal(true);
	};

	return (
		<Container>
			<CoverPhotoContainer>
				<CoverPhotoSection
					imageUrl={profileObject.coverPictureUrl}
					xPos={profileObject.pos_x_CoverPicture}
					yPos={profileObject.pos_y_CoverPicture}
					refetch={refetch}
					isViewingOwnProfile={isViewingOwnProfile}
				/>
				{showProfilePictModal && (
					<ProfilePictModal
						ownerAddress={props.ownerAddress}
						close={() => setShowProfilePictModal(false)}
						refetch={refetch}
					/>
				)}
			</CoverPhotoContainer>

			<ProfilePictureContainer
				src={profilePictureUrl}
				width={161.008}
				height={161.008}
				alt=""
			/>
			{isViewingOwnProfile && (
				<EditPic
					onClick={
						isViewingOwnProfile ? () => setShowProfilePictModal(true) : () => {}
					}
				/>
			)}

			<DetailsContainer>
				<Details>
					<NameContainer>
						<h1>
							{profileObject.username
								? profileObject.username
								: shortenAddress(profileObject.address)}
						</h1>
						<div
							style={{
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								width: "max-content",
							}}>
							<p>
								{profileObject.twitterHandle && profileObject.twitterHandle}
							</p>
							&nbsp;
							{isViewingOwnProfile && (
								<div
									style={
										profileObject.twitterHandle
											? { marginTop: "-35px" }
											: { marginTop: "-30px", marginLeft: "-7px" }
									}>
									<TwitterSignIn
										isLinked={profileObject.twitterHandle ? true : false}
										refetch={refetch}
									/>
								</div>
							)}
						</div>
					</NameContainer>
					<FollowWrapper>
						<FollowContainer onClick={() => handleFollowContainerClick(1)}>
							{followers.length} Followers
						</FollowContainer>
						<FollowContainer onClick={() => handleFollowContainerClick(2)}>
							{following.length} Following
						</FollowContainer>
					</FollowWrapper>
					{isViewingOwnProfile ? (
						<EditProfileButton onClick={() => setShowEditProfileModal(true)}>
							Edit Info
						</EditProfileButton>
					) : (
						<FollowButtonWrapper>
							<FollowButton
								followAddress={followAddress}
								isFollowing={isFollowing}
								refetch={refetch}
							/>
						</FollowButtonWrapper>
					)}
				</Details>
			</DetailsContainer>
			{showSocialConnectsModal && (
				<SocialConnectsModal
					isViewingOwnProfile={isViewingOwnProfile}
					followers={followers}
					following={following}
					onClose={() => setShowSocialConnectsModal(false)}
					showFollowers={showFollowers}
					refetch={refetch}
				/>
			)}
			{showProfilePictModal && (
				<ProfilePictModal
					ownerAddress={props.ownerAddress}
					close={() => setShowProfilePictModal(false)}
					refetch={refetch}
				/>
			)}

			{showEditProfileModal && isViewingOwnProfile && (
				<EditProfileModal
					userObject={profileObject}
					closeModal={() => setShowEditProfileModal(false)}
					refetch={refetch}
					profilePictureUrl={profilePictureUrl}
				/>
			)}
		</Container>
	);
};
