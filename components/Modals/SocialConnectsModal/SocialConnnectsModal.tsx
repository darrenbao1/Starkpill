import {
	ModalContainer,
	Container,
	HeaderContainer,
	CloseButton,
	HeaderContent,
	Header,
	TabContainer,
	ContentContainer,
	ListContainer,
	ProfileContainer,
	ProfileImageDisplay,
	ProfileNameContainer,
	DisplayName,
	HandleName,
	RemoveButton,
	NameRemoveWrapper,
} from "./SocialConnectsModal.styles";
import { useState } from "react";
import { SocialConnnectsSearchBar } from "./SocialConnnectsSearchBar";
import { useQuery } from "@apollo/client";
import { UserProfile } from "../../../types/interfaces";
import { GET_USER_PROFILE } from "../../../types/constants";
import { getTokenImage, shortenAddress } from "../../../types/utils";

type TabProps = {
	index: number;
	label: string;
	isActive: boolean;
	onClick: (index: number) => void;
};

const Tab = ({ index, label, isActive, onClick }: TabProps) => {
	return (
		<div
			onClick={() => onClick(index)}
			style={{
				borderBottom: isActive ? "4px solid #FF4F0A" : "none",
				fontWeight: isActive ? "bold" : "normal",
				height: "38px",
				cursor: "pointer",
			}}>
			{label}
		</div>
	);
};
type SocialConnectsModalProps = {
	onClose: () => void;
	followers: string[];
	following: string[];
};
interface Props {
	walletAddress: string;
	showModal: () => void;
}
const ListObject = (props: Props) => {
	//destructure props
	const [profilePictureUrl, setProfilePictureUrl] = useState("");

	const { walletAddress, showModal } = props;
	const { data } = useQuery<{ user: UserProfile }>(GET_USER_PROFILE, {
		variables: {
			address: walletAddress,
		},
	});
	if (!data) {
		//TODO return loading.
		return <div></div>;
	}
	const profile = data.user;
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

	return (
		<ProfileContainer key={profile.address}>
			<ProfileImageDisplay
				src={profilePictureUrl}
				width={58}
				height={50}
				alt=""
			/>
			<NameRemoveWrapper>
				<ProfileNameContainer>
					<DisplayName>
						{profile.username
							? profile.username
							: shortenAddress(profile.address)}
					</DisplayName>
					<HandleName>{profile.twitterHandle}</HandleName>
				</ProfileNameContainer>
				<RemoveButton onClick={showModal}>Remove</RemoveButton>
			</NameRemoveWrapper>
		</ProfileContainer>
	);
};

export const SocialConnectsModal = (props: SocialConnectsModalProps) => {
	//destructure props
	const { onClose, followers, following } = props;
	const [showUnfollowModal, setShowUnfollowModal] = useState(false);
	const [toggleTabState, setToggleTabState] = useState(1);

	const toggleTabStateHandler = (index: number) => {
		setToggleTabState(index);
	};

	const tabs = [
		{ index: 1, label: "Followers" },
		{ index: 2, label: "Following" },
	];

	return (
		<ModalContainer>
			<Container>
				<HeaderContainer>
					<HeaderContent>
						<Header>Social connections</Header>
						<CloseButton onClick={onClose} />
					</HeaderContent>
				</HeaderContainer>
				<ContentContainer>
					<TabContainer>
						{tabs.map((tab) => (
							<Tab
								key={tab.index}
								index={tab.index}
								label={tab.label}
								isActive={tab.index === toggleTabState}
								onClick={toggleTabStateHandler}
							/>
						))}
					</TabContainer>

					<SocialConnnectsSearchBar />
					{toggleTabState === 1 ? (
						<ListContainer>
							{followers.map((profile) => (
								<ListObject
									key={profile}
									walletAddress={profile}
									showModal={() => console.log("OPEN MODAL HERE TODO")}
								/>
							))}
						</ListContainer>
					) : (
						<ListContainer>
							{following.map((profile) => (
								<ListObject
									key={profile}
									walletAddress={profile}
									showModal={() => console.log("OPEN MODAL HERE TODO")}
								/>
							))}
						</ListContainer>
					)}
				</ContentContainer>
			</Container>
		</ModalContainer>
	);
};
