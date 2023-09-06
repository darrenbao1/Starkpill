import { useQuery } from "@apollo/client";
import {
	getTokenImage,
	removeFollower,
	shortenAddress,
} from "../../../types/utils";
import { useState } from "react";
import { Action, UserProfileBasic } from "../../../types/interfaces";
import { GET_USER_PROFILE_BASIC } from "../../../types/constants";
import {
	DisplayName,
	HandleName,
	NameRemoveWrapper,
	ProfileContainer,
	ProfileImageDisplay,
	ProfileNameContainer,
} from "./SocialConnectsModal.styles";
import { ActionModal } from "../../UnfollowModal/ActionModal";
import { FollowButton } from "../../FollowButton/FollowButton";
import { useRouter } from "next/router";

interface Props {
	walletAddress: string;
	refetch: () => void;
	closeModal: () => void;
}
export const FollowingObject = (props: Props) => {
	const router = useRouter();
	const openOwnerAddressLink = () => {
		closeModal();
		router.push({
			pathname: "/profile",
			query: { walletAddress: walletAddress },
		});
	};
	const [profilePictureUrl, setProfilePictureUrl] = useState("");
	const [showActionModal, setShowActionModal] = useState(false);
	const { walletAddress, refetch, closeModal } = props;
	const { data } = useQuery<{ user: UserProfileBasic }>(
		GET_USER_PROFILE_BASIC,
		{
			variables: {
				address: walletAddress,
			},
		}
	);
	const viewerWalletAddress = localStorage.getItem("walletAddress");
	const { data: viewerData, refetch: refetchViewerData } = useQuery<{
		user: UserProfileBasic;
	}>(GET_USER_PROFILE_BASIC, {
		variables: {
			address: viewerWalletAddress,
		},
	});
	if (!viewerData || !viewerWalletAddress) {
		return <div>wallet not connected cannot view</div>;
	}

	if (!data) {
		//TODO return loading.
		return <div></div>;
	}
	const profile = data.user;
	const viewerProfile = viewerData.user;
	//image URL =
	const fetchProfilePicture = async () => {
		try {
			const imageUrl = await getTokenImage(profile.profilePictureTokenId);
			setProfilePictureUrl(imageUrl);
		} catch (error) {
			console.error("Error fetching profile picture:", error);
		}
	};
	fetchProfilePicture();

	const handleRemoveFollower = async () => {
		await removeFollower(walletAddress).finally(() => {
			refetch();
		});
	};
	const isFollowing = viewerProfile.following.includes(walletAddress);
	return (
		<>
			<ProfileContainer key={profile.address}>
				<ProfileImageDisplay
					src={profilePictureUrl}
					width={58}
					height={50}
					alt=""
				/>
				<NameRemoveWrapper>
					<ProfileNameContainer onClick={openOwnerAddressLink}>
						<DisplayName>
							{profile.username
								? profile.username
								: shortenAddress(profile.address)}
						</DisplayName>
						<HandleName>{profile.twitterHandle}</HandleName>
					</ProfileNameContainer>
					{profile.address !== viewerWalletAddress ? (
						<FollowButton
							refetch={refetchViewerData}
							followAddress={walletAddress}
							isFollowing={isFollowing}
						/>
					) : (
						<div style={{ color: "red" }}>SELF TODO</div>
					)}
				</NameRemoveWrapper>
				{showActionModal && (
					<ActionModal
						close={() => setShowActionModal(false)}
						handleAction={handleRemoveFollower}
						walletAddress={walletAddress}
						actionIndex={Action.RemoveFollower}
					/>
				)}
			</ProfileContainer>
		</>
	);
};
