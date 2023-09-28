import { useQuery } from "@apollo/client";
import {
	getTokenImage,
	removeFollower,
	shortenAddress,
} from "../../../types/utils";
import { useEffect, useState } from "react";
import { Action, UserProfileBasic } from "../../../types/interfaces";
import { GET_USER_PROFILE_BASIC } from "../../../types/constants";
import {
	DisplayName,
	HandleName,
	NameRemoveWrapper,
	ProfileContainer,
	ProfileImageDisplay,
	ProfileNameContainer,
	RemoveButton,
} from "./SocialConnectsModal.styles";
import { ActionModal } from "../../UnfollowModal/ActionModal";
import { FollowButton } from "../../FollowButton/FollowButton";
import { useRouter } from "next/router";

interface Props {
	walletAddress: string;
	refetch: () => void;
	isViewingOwnProfile: boolean;
	closeModal: () => void;
}
export const FollowerObject = (props: Props) => {
	const router = useRouter();

	const [profilePictureUrl, setProfilePictureUrl] = useState("");
	const [showActionModal, setShowActionModal] = useState(false);
	const { walletAddress, refetch, isViewingOwnProfile, closeModal } = props;
	const { data } = useQuery(GET_USER_PROFILE_BASIC, {
		variables: {
			address: walletAddress,
		},
		skip: !walletAddress,
	});
	const viewerWalletAddress = localStorage.getItem("walletAddress");
	const { data: viewerData, refetch: refetchViewerData } = useQuery(
		GET_USER_PROFILE_BASIC,
		{
			variables: {
				address: viewerWalletAddress,
			},
			skip: !viewerWalletAddress,
		}
	);

	const profile: UserProfileBasic = data?.user;
	const viewerProfile: UserProfileBasic = viewerData?.user;
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
	if (!viewerData || !viewerWalletAddress) {
		return <div>wallet not connected cannot view</div>;
	}
	if (!data) {
		//TODO return loading.
		return <div></div>;
	}

	const handleRemoveFollower = async () => {
		await removeFollower(walletAddress).finally(() => {
			refetch();
		});
	};
	const openOwnerAddressLink = () => {
		closeModal();
		router.push({
			pathname: "/profile",
			query: { walletAddress: walletAddress },
		});
	};
	const isFollowing = viewerProfile.following.includes(walletAddress);
	return (
		<>
			<ProfileContainer key={profile.address}>
				<ProfileImageDisplay
					src={profilePictureUrl ? profilePictureUrl : "/basepill.png"}
					width={58}
					height={50}
					alt=""
					onClick={openOwnerAddressLink}
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
					{isViewingOwnProfile ? (
						<RemoveButton onClick={() => setShowActionModal(true)}>
							Remove
						</RemoveButton>
					) : profile.address !== viewerWalletAddress ? (
						<FollowButton
							refetch={refetchViewerData}
							followAddress={walletAddress}
							isFollowing={isFollowing}
						/>
					) : null}
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
