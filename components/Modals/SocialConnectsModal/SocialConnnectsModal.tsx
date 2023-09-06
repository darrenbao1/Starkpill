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
} from "./SocialConnectsModal.styles";
import { useState } from "react";
import { FollowerObject } from "./FollowerObject";
import { FollowingObject } from "./FollowingObject";
import { Tab } from "./Tab";
type SocialConnectsModalProps = {
	onClose: () => void;
	followers: string[];
	following: string[];
	showFollowers: boolean;
	isViewingOwnProfile: boolean;
	refetch: () => void;
};
export const SocialConnectsModal = (props: SocialConnectsModalProps) => {
	//destructure props
	const {
		onClose,
		followers,
		following,
		showFollowers,
		isViewingOwnProfile,
		refetch,
	} = props;
	const [toggleTabState, setToggleTabState] = useState(showFollowers ? 1 : 2);

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
					{/* <SocialConnnectsSearchBar /> TODO IMPLEMENT LATER*/}
					{toggleTabState === 1 ? (
						<ListContainer>
							{followers.map((profile) => (
								<FollowerObject
									key={profile}
									walletAddress={profile}
									refetch={refetch}
									isViewingOwnProfile={isViewingOwnProfile}
									closeModal={onClose}
								/>
							))}
						</ListContainer>
					) : (
						<ListContainer>
							{following.map((profile) => (
								<FollowingObject
									key={profile}
									walletAddress={profile}
									refetch={refetch}
									closeModal={onClose}
								/>
							))}
						</ListContainer>
					)}
				</ContentContainer>
			</Container>
		</ModalContainer>
	);
};
