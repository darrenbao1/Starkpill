import { useState } from "react";
import { StyledButton, isFollowingButton } from "./FollowButton.styles";
import Image from "next/image";
import styled from "styled-components";

const IsFollowingButton = styled.div`
	/* your styles here */
`;

export const FollowButton = ({ isLoading, onClick }) => {
	const [showModal, setShowModal] = useState(false);

	const [isFollowing, setIsFollowing] = useState(false);
	const handleClick = () => {
		if (isFollowing) {
			setShowModal(true);
		} else {
			setIsFollowing(true);
		}
	};

	return (
		<StyledButton
			onClick={handleClick}
			isFollowing={isFollowing}
			data-testid="follow-button">
			{isFollowing ? (
				<span>Following</span>
			) : (
				<>
					<Image src="/FollowIcon.svg" width={16} height={16} alt="" />
					<span>Follow</span>
				</>
			)}
			{isLoading && (
				<>
					<Image src="/LoadingFollowIcon.svg" width={24} height={24} alt="" />
					<span>Follow</span>
				</>
			)}
		</StyledButton>
	);
};
