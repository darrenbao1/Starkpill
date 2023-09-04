import { useState } from "react";
import { StyledButton } from "./FollowButton.styles";
import Image from "next/image";
import styled from "styled-components";
import { followUser, unfollowUser } from "../../types/utils";
import { UnfollowModal } from "../UnfollowModal/UnfollowModal";

interface Props {
	followAddress: string;
	refetch: () => void;
	isFollowing: boolean;
}
export const FollowButton = (props: Props) => {
	const [showUnfollowModal, setShowUnfollowModal] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const isFollowing = props.isFollowing;

	const handleUnfollow = async () => {
		if (isFollowing) {
			await unfollowUser(props.followAddress).then(() => {
				props.refetch();
				setIsLoading(false);
				setShowUnfollowModal(false);
			});
		}
	};

	const handleClick = async () => {
		setIsLoading(true);
		if (!isFollowing) {
			await followUser(props.followAddress).then(() => {
				props.refetch();
				setIsLoading(false);
			});
		}
	};

	return (
		<StyledButton
			onClick={handleClick}
			isFollowing={isFollowing}
			data-testid="follow-button">
			{isFollowing ? (
				<span onClick={() => setShowUnfollowModal(true)}>Following</span>
			) : isLoading ? (
				<>
					<Image src="/LoadingFollowIcon.svg" width={24} height={24} alt="" />
					<span>Follow</span>
				</>
			) : (
				<>
					<Image src="/FollowIcon.svg" width={16} height={16} alt="" />
					<span>Follow</span>
				</>
			)}
			{showUnfollowModal && (
				<UnfollowModal
					close={() => setShowUnfollowModal(false)}
					handleUnfollow={handleUnfollow}
					walletAddress={props.followAddress}
				/>
			)}
		</StyledButton>
	);
};
